import React from "react";
import { FileText, AlertTriangle, Newspaper, Users } from "lucide-react";

/**
 * "Karibu kwenye Mfumo wa Shehia" section: board heading, the three
 * service quick-list cards, and the registration promo banner.
 * Purely presentational — `t` and `onOpenAuth` are passed down from
 * HomePage.
 */
export default function ServicesSection({ t, onOpenAuth }) {
  return (
    <>
      {/* ---- Board heading ---- */}
      <div className="public-section-heading">
        <div>
          <span className="section-label">{t("boardLabel")}</span>
          <h4 className="fw-bold mb-0">{t("boardHeading")}</h4>
        </div>
      </div>

      {/* ---- Service quick list ---- */}
      <div className="mb-4 mt-4">
        <h6 className="fw-semibold text-muted mb-3">{t("servicesTitle")}</h6>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="public-service-card">
              <div className="public-service-icon icon-blue">
                <FileText size={21} />
              </div>
              <div>
                <strong>{t("serviceLetter")}</strong>
                <p>{t("serviceLetterDesc")}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="public-service-card">
              <div className="public-service-icon icon-orange">
                <AlertTriangle size={21} />
              </div>
              <div>
                <strong>{t("serviceReport")}</strong>
                <p>{t("serviceReportDesc")}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="public-service-card">
              <div className="public-service-icon icon-green">
                <Newspaper size={21} />
              </div>
              <div>
                <strong>{t("serviceNews")}</strong>
                <p>{t("serviceNewsDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Registration promo ---- */}
      <div className="shehia-registration-card">
        <div className="registration-content">
          <div className="registration-icon">
            <Users size={28} />
          </div>
          <div>
            <span>{t("promoJoin")}</span>
            <h4>{t("promoTitle")}</h4>
            <p>{t("promoDesc")}</p>
          </div>
        </div>
        <div className="registration-buttons">
          <button
            type="button"
            className="btn btn-shehia-primary btn-lg"
            onClick={() => onOpenAuth("login")}
          >
            {t("promoLogin")}
          </button>
          <button
            type="button"
            className="btn btn-outline-success btn-lg"
            onClick={() => onOpenAuth("register")}
          >
            {t("promoRegister")}
          </button>
        </div>
      </div>
    </>
  );
}
