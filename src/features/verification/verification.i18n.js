// ============================================================
// TRANSLATIONS for the Verification feature (Swahili / English)
// ============================================================
// Copy for the public "verify a letter" section (LetterVerificationForm
// + VerificationResult) on the home page.

export const TRANSLATIONS = {
  SW: {
    verifyLabel: "HAKIKI UHALALI",
    verifyHeading: "Hakiki Barua",
    verifySub:
      "Ingiza namba ya uthibitisho (HASH) iliyoko chini ya barua ili kujua kama ni halali.",
    verifyPlaceholder: "mfano: 8F9A-12B3-99C0",
    verifyButton: "Hakiki",
    verifyButtonLoading: "Inahakiki...",
    verifyEmptyInput: "Tafadhali ingiza namba ya uthibitisho kwanza.",
    verifyNetworkError:
      "Imeshindikana kuwasiliana na server. Jaribu tena baadaye.",
    verifyValidTitle: "Barua Hii Ni Halali",
    verifyInvalidTitle: "Barua Haikuthibitika",
    verifyFieldRef: "Namba ya Rejea",
    verifyFieldType: "Aina ya Barua",
    verifyFieldResident: "Jina la Mwombaji",
    verifyFieldStatus: "Hali",
    verifyFieldDate: "Tarehe ya Kutolewa",
    verifyAnother: "Hakiki nyingine",
  },
  ENG: {
    verifyLabel: "AUTHENTICITY CHECK",
    verifyHeading: "Verify a Letter",
    verifySub:
      "Enter the verification code (HASH) printed at the bottom of the letter to check if it's genuine.",
    verifyPlaceholder: "e.g. 8F9A-12B3-99C0",
    verifyButton: "Verify",
    verifyButtonLoading: "Verifying...",
    verifyEmptyInput: "Please enter a verification code first.",
    verifyNetworkError:
      "Failed to reach the server. Please try again later.",
    verifyValidTitle: "This Letter Is Genuine",
    verifyInvalidTitle: "Letter Could Not Be Verified",
    verifyFieldRef: "Reference Number",
    verifyFieldType: "Letter Type",
    verifyFieldResident: "Applicant Name",
    verifyFieldStatus: "Status",
    verifyFieldDate: "Issued On",
    verifyAnother: "Verify another",
  },
};

// ------------------------------------------------------------
// Display labels for backend enum values (LetterType / LetterStatus),
// keyed by language, so the verify result reads naturally instead of
// showing raw enum constants like "BANK_KYC" or "SIGNED".
// ------------------------------------------------------------
export const LETTER_TYPE_LABELS = {
  SW: {
    RESIDENCE: "Barua ya Ukaazi",
    BANK_KYC: "Barua ya Utambulisho wa Benki",
    CONDUCT: "Barua ya Mwenendo Mzuri",
    GUARANTOR: "Barua ya Udhamini",
    TRAVEL_CLEARANCE: "Kibali cha Kusafirisha",
    BUSINESS_PERMIT: "Kibali cha Shughuli/Sherehe",
  },
  ENG: {
    RESIDENCE: "Residence Letter",
    BANK_KYC: "Bank KYC Letter",
    CONDUCT: "Good Conduct Letter",
    GUARANTOR: "Guarantor Letter",
    TRAVEL_CLEARANCE: "Travel/Goods Clearance",
    BUSINESS_PERMIT: "Event/Business Permit",
  },
};

export const LETTER_STATUS_LABELS = {
  SW: {
    APPROVED: "Imeidhinishwa",
    SIGNED: "Imeidhinishwa",
    PENDING: "Inasubiri",
    REJECTED: "Imekataliwa",
    CHANGES_REQUESTED: "Inahitaji Marekebisho",
  },
  ENG: {
    APPROVED: "Approved",
    SIGNED: "Approved",
    PENDING: "Pending",
    REJECTED: "Rejected",
    CHANGES_REQUESTED: "Changes Requested",
  },
};
