import React from "react";
import { CheckCircle2, Home, MapPin, ShieldCheck, UserRound, Users } from "lucide-react";

/**
 * Top green gradient banner with the resident's name/status, followed by
 * the white info strip (Shehia, house number, street, ZanID).
 */
export default function DashboardHeader({
  t,
  residentName,
  residentStatus,
  residentShehia,
  residentHouse,
  residentMtaa,
  residentZanId,
}) {
  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
      <div
        className="p-4 p-lg-5 text-white"
        style={{ background: "linear-gradient(135deg, #006b3c 0%, #008f50 55%, #00a65a 100%)" }}
      >
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-4 d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: "64px", height: "64px", backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <UserRound size={30} />
              </div>
              <div>
                <div
                  className="small text-uppercase fw-semibold mb-1"
                  style={{ letterSpacing: "1px", opacity: 0.8 }}
                >
                  {t('digitalSystem')}
                </div>
                <h2 className="fw-bold mb-1">{t('welcome')}, {residentName}</h2>
                <p className="mb-0 opacity-75">{t('dashboard')}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="d-flex justify-content-lg-end">
              <div
                className="px-3 py-2 rounded-pill d-inline-flex align-items-center gap-2"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <CheckCircle2 size={17} />
                <span className="small fw-semibold">{residentStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white px-4 py-3">
        <div className="row g-3">
          <div className="col-md-3">
            <div className="d-flex align-items-center gap-2">
              <MapPin size={18} className="text-success" />
              <div>
                <small className="text-muted d-block">{t('shehiaLabel')}</small>
                <strong>{residentShehia}</strong>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="d-flex align-items-center gap-2">
              <Home size={18} className="text-success" />
              <div>
                <small className="text-muted d-block">{t('houseNumber')}</small>
                <strong>{residentHouse}</strong>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="d-flex align-items-center gap-2">
              <Users size={18} className="text-success" />
              <div>
                <small className="text-muted d-block">{t('mtaaLabel')}</small>
                <strong>{residentMtaa}</strong>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="d-flex align-items-center gap-2">
              <ShieldCheck size={18} className="text-success" />
              <div>
                <small className="text-muted d-block">ZanID</small>
                <strong>{residentZanId}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
