import React from "react";
import { Users } from "lucide-react";

import { SHEHIA_MANAGEMENT } from "../shehia.constants";

/**
 * Right-column "Shehia Leadership" card — Sheha, Deputy, Secretary.
 */
export default function ShehiaManagementPanel({ t }) {
  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="bg-primary-subtle text-primary rounded-3 p-2">
            <Users size={20} />
          </div>
          <div>
            <h6 className="fw-bold mb-0">{t('management')}</h6>
            <small className="text-muted">{t('managementDesc')}</small>
          </div>
        </div>
        <div className="mb-3">
          <small className="text-muted d-block mb-1">{t('sheha')}</small>
          <strong>{SHEHIA_MANAGEMENT.sheha}</strong>
        </div>
        <div className="mb-3">
          <small className="text-muted d-block mb-1">{t('deputy')}</small>
          <strong>{SHEHIA_MANAGEMENT.deputy}</strong>
        </div>
        <div>
          <small className="text-muted d-block mb-1">{t('secretary')}</small>
          <strong>{SHEHIA_MANAGEMENT.secretary}</strong>
        </div>
      </div>
    </div>
  );
}
