import React from "react";
import { ArrowRight, Clock3, Download, Eye, FileText, Loader2 } from "lucide-react";

import { formatDate } from "../../../utils/formatDate";
import { getStatusStyle } from "../../../utils/statusStyle";
import { getLetterTypeLabel } from "../letter.utils";

/**
 * "Track Letter Applications" table: reference, service, date, status,
 * and view/download actions once a letter is approved/signed.
 */
export default function LetterApplicationsTable({
  t,
  loading,
  letters,
  openingRef,
  onView,
  onDownload,
}) {
  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-start gap-3">
            <div className="bg-info-subtle text-info rounded-3 p-2">
              <Clock3 size={23} />
            </div>
            <div>
              <h5 className="fw-bold mb-1">{t('trackLetters')}</h5>
              <p className="text-muted small mb-0">{t('trackLettersDesc')}</p>
            </div>
          </div>
          <ArrowRight size={20} className="text-muted" />
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Loader2 size={32} className="text-success mb-3" />
            <p className="text-muted mb-0">{t('loadingLetters')}</p>
          </div>
        ) : letters.length === 0 ? (
          <div className="text-center py-5 rounded-4" style={{ backgroundColor: "#f8faf9" }}>
            <FileText size={40} className="text-muted mb-3" />
            <h6 className="fw-bold">{t('noLetters')}</h6>
            <p className="text-muted small mb-0">{t('noLettersDesc')}</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th className="text-muted small">{t('reference')}</th>
                  <th className="text-muted small">{t('service')}</th>
                  <th className="text-muted small">{t('date')}</th>
                  <th className="text-muted small">{t('status')}</th>
                  <th className="text-muted small text-end">{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {letters.map((letter) => {
                  const statusObj = getStatusStyle(letter?.status);
                  const statusLabel = t(statusObj.label);
                  const isReady = ["APPROVED", "SIGNED"].includes(String(letter?.status || "").toUpperCase());
                  const isBusy = openingRef === letter?.referenceNumber;

                  return (
                    <tr key={letter?.id || letter?.referenceNumber}>
                      <td><span className="fw-semibold">{letter?.referenceNumber}</span></td>
                      <td><span className="small">{getLetterTypeLabel(t, letter?.letterType)}</span></td>
                      <td><span className="small text-muted">{formatDate(letter?.submittedAt)}</span></td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-2 ${statusObj.className}`}>
                          {statusLabel}
                        </span>
                      </td>
                      <td className="text-end">
                        {isReady ? (
                          <div className="d-flex gap-1 justify-content-end">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary rounded-3"
                              title={t('view')}
                              disabled={isBusy}
                              onClick={() => onView(letter.referenceNumber)}
                            >
                              {isBusy ? <Loader2 size={15} /> : <Eye size={15} />}
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-success rounded-3"
                              title={t('download')}
                              disabled={isBusy}
                              onClick={() => onDownload(letter.referenceNumber)}
                            >
                              {isBusy ? <Loader2 size={15} /> : <Download size={15} />}
                            </button>
                          </div>
                        ) : (
                          <span className="text-muted small">{t('awaiting')}</span>
                        )}
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
