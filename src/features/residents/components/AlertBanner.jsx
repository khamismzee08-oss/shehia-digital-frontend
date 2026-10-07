import React from "react";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw } from "lucide-react";

/**
 * Error / success banners shown above the statistics row.
 * The error banner includes a retry button that re-triggers the dashboard load.
 */
export default function AlertBanner({ error, successMessage, refreshing, onRetry }) {
  return (
    <>
      {error && (
        <div
          className="alert alert-danger border-0 shadow-sm rounded-3 d-flex align-items-center justify-content-between"
          role="alert"
        >
          <div className="d-flex align-items-center">
            <AlertCircle size={19} className="me-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={onRetry}
            disabled={refreshing}
          >
            {refreshing ? <Loader2 size={16} className="spin" /> : <RefreshCw size={16} />}
          </button>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success border-0 shadow-sm rounded-3 d-flex align-items-center" role="alert">
          <CheckCircle2 size={19} className="me-2" />
          <span>{successMessage}</span>
        </div>
      )}
    </>
  );
}
