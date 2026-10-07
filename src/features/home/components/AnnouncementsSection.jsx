import React from "react";
import { Megaphone } from "lucide-react";
import AnnouncementList from "../../announcements/components/AnnouncementList";

/**
 * Public "Matangazo na Taarifa" section: heading + the announcement
 * list container. The list itself is owned by the announcements
 * feature (features/announcements/components/AnnouncementList.jsx);
 * this component only supplies the home page's own heading/layout
 * around it.
 */
export default function AnnouncementsSection({ t, announcements, loading, error }) {
  return (
    <div className="mb-4 mt-5">
      <div className="public-content-title">
        <div className="title-icon title-danger">
          <Megaphone size={19} />
        </div>
        <div>
          <h5>{t("annHeading")}</h5>
          <small>{t("annSub")}</small>
        </div>
      </div>
      <div className="announcement-list">
        <AnnouncementList announcements={announcements} loading={loading} error={error} t={t} />
      </div>
    </div>
  );
}
