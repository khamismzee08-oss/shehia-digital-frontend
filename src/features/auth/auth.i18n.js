// ============================================================
// TRANSLATIONS for the Auth modal (login + registration) — Swahili / English
// ============================================================
// Used by AuthModal.jsx, LoginForm.jsx and RegisterForm.jsx. The language
// comes from the navbar toggle (App.jsx -> AuthModal `lang` prop), so
// whatever the visitor picked before opening the modal is what they see.
//
// Note: messages that come straight from the backend (e.g. "A resident with
// this ZanID already exists") are shown as the server sends them.

export const TRANSLATIONS = {
  SW: {
    // Modal shell
    modalTitle: "Mfumo wa Kidijitali wa Usimamizi wa Shehia",
    modalSubtitle: "Portal ya Utawala wa Ngazi ya Chini · Zanzibar",
    tabLogin: "Ingia Mkaazi",
    tabRegister: "Jisajili",

    // Login form
    loginHeading: "MKAAZI ALIYESAJILIWA",
    zanIdLabel: "ZanID",
    zanIdPlaceholder: "Mfano: I-BD-9023",
    passwordLabel: "Nywila",
    loginSubmit: "Ingia Akaunti",
    loginSubmitting: "Inaingia...",
    loginPendingNote:
      "Akaunti mpya husubiri uthibitisho wa Ofisi ya Shehia kabla ya kuweza kuingia.",
    errLoginFailed:
      "Imeshindikana kuingia. Tafadhali hakiki taarifa zako na ujaribu tena.",

    // Register form
    registerHeading: "MKAAZI MPYA",
    regTypeLabel: "Aina ya Usajili:",
    regTypeRelocate: "Mhamiaji kutoka Shehia nyingine",
    regTypeFirstTime: "Usajili wa Kwanza",
    fullName: "Jina Kamili *",
    fullNamePlaceholder: "Jina Kamili",
    zanIdNida: "ZanID / NIDA *",
    phone: "Namba ya Simu *",
    phonePlaceholder: "07XX XXX XXX",
    email: "Barua Pepe (hiari)",
    emailPlaceholder: "jina@mfano.com",
    dateOfBirth: "Tarehe ya Kuzaliwa",
    gender: "Jinsia *",
    genderMale: "Mwanamume",
    genderFemale: "Mwanamke",
    houseNumber: "Namba ya Nyumba *",
    zoneOption: "Kanda",
    houseHint:
      'Mfano: Kanda A, Namba 123 → SH/UW/A/123. Namba isiwe "000".',
    street: "Mtaa *",
    streetPlaceholder: "Mfano: Mwembeladu",
    shehia: "Shehia *",
    shehiaPlaceholder: "Mfano: Kikwajuni Juu",
    district: "Wilaya *",
    districtPlaceholder: "Mfano: Mjini",
    region: "Mkoa *",
    regionPlaceholder: "Mfano: Mjini Magharibi",
    password: "Nywila *",
    passwordPlaceholder: "Angalau herufi 6",
    confirmPassword: "Thibitisha Nywila *",
    confirmPasswordPlaceholder: "Rudia nywila",
    docsHeading: "Nyaraka za Uthibitisho (hiari):",
    docsRelocate:
      "Kwa mhamiaji: pakia (au piga picha) Barua ya Mhamo / Ushahidi wa Nyumba.",
    docsFirstTime:
      "Kwa usajili wa kwanza: pakia (au piga picha) Attestation Letter / ZanID ya mzazi.",
    idDocument: "Kitambulisho (ID Document)",
    proofOfResidence: "Ushahidi wa Makazi (Proof of Residence)",
    registerSubmit: "Kamilisha Usajili",
    registerSubmitting: "Inatuma...",

    // Register validation / result messages
    errGenderRequired: "Tafadhali chagua jinsia (Mwanamume au Mwanamke).",
    errPasswordMismatch: "Nywila hazifanani. Tafadhali hakiki tena.",
    errPasswordShort: "Nywila lazima iwe na angalau herufi 6.",
    errHouseNumber:
      'Chagua kanda na uweke namba ya nyumba yenye tarakimu 3 (siyo "000").',
    registerSuccess:
      "Usajili umefanikiwa! Akaunti yako inasubiri uthibitisho wa Ofisi ya Shehia kabla ya kuingia.",
    errRegisterFailed:
      "Imeshindikana kukamilisha usajili. Tafadhali jaribu tena.",
  },
  ENG: {
    // Modal shell
    modalTitle: "Digital Shehia Management System",
    modalSubtitle: "Local Administration Portal · Zanzibar",
    tabLogin: "Resident Login",
    tabRegister: "Register",

    // Login form
    loginHeading: "REGISTERED RESIDENT",
    zanIdLabel: "ZanID",
    zanIdPlaceholder: "E.g., I-BD-9023",
    passwordLabel: "Password",
    loginSubmit: "Log In",
    loginSubmitting: "Logging in...",
    loginPendingNote:
      "New accounts must be approved by the Shehia Office before you can log in.",
    errLoginFailed:
      "Login failed. Please check your details and try again.",

    // Register form
    registerHeading: "NEW RESIDENT",
    regTypeLabel: "Registration Type:",
    regTypeRelocate: "Moving in from another Shehia",
    regTypeFirstTime: "First-Time Registration",
    fullName: "Full Name *",
    fullNamePlaceholder: "Full Name",
    zanIdNida: "ZanID / NIDA *",
    phone: "Phone Number *",
    phonePlaceholder: "07XX XXX XXX",
    email: "Email (optional)",
    emailPlaceholder: "name@example.com",
    dateOfBirth: "Date of Birth",
    gender: "Gender *",
    genderMale: "Male",
    genderFemale: "Female",
    houseNumber: "House Number *",
    zoneOption: "Zone",
    houseHint:
      'Example: Zone A, Number 123 → SH/UW/A/123. The number must not be "000".',
    street: "Street *",
    streetPlaceholder: "E.g., Mwembeladu",
    shehia: "Shehia *",
    shehiaPlaceholder: "E.g., Kikwajuni Juu",
    district: "District *",
    districtPlaceholder: "E.g., Mjini",
    region: "Region *",
    regionPlaceholder: "E.g., Mjini Magharibi",
    password: "Password *",
    passwordPlaceholder: "At least 6 characters",
    confirmPassword: "Confirm Password *",
    confirmPasswordPlaceholder: "Repeat password",
    docsHeading: "Supporting Documents (optional):",
    docsRelocate:
      "If you are moving in: upload (or take a photo of) your Relocation Letter / Proof of Residence.",
    docsFirstTime:
      "For first-time registration: upload (or take a photo of) the Attestation Letter / a parent's ZanID.",
    idDocument: "ID Document",
    proofOfResidence: "Proof of Residence",
    registerSubmit: "Complete Registration",
    registerSubmitting: "Submitting...",

    // Register validation / result messages
    errGenderRequired: "Please select a gender (Male or Female).",
    errPasswordMismatch: "Passwords do not match. Please check and try again.",
    errPasswordShort: "Password must be at least 6 characters.",
    errHouseNumber:
      'Choose a zone and enter a 3-digit house number (not "000").',
    registerSuccess:
      "Registration successful! Your account is awaiting approval from the Shehia Office before you can log in.",
    errRegisterFailed:
      "Registration could not be completed. Please try again.",
  },
};
