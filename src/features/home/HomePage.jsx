import React, { useEffect, useState } from "react";
import { ScanLine } from "lucide-react";

import "./home.css";

import { getPublicAnnouncements } from "../announcements/announcementApi";
import { verifyLetter } from "../verification/verificationApi";
import { getPublicStats } from "./statsApi";

import { TRANSLATIONS as HOME_TRANSLATIONS } from "./home.i18n";
import { TRANSLATIONS as VERIFICATION_TRANSLATIONS } from "../verification/verification.i18n";

import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import AnnouncementsSection from "./components/AnnouncementsSection";
import ManagementSection from "./components/ManagementSection";
import EmergencySection from "./components/EmergencySection";
import LetterVerificationForm from "../verification/components/LetterVerificationForm";
import VerificationResult from "../verification/components/VerificationResult";

// ============================================================
// TRANSLATIONS — merged from every feature this page uses.
// ============================================================
const TRANSLATIONS = {
  SW: { ...HOME_TRANSLATIONS.SW, ...VERIFICATION_TRANSLATIONS.SW },
  ENG: { ...HOME_TRANSLATIONS.ENG, ...VERIFICATION_TRANSLATIONS.ENG },
};

// ============================================================
// COMPONENT — the public landing page.
// ============================================================
// This file only owns page-level state (announcements fetching, the
// verify-a-letter flow) and composes the sections below. Each
// section's own markup lives in its own file (features/home/components
// for page-specific sections, features/announcements and
// features/verification for their own feature's presentational
// pieces), so a fix to just the hero, just the verify form, or just
// the announcements list can go straight to the matching file.

export default function HomePage({ onOpenAuth, lang, setLang }) {
  const t = (key) => TRANSLATIONS[lang]?.[key] || key;

  // ---- Announcements ----
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);
  const [announcementsError, setAnnouncementsError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadAnnouncements() {
      setAnnouncementsLoading(true);
      setAnnouncementsError("");

      try {
        const data = await getPublicAnnouncements();
        if (!cancelled) {
          setAnnouncements(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setAnnouncementsError("Imeshindikana kupakia matangazo kwa sasa.");
        }
      } finally {
        if (!cancelled) {
          setAnnouncementsLoading(false);
        }
      }
    }

    loadAnnouncements();

    return () => {
      cancelled = true;
    };
  }, []);

  // ---- Hero statistics (public, counts only) ----
  // If this fails the hero card simply shows "—" instead of numbers.
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        const data = await getPublicStats();
        if (!cancelled) setStats(data);
      } catch {
        if (!cancelled) setStats(null);
      }
    }

    loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  // ---- Verify a letter ----
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null); // API response, or null before first check
  const [verifyErrorMsg, setVerifyErrorMsg] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    const trimmed = verifyCode.trim();
    if (!trimmed) {
      setVerifyErrorMsg(t("verifyEmptyInput"));
      setVerifyResult(null);
      return;
    }

    setVerifyLoading(true);
    setVerifyErrorMsg("");
    setVerifyResult(null);

    try {
      const result = await verifyLetter(trimmed);
      setVerifyResult(result);
    } catch (err) {
      // Network/server failure (distinct from a normal "not found",
      // which the backend returns as valid:false, not an error).
      setVerifyErrorMsg(t("verifyNetworkError"));
    } finally {
      setVerifyLoading(false);
    }
  };

  const resetVerify = () => {
    setVerifyCode("");
    setVerifyResult(null);
    setVerifyErrorMsg("");
  };

  // ---- Render ----
  return (
    <div className="public-landing-page">
      {/* =====================================================
          HERO / ABOUT SECTION
          ===================================================== */}
      <HeroSection t={t} onOpenAuth={onOpenAuth} stats={stats} />

      {/* =====================================================
          MAIN PAGE CONTENT
          ===================================================== */}
      <div className="container py-4">
        <section className="card card-custom p-4 bg-white mb-4">
          <ServicesSection t={t} onOpenAuth={onOpenAuth} />

          <AnnouncementsSection
            t={t}
            announcements={announcements}
            loading={announcementsLoading}
            error={announcementsError}
          />

          {/* ---- Verify a letter ---- */}
          <section id="verify" className="mb-4 mt-5">
            <div className="public-content-title">
              <div className="title-icon title-verify">
                <ScanLine size={19} />
              </div>
              <div>
                <span className="section-label d-block mb-1">{t("verifyLabel")}</span>
                <h5>{t("verifyHeading")}</h5>
                <small>{t("verifySub")}</small>
              </div>
            </div>

            <div className="verify-letter-card">
              <LetterVerificationForm
                t={t}
                verifyCode={verifyCode}
                setVerifyCode={setVerifyCode}
                verifyLoading={verifyLoading}
                onSubmit={handleVerify}
              />

              <VerificationResult
                t={t}
                lang={lang}
                verifyErrorMsg={verifyErrorMsg}
                verifyResult={verifyResult}
                onReset={resetVerify}
              />
            </div>
          </section>

          <ManagementSection t={t} />

          <EmergencySection t={t} />
        </section>
      </div>
    </div>
  );
}
