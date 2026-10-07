import React from "react";
import { AlertCircle, Clock3, FileText, Loader2 } from "lucide-react";

/**
 * Row of 4 summary cards: total applications, pending, ready documents, reports.
 */
export default function StatisticsCards({ t, loading, statistics }) {
  return (
    <div className="row g-3 mb-4">
      <div className="col-6 col-xl-3">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <small className="text-muted fw-semibold">{t('applications')}</small>
                <h2 className="fw-bold mt-2 mb-0">
                  {loading ? <Loader2 size={25} className="text-success" /> : statistics.applications}
                </h2>
                <small className="text-muted">{t('totalLetters')}</small>
              </div>
              <div className="rounded-3 p-2" style={{ backgroundColor: "#e7f6ee", color: "#008f50" }}>
                <FileText size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6 col-xl-3">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <small className="text-muted fw-semibold">{t('waiting')}</small>
                <h2 className="fw-bold mt-2 mb-0">{statistics.pending}</h2>
                <small className="text-muted">{t('pendingApplications')}</small>
              </div>
              <div className="bg-warning-subtle text-warning rounded-3 p-2">
                <Clock3 size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6 col-xl-3">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <small className="text-muted fw-semibold">{t('readyDocuments')}</small>
                <h2 className="fw-bold mt-2 mb-0">{statistics.documents}</h2>
                <small className="text-muted">{t('approvedLetters')}</small>
              </div>
              <div className="bg-info-subtle text-info rounded-3 p-2">
                <FileText size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6 col-xl-3">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <small className="text-muted fw-semibold">{t('reports')}</small>
                <h2 className="fw-bold mt-2 mb-0">{statistics.reports}</h2>
                <small className="text-muted">{t('totalReports')}</small>
              </div>
              <div className="bg-secondary-subtle text-secondary rounded-3 p-2">
                <AlertCircle size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
