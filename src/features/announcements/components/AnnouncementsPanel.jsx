import React from "react";
import { Bell, Loader2, Megaphone } from "lucide-react";

import { formatDate } from "../../../utils/formatDate";

/**
 * Right-column "Announcements" card — latest 5 public announcements from the Shehia.
 */
export default function AnnouncementsPanel({ t, loading, announcements }) {
  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="bg-success-subtle text-success rounded-3 p-2">
            <Megaphone size={20} />
          </div>
          <div>
            <h6 className="fw-bold mb-0">{t('announcements')}</h6>
            <small className="text-muted">{t('announcementsDesc')}</small>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-4">
            <Loader2 size={24} className="text-success" />
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-4">
            <Bell size={30} className="text-muted mb-2" />
            <p className="small text-muted mb-0">{t('noAnnouncements')}</p>
          </div>
        ) : (
          announcements.slice(0, 5).map((announcement, index) => (
            <div key={announcement?.id || index} className="py-3 border-bottom">
              <div className="d-flex gap-2">
                <Bell size={16} className="text-success mt-1 flex-shrink-0" />
                <div>
                  <h6 className="small fw-bold mb-1">{announcement?.title || "Taarifa ya Shehia"}</h6>
                  <p className="small text-muted mb-1">{announcement?.content || ""}</p>
                  {announcement?.publishedAt && (
                    <small className="text-muted">{formatDate(announcement.publishedAt)}</small>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
