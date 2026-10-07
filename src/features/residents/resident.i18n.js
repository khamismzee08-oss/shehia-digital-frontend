// ============================================================
// TRANSLATIONS for the Residents feature (Swahili / English)
// ============================================================
// Dashboard-generic copy: the header, the aggregate statistics row
// (which combines letters + issues counts), generic status labels
// shared by both the letters and issues tables, and generic
// load/refresh/error copy for the dashboard's data loading step.
//
// Note: `houseNumber` is defined here (used by DashboardHeader) but is
// also reused by the letters feature's read-only resident-info field —
// see ResidentDashboard.jsx, which merges every feature's translations
// into one dictionary before building `t()`.

export const TRANSLATIONS = {
  SW: {
    // Header
    digitalSystem: "Mfumo wa Shehia Kidijitali",
    welcome: "Karibu",
    dashboard: "Dashibodi yako ya huduma za Shehia",
    shehiaLabel: "Shehia",
    houseNumber: "Namba ya Nyumba",
    mtaaLabel: "Mtaa / Eneo",

    // Status (shared by letters + issues tables)
    pending: "Inasubiri",
    inProgress: "Inashughulikiwa",
    completed: "Imekamilika",
    rejected: "Imekataliwa",
    unknown: "Haijulikani",

    // Page action bar
    serviceOverview: "Muhtasari wa Huduma",
    serviceOverviewDesc: "Angalia hali ya huduma na maombi yako",

    // Statistics (aggregate across letters + issues)
    applications: "MAOMBI",
    totalLetters: "Jumla ya maombi ya barua",
    waiting: "INASUBIRI",
    pendingApplications: "Maombi yanayoshughulikiwa",
    readyDocuments: "NYARAKA TAYARI",
    approvedLetters: "Barua zilizoidhinishwa",
    reports: "RIPOTI",
    totalReports: "Ripoti ulizowasilisha",

    // Footer
    footer: "Huduma salama za Serikali kupitia Mfumo wa Shehia Kidijitali",

    // Loading / generic dashboard alerts
    loading: "Inapakia...",
    refresh: "Refresh",
    submitting: "Inatuma...",
    serverError: "Imeshindikana kuwasiliana na server.",
    partialError: "Baadhi ya taarifa hazikuweza kupakiwa. Jaribu ku-refresh.",
    dataError: "Imeshindikana kupata taarifa kutoka kwenye server.",
  },
  ENG: {
    // Header
    digitalSystem: "Digital Shehia System",
    welcome: "Welcome",
    dashboard: "Your Shehia services dashboard",
    shehiaLabel: "Shehia",
    houseNumber: "House Number",
    mtaaLabel: "Street / Area",

    // Status (shared by letters + issues tables)
    pending: "Pending",
    inProgress: "In Progress",
    completed: "Completed",
    rejected: "Rejected",
    unknown: "Unknown",

    // Page action bar
    serviceOverview: "Service Overview",
    serviceOverviewDesc: "Check the status of your services and applications",

    // Statistics (aggregate across letters + issues)
    applications: "APPLICATIONS",
    totalLetters: "Total letter applications",
    waiting: "PENDING",
    pendingApplications: "Applications being processed",
    readyDocuments: "READY DOCUMENTS",
    approvedLetters: "Approved letters",
    reports: "REPORTS",
    totalReports: "Reports you submitted",

    // Footer
    footer: "Secure Government services through the Digital Shehia System",

    // Loading / generic dashboard alerts
    loading: "Loading...",
    refresh: "Refresh",
    submitting: "Submitting...",
    serverError: "Failed to connect to the server.",
    partialError: "Some data could not be loaded. Please refresh.",
    dataError: "Failed to get data from the server.",
  },
};
