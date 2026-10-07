import React from "react";
import { Phone } from "lucide-react";

import { EMERGENCY_CONTACTS } from "../shehia.constants";

/**
 * Right-column "Emergency Numbers" card — static list of essential service contacts.
 */
export default function EmergencyContactsPanel({ t }) {
  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="bg-danger-subtle text-danger rounded-3 p-2">
            <Phone size={20} />
          </div>
          <div>
            <h6 className="fw-bold mb-0">{t('emergency')}</h6>
            <small className="text-muted">{t('emergencyDesc')}</small>
          </div>
        </div>
        {EMERGENCY_CONTACTS.map((contact, index) => (
          <div key={index} className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <span className="small fw-semibold d-block">{t(contact.titleKey)}</span>
            <a href={`tel:${contact.number}`} className="text-danger fw-bold text-decoration-none">
              {contact.number}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
