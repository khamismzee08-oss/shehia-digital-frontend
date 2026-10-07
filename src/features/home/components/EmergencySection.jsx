import React from "react";
import { PhoneCall } from "lucide-react";

// This is the home page's own emergency-contacts block (distinct
// look/data from the resident dashboard's EmergencyContactsPanel in
// features/shehia) — copy lives in features/home/home.i18n.js.
const EMERGENCY_CONTACTS = [
  { key: "emgPolice", number: "112 / 999" },
  { key: "emgCorruption", number: "113" },
  { key: "emgAmbulance", number: "115" },
  { key: "emgFire", number: "114" },
];

export default function EmergencySection({ t }) {
  return (
    <section id="emergency" className="emergency-section">
      <div className="emergency-heading">
        <div className="emergency-icon">
          <PhoneCall size={21} />
        </div>
        <div>
          <h5>{t("emgHeading")}</h5>
          <small>{t("emgSub")}</small>
        </div>
      </div>
      <div className="row row-cols-2 row-cols-md-4 g-3 mt-2">
        {EMERGENCY_CONTACTS.map((contact, idx) => (
          <div key={idx} className="col">
            <div className="emergency-contact">
              <span>{t(contact.key)}</span>
              <strong>{contact.number}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
