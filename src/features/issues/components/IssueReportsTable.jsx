import React from "react";
import { AlertCircle, Loader2 } from "lucide-react";

import { formatDate } from "../../../utils/formatDate";
import { getStatusStyle } from "../../../utils/statusStyle";
import { getIssueCategoryLabel } from "../issue.utils";

/**
 * "My Issue Reports" table: report number, category, location, date, status.
 */
export default function IssueReportsTable({ t, loading, issues }) {
  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-start gap-3">
            <div className="bg-warning-subtle text-warning rounded-3 p-2">
              <AlertCircle size={23} />
            </div>
            <div>
              <h5 className="fw-bold mb-1">{t('trackReports')}</h5>
              <p className="text-muted small mb-0">{t('trackReportsDesc')}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Loader2 size={32} className="text-success mb-3" />
            <p className="text-muted mb-0">{t('loadingReports')}</p>
          </div>
        ) : issues.length === 0 ? (
          <div className="text-center py-5 rounded-4" style={{ backgroundColor: "#f8faf9" }}>
            <AlertCircle size={40} className="text-muted mb-3" />
            <h6 className="fw-bold">{t('noReports')}</h6>
            <p className="text-muted small mb-0">{t('noReportsDesc')}</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th className="text-muted small">{t('reportNumber')}</th>
                  <th className="text-muted small">{t('issueTypeCol')}</th>
                  <th className="text-muted small">{t('locationCol')}</th>
                  <th className="text-muted small">{t('dateCol')}</th>
                  <th className="text-muted small">{t('statusCol')}</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => {
                  const statusObj = getStatusStyle(issue?.status);
                  const statusLabel = t(statusObj.label);
                  return (
                    <tr key={issue?.id || issue?.reportNumber}>
                      <td><span className="fw-semibold">{issue?.reportNumber}</span></td>
                      <td><span className="small">{getIssueCategoryLabel(t, issue?.category)}</span></td>
                      <td><span className="small text-muted">{issue?.location || "—"}</span></td>
                      <td><span className="small text-muted">{formatDate(issue?.createdAt)}</span></td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-2 ${statusObj.className}`}>
                          {statusLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
