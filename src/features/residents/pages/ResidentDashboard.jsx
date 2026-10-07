import React, { useEffect, useMemo, useState } from "react";
import { Loader2, RefreshCw, ShieldCheck } from "lucide-react";

import { getMyLetters, applyForLetter, fetchMyLetterHtml, downloadMyLetterPdf } from "../../letters/letterApi";
import { getMyIssues, reportIssue } from "../../issues/issueApi";
import { getPublicAnnouncements } from "../../announcements/announcementApi";

import { TRANSLATIONS as RESIDENT_TRANSLATIONS } from "../resident.i18n";
import { TRANSLATIONS as LETTER_TRANSLATIONS } from "../../letters/letter.i18n";
import { TRANSLATIONS as ISSUE_TRANSLATIONS } from "../../issues/issue.i18n";
import { TRANSLATIONS as ANNOUNCEMENT_TRANSLATIONS } from "../../announcements/announcement.i18n";
import { TRANSLATIONS as SHEHIA_TRANSLATIONS } from "../../shehia/shehia.i18n";

import { LETTER_TYPE_OPTIONS, LETTER_FORM_FIELDS } from "../../letters/letter.constants";
import { ISSUE_CATEGORY_OPTIONS } from "../../issues/issue.constants";
import { normalizeList } from "../resident.utils";

import DashboardHeader from "../components/DashboardHeader";
import AlertBanner from "../components/AlertBanner";
import StatisticsCards from "../components/StatisticsCards";
import LetterApplicationForm from "../../letters/components/LetterApplicationForm";
import LetterApplicationsTable from "../../letters/components/LetterApplicationsTable";
import IssueReportForm from "../../issues/components/IssueReportForm";
import IssueReportsTable from "../../issues/components/IssueReportsTable";
import AnnouncementsPanel from "../../announcements/components/AnnouncementsPanel";
import EmergencyContactsPanel from "../../shehia/components/EmergencyContactsPanel";
import ShehiaManagementPanel from "../../shehia/components/ShehiaManagementPanel";

// ============================================================
// TRANSLATIONS — merged from every feature this page uses.
// ============================================================
// Each feature owns its own slice of copy (see the imports above).
// This page is the only place they get combined into one flat
// dictionary, so the single `t()` below behaves exactly like the
// original single-file dashboard dictionary did.
const TRANSLATIONS = {
  SW: {
    ...RESIDENT_TRANSLATIONS.SW,
    ...LETTER_TRANSLATIONS.SW,
    ...ISSUE_TRANSLATIONS.SW,
    ...ANNOUNCEMENT_TRANSLATIONS.SW,
    ...SHEHIA_TRANSLATIONS.SW,
  },
  ENG: {
    ...RESIDENT_TRANSLATIONS.ENG,
    ...LETTER_TRANSLATIONS.ENG,
    ...ISSUE_TRANSLATIONS.ENG,
    ...ANNOUNCEMENT_TRANSLATIONS.ENG,
    ...SHEHIA_TRANSLATIONS.ENG,
  },
};

// ============================================================
// MAIN COMPONENT
// ============================================================
// This file only wires up state + data-loading and lays out the page.
// All presentational pieces live under their own feature's
// components/ folder (features/letters, features/issues,
// features/announcements, features/shehia), all copy lives in each
// feature's own *.i18n.js (merged above), all static/dropdown data
// lives in each feature's own *.constants.js, and pure helpers live
// in each feature's own *.utils.js. If you need to fix or tweak just
// the letter form, the issues table, or the announcements panel, go
// straight to the matching feature folder — you don't need to read
// through the rest of the dashboard to find it.

export default function ResidentDashboard({ user = {}, lang = 'SW' }) {
  // Helper to get translation
  const t = (key) => TRANSLATIONS[lang]?.[key] || key;

  // ==========================================================
  // LETTER APPLICATION FORM STATE
  // ==========================================================

  const [letterType, setLetterType] = useState(LETTER_TYPE_OPTIONS[0].value);
  // A real uploaded file (or camera capture), in place of a docUrl string.
  const [letterSupportingDoc, setLetterSupportingDoc] = useState(null);

  // Dynamic fields state (key-value pairs)
  const [dynamicFormData, setDynamicFormData] = useState({});

  // Reset dynamic fields when letter type changes
  useEffect(() => {
    setDynamicFormData({});
  }, [letterType]);

  // ==========================================================
  // ISSUE REPORT FORM STATE
  // ==========================================================

  const [issueCategory, setIssueCategory] = useState(ISSUE_CATEGORY_OPTIONS[0].value);
  const [issuePriority, setIssuePriority] = useState("MEDIUM");
  const [issueLocation, setIssueLocation] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  // A real uploaded file (or camera capture), in place of a photoUrl string.
  const [issuePhoto, setIssuePhoto] = useState(null);

  // ==========================================================
  // API DATA
  // ==========================================================

  const [letters, setLetters] = useState([]);
  const [issues, setIssues] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // ==========================================================
  // UI STATE
  // ==========================================================

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submittingLetter, setSubmittingLetter] = useState(false);
  const [submittingReport, setSubmittingReport] = useState(false);
  const [openingRef, setOpeningRef] = useState("");

  // ==========================================================
  // USER DISPLAY DATA
  // ==========================================================

  const residentName = user?.fullName || "Mkaazi";
  const residentStatus = user?.status || "PENDING";
  const residentShehia = user?.shehia || "—";
  const residentHouse = user?.houseNumber || "—";
  const residentMtaa = user?.street || "—";
  const residentZanId = user?.zanId || "—";
  const residentPhone = user?.phoneNumber || "";

  // ==========================================================
  // STATISTICS
  // ==========================================================

  const statistics = useMemo(() => {
    const pendingLetters = letters.filter((l) =>
      String(l?.status || "").toUpperCase() === "PENDING"
    ).length;

    const readyDocuments = letters.filter((l) =>
      ["APPROVED", "SIGNED"].includes(String(l?.status || "").toUpperCase())
    ).length;

    return {
      applications: letters.length,
      pending: pendingLetters,
      documents: readyDocuments,
      reports: issues.length,
    };
  }, [letters, issues]);

  // ==========================================================
  // LOAD DATA
  // ==========================================================

  const loadDashboardData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError("");

    try {
      const results = await Promise.allSettled([
        getMyLetters(),
        getMyIssues(),
        getPublicAnnouncements(),
      ]);

      const [lettersResult, issuesResult, announcementsResult] = results;

      if (lettersResult.status === "fulfilled") {
        setLetters(normalizeList(lettersResult.value));
      }

      if (issuesResult.status === "fulfilled") {
        setIssues(normalizeList(issuesResult.value));
      }

      if (announcementsResult.status === "fulfilled") {
        setAnnouncements(normalizeList(announcementsResult.value));
      }

      const failedRequests = results.filter((r) => r.status === "rejected");

      if (failedRequests.length === results.length) {
        throw new Error(t('serverError'));
      }

      if (failedRequests.length > 0) {
        setError(t('partialError'));
      }
    } catch (err) {
      console.error("Resident dashboard error:", err);
      setError(err?.message || t('dataError'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(""), 5000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  // ==========================================================
  // APPLY FOR LETTER
  // ==========================================================

  const handleApplyLetterSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setSubmittingLetter(true);

    try {
      const formData = {
        fullName: residentName,
        citizenName: residentName,
        nationalId: residentZanId,
        zanId: residentZanId,
        houseNo: residentHouse,
        houseNumber: residentHouse,
        street: residentMtaa,
        shehia: residentShehia,
        phoneNo: residentPhone,
        carrierName: residentName,
        guarantorName: residentName,
        ...dynamicFormData,
      };

      const fields = LETTER_FORM_FIELDS[letterType] || [];
      const missing = fields
        .filter((f) => f.required && !dynamicFormData[f.name])
        .map((f) => t(f.labelKey));

      if (missing.length > 0) {
        setError(`${t('fillRequired')}: ${missing.join(", ")}`);
        setSubmittingLetter(false);
        return;
      }

      await applyForLetter({
        type: letterType,
        formData: JSON.stringify(formData),
        supportingDoc: letterSupportingDoc,
      });

      setSuccessMessage(t('letterSuccess'));
      setDynamicFormData({});
      setLetterSupportingDoc(null);

      const updatedLetters = await getMyLetters();
      setLetters(normalizeList(updatedLetters));
    } catch (err) {
      console.error("Letter application error:", err);
      setError(err?.message || t('dataError'));
    } finally {
      setSubmittingLetter(false);
    }
  };

  // ==========================================================
  // REPORT ISSUE
  // ==========================================================

  const handleReportIssueSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!issueLocation.trim()) {
      setError(t('locationRequired'));
      return;
    }

    if (!issueDescription.trim()) {
      setError(t('descriptionRequired'));
      return;
    }

    setSubmittingReport(true);

    try {
      await reportIssue({
        category: issueCategory,
        priority: issuePriority,
        location: issueLocation.trim(),
        description: issueDescription.trim(),
        photo: issuePhoto,
      });

      setSuccessMessage(t('reportSuccess'));
      setIssueLocation("");
      setIssueDescription("");
      setIssuePhoto(null);

      const updatedIssues = await getMyIssues();
      setIssues(normalizeList(updatedIssues));
    } catch (err) {
      console.error("Issue report error:", err);
      setError(err?.message || t('dataError'));
    } finally {
      setSubmittingReport(false);
    }
  };

  // ==========================================================
  // VIEW / DOWNLOAD LETTER
  // ==========================================================

  const handleViewLetter = async (referenceNumber) => {
    setError("");
    setOpeningRef(referenceNumber);

    try {
      const html = await fetchMyLetterHtml(referenceNumber);
      const viewerWindow = window.open("", "_blank");
      if (viewerWindow) {
        viewerWindow.document.write(html);
        viewerWindow.document.close();
      }
    } catch (err) {
      setError(err?.message || t('letterViewError'));
    } finally {
      setOpeningRef("");
    }
  };

  const handleDownloadLetter = async (referenceNumber) => {
    setError("");
    setOpeningRef(referenceNumber);

    try {
      await downloadMyLetterPdf(referenceNumber);
    } catch (err) {
      setError(err?.message || t('letterDownloadError'));
    } finally {
      setOpeningRef("");
    }
  };

  // ==========================================================
  // DYNAMIC LETTER FIELD CHANGE
  // ==========================================================

  const handleDynamicFieldChange = (e) => {
    const { name, value } = e.target;
    setDynamicFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      className="container-fluid px-3 px-md-4 py-4"
      style={{ backgroundColor: "#f5f8f6", minHeight: "100vh" }}
    >
      <DashboardHeader
        t={t}
        residentName={residentName}
        residentStatus={residentStatus}
        residentShehia={residentShehia}
        residentHouse={residentHouse}
        residentMtaa={residentMtaa}
        residentZanId={residentZanId}
      />

      <AlertBanner
        error={error}
        successMessage={successMessage}
        refreshing={refreshing}
        onRetry={() => loadDashboardData(true)}
      />

      {/* PAGE ACTION BAR */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="fw-bold mb-1">{t('serviceOverview')}</h5>
          <small className="text-muted">{t('serviceOverviewDesc')}</small>
        </div>
        <button
          type="button"
          className="btn btn-light border shadow-sm rounded-3"
          onClick={() => loadDashboardData(true)}
          disabled={refreshing}
        >
          {refreshing ? <Loader2 size={17} className="me-1" /> : <RefreshCw size={17} className="me-1" />}
          {t('refresh')}
        </button>
      </div>

      <StatisticsCards t={t} loading={loading} statistics={statistics} />

      {/* MAIN CONTENT */}
      <div className="row g-4">
        {/* LEFT COLUMN */}
        <div className="col-xl-8">
          {/* Anchor targets below (id + scrollMarginTop) are what the
              resident navbar's "Apply for Letter" / "Track Application" /
              "Report Issue" / "Announcements" links jump to. The
              scrollMarginTop offset keeps the sticky navbar from covering
              the top of the section when the browser jumps here. */}
          <div id="apply-letter" style={{ scrollMarginTop: "90px" }}>
            <LetterApplicationForm
              t={t}
              letterType={letterType}
              setLetterType={setLetterType}
              residentName={residentName}
              residentZanId={residentZanId}
              residentHouse={residentHouse}
              dynamicFormData={dynamicFormData}
              onDynamicFieldChange={handleDynamicFieldChange}
              setLetterSupportingDoc={setLetterSupportingDoc}
              submittingLetter={submittingLetter}
              onSubmit={handleApplyLetterSubmit}
            />
          </div>

          <div id="report-issue" style={{ scrollMarginTop: "90px" }}>
            <IssueReportForm
              t={t}
              issueCategory={issueCategory}
              setIssueCategory={setIssueCategory}
              issuePriority={issuePriority}
              setIssuePriority={setIssuePriority}
              issueLocation={issueLocation}
              setIssueLocation={setIssueLocation}
              issueDescription={issueDescription}
              setIssueDescription={setIssueDescription}
              setIssuePhoto={setIssuePhoto}
              submittingReport={submittingReport}
              onSubmit={handleReportIssueSubmit}
            />
          </div>

          <div id="my-letters" style={{ scrollMarginTop: "90px" }}>
            <LetterApplicationsTable
              t={t}
              loading={loading}
              letters={letters}
              openingRef={openingRef}
              onView={handleViewLetter}
              onDownload={handleDownloadLetter}
            />
          </div>

          <IssueReportsTable t={t} loading={loading} issues={issues} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-xl-4">
          <div className="d-flex flex-column gap-4">
            <div id="announcements" style={{ scrollMarginTop: "90px" }}>
              <AnnouncementsPanel t={t} loading={loading} announcements={announcements} />
            </div>
            <EmergencyContactsPanel t={t} />
            <ShehiaManagementPanel t={t} />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center mt-5 mb-2">
        <small className="text-muted">
          <ShieldCheck size={14} className="me-1" />
          {t('footer')}
        </small>
      </div>
    </div>
  );
}
