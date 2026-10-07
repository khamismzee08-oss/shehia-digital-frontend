import React from "react";
import { AlertCircle, Loader2, Send } from "lucide-react";

import FileUploadInput from "../../../components/forms/FileUploadInput";
import { ISSUE_CATEGORY_OPTIONS, ISSUE_PRIORITY_OPTIONS } from "../issue.constants";

/**
 * "Report Issue" card: category, priority, location, description, an
 * optional photo, and the submit button.
 */
export default function IssueReportForm({
  t,
  issueCategory,
  setIssueCategory,
  issuePriority,
  setIssuePriority,
  issueLocation,
  setIssueLocation,
  issueDescription,
  setIssueDescription,
  setIssuePhoto,
  submittingReport,
  onSubmit,
}) {
  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex align-items-start gap-3 mb-4">
          <div className="bg-warning-subtle text-warning rounded-3 p-2">
            <AlertCircle size={23} />
          </div>
          <div>
            <h5 className="fw-bold mb-1">{t('reportIssue')}</h5>
            <p className="text-muted small mb-0">{t('reportDesc')}</p>
          </div>
        </div>

        <form onSubmit={onSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">{t('issueType')}</label>
              <select
                className="form-select"
                value={issueCategory}
                onChange={(event) => setIssueCategory(event.target.value)}
              >
                {ISSUE_CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">{t('priority')}</label>
              <select
                className="form-select"
                value={issuePriority}
                onChange={(event) => setIssuePriority(event.target.value)}
              >
                {ISSUE_PRIORITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
                ))}
              </select>
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold">{t('location')}</label>
              <input
                type="text"
                className="form-control"
                value={issueLocation}
                onChange={(event) => setIssueLocation(event.target.value)}
                placeholder={t('locationPlaceholder')}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold">{t('description')}</label>
              <textarea
                className="form-control"
                rows="4"
                value={issueDescription}
                onChange={(event) => setIssueDescription(event.target.value)}
                placeholder={t('descriptionPlaceholder')}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold">{t('photoUrlLabel')}</label>
              <FileUploadInput
                helpText={t('photoUrlHelp')}
                onChange={setIssuePhoto}
              />
            </div>
            <div className="col-12 mt-3">
              <button
                type="submit"
                className="btn btn-warning w-100 rounded-3 fw-semibold py-2"
                disabled={submittingReport}
              >
                {submittingReport ? (
                  <><Loader2 size={18} className="me-2" />{t('submittingReport')}</>
                ) : (
                  <><Send size={18} className="me-2" />{t('submitReport')}</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
