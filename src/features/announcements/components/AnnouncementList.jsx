import React from "react";
import { ChevronRight } from "lucide-react";

/**
 * Renders the public announcement list (loading / error / empty /
 * items). Purely presentational — the home page owns the fetching and
 * passes announcements/loading/error + translated copy down as props.
 */
export default function AnnouncementList({ announcements, loading, error, t }) {
  if (loading) {
    return <div className="text-center py-4 text-muted small">{t("annLoading")}</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-danger small">{t("annError")}</div>;
  }

  if (announcements.length === 0) {
    return <div className="text-center py-4 text-muted small">{t("annEmpty")}</div>;
  }

  return (
    <>
      {announcements.map((item, index) => (
        <div key={item.id ?? index} className="announcement-item">
          <div className="announcement-number">{index + 1}</div>
          <div className="announcement-content">
            <strong>{item.title}</strong>
            <p>{item.content}</p>
          </div>
          <ChevronRight size={18} className="announcement-arrow" />
        </div>
      ))}
    </>
  );
}
