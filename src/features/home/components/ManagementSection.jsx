import React from "react";
import { Users } from "lucide-react";

/**
 * Public "Muundo wa Uongozi" section. This is the home page's own
 * management block (distinct look/data from the resident dashboard's
 * ShehiaManagementPanel in features/shehia) — copy lives in
 * features/home/home.i18n.js.
 */
export default function ManagementSection({ t }) {
  return (
    <div className="mb-4 mt-5">
      <div className="public-content-title">
        <div className="title-icon title-green">
          <Users size={19} />
        </div>
        <div>
          <h5>{t("mgmtHeading")}</h5>
          <small>{t("mgmtSub")}</small>
        </div>
      </div>
      <div className="management-grid">
        <div className="management-card">
          <span>{t("mgmtSheha")}</span>
          <strong>KHAMIS M. BAKARI</strong>
        </div>
        <div className="management-card">
          <span>{t("mgmtDeputy")}</span>
          <strong>[Jina la Naibu]</strong>
        </div>
        <div className="management-card">
          <span>{t("mgmtAmbassador")}</span>
          <strong>[Jina la Balozi]</strong>
        </div>
      </div>
    </div>
  );
}
