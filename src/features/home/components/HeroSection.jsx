import React, { useRef } from "react";
import {
  Building2,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Users,
  BarChart3,
  Home,
  Mars,
  Venus
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import shehia1 from "../../../assets/shehia1.jpg";
import shehia2 from "../../../assets/shehia2.jpg";
import shehia3 from "../../../assets/shehia3.jpg";
import shehia4 from "../../../assets/shehia4.jpg";
import shehia5 from "../../../assets/shehia5.jpg";

import CountUp from "./CountUp";
import useInView from "../hooks/useInView";

/**
 * Hero / "about" section of the public landing page: background image
 * slider, government branding, headline + CTA buttons, and the
 * statistics card. Purely presentational — `t`, `onOpenAuth` and `stats`
 * (from GET /api/v1/public/stats, null until loaded / if it fails) are
 * passed down from HomePage. The statistics numbers count up from 0 the
 * first time the card scrolls into view.
 */
export default function HeroSection({ t, onOpenAuth, stats }) {
  const statsCardRef = useRef(null);
  const statsInView = useInView(statsCardRef, { threshold: 0.35 });

  return (
    <section id="about" className="shehia-hero">
      {/* ---- Background image slider ---- */}
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1500}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        className="shehia-background-swiper"
      >
        {[shehia1, shehia2, shehia3, shehia4, shehia5].map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="shehia-slide">
              <img src={img} alt="Shehia" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ---- Overlays ---- */}
      <div className="shehia-dark-overlay"></div>
      <div className="shehia-green-overlay"></div>

      {/* ---- Government branding ---- */}
      <div className="shehia-government-brand">
        <div className="shehia-government-icon">
          <Building2 size={22} />
        </div>
        <div className="shehia-government-text">
          <span>JAMHURI YA MUUNGANO WA TANZANIA</span>
          <strong>MFUMO WA SHEHIA KIDIJITALI</strong>
        </div>
      </div>

      {/* ---- Hero content ---- */}
      <div className="shehia-hero-content">
        <div className="container">
          <div className="row align-items-center">
            {/* Left content */}
            <div className="col-lg-8">
              <div className="shehia-eyebrow">
                <span className="eyebrow-line"></span>
                {t("heroEyebrow")}
              </div>
              <h1 className="shehia-title">
                {t("heroTitle")}
                <span>{t("heroSubtitle")}</span>
              </h1>
              <p className="shehia-description">{t("heroDesc")}</p>
              <div className="shehia-hero-buttons">
                <button
                  type="button"
                  className="shehia-main-button"
                  onClick={() => onOpenAuth("register")}
                >
                  {t("btnRegister")} <ArrowRight size={19} />
                </button>
                <button
                  type="button"
                  className="shehia-secondary-button"
                  onClick={() => onOpenAuth("login")}
                >
                  {t("btnLogin")} <ChevronRight size={18} />
                </button>
              </div>
              <div className="shehia-trust-info">
                <div className="trust-item">
                  <ShieldCheck size={17} />
                  <span>{t("trustSecure")}</span>
                </div>
                <div className="trust-item">
                  <Building2 size={17} />
                  <span>{t("trustGov")}</span>
                </div>
                <div className="trust-item">
                  <Users size={17} />
                  <span>{t("trustCitizens")}</span>
                </div>
              </div>
            </div>

            {/* Statistics card */}
            <div className="col-lg-4 mt-5 mt-lg-0">
              <div className="shehia-statistics-card" ref={statsCardRef}>
                <div className="statistics-heading">
                  <div className="statistics-icon">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <small>{t("statHeading")}</small>
                    <h5>{t("statTitle")}</h5>
                  </div>
                </div>
                <div className="statistics-divider"></div>
                <div className="statistics-item">
                  <div className="statistics-item-icon">
                    <Users size={21} />
                  </div>
                  <div className="statistics-item-content">
                    <span>{t("statResidents")}</span>
                    <strong><CountUp value={stats?.totalResidents} start={statsInView} /></strong>
                  </div>
                </div>
                <div className="statistics-item">
                  <div className="statistics-item-icon">
                    <Home size={21} />
                  </div>
                  <div className="statistics-item-content">
                    <span>{t("statHouses")}</span>
                    <strong><CountUp value={stats?.totalHouses} start={statsInView} /></strong>
                  </div>
                </div>
                <div className="statistics-item">
                  <div className="statistics-item-icon">
                    <Mars size={21} />
                  </div>
                  <div className="statistics-item-content">
                    <span>{t("statMale")}</span>
                    <strong><CountUp value={stats?.maleResidents} start={statsInView} /></strong>
                  </div>
                </div>
                <div className="statistics-item">
                  <div className="statistics-item-icon">
                    <Venus size={21} />
                  </div>
                  <div className="statistics-item-content">
                    <span>{t("statFemale")}</span>
                    <strong><CountUp value={stats?.femaleResidents} start={statsInView} /></strong>
                  </div>
                </div>
                <div className="statistics-footer">
                  <span className="statistics-status-dot"></span>
                  {t("statFooter")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Scroll indicator ---- */}
      <div className="shehia-scroll-indicator">
        <div className="scroll-mouse">
          <span></span>
        </div>
        <small>SCROLL</small>
      </div>
    </section>
  );
}
