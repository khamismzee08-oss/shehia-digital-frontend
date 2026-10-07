// ============================================================
// ENUM OPTIONS & STATIC DATA for the Letters feature
// ============================================================
// Pure data — no JSX, no translation logic. Each option only stores a
// `labelKey` that components resolve through `t()` at render time, so
// SW/ENG stays in sync automatically.

export const LETTER_TYPE_OPTIONS = [
  { value: "BANK_KYC", labelKey: "letterBankKYC" },
  { value: "RESIDENCE", labelKey: "letterResidence" },
  { value: "CONDUCT", labelKey: "letterConduct" },
  { value: "GUARANTOR", labelKey: "letterGuarantor" },
  { value: "TRAVEL_CLEARANCE", labelKey: "letterTravel" },
  { value: "BUSINESS_PERMIT", labelKey: "letterBusiness" },
];

// ============================================================
// DYNAMIC FORM FIELD DEFINITIONS PER LETTER TYPE
// ============================================================

export const LETTER_FORM_FIELDS = {
  BANK_KYC: [
    { name: "bankName", labelKey: "fieldBankName", placeholderKey: "fieldBankNamePlaceholder", type: "text", required: true },
    { name: "branchName", labelKey: "fieldBranchName", placeholderKey: "fieldBranchNamePlaceholder", type: "text", required: true },
    { name: "occupation", labelKey: "fieldOccupation", placeholderKey: "fieldOccupationPlaceholder", type: "text", required: true },
    { name: "phoneNo", labelKey: "fieldPhoneNo", placeholderKey: "fieldPhoneNoPlaceholder", type: "text", required: true },
  ],
  RESIDENCE: [
    { name: "residentStatus", labelKey: "fieldResidentStatus", type: "select", required: true, options: [
      { value: "KUDUMU", label: "Kudumu" },
      { value: "MPANDAJI", label: "Mpandaji" },
      { value: "MKODI", label: "Mkodi" },
    ]},
    { name: "startYear", labelKey: "fieldStartYear", placeholderKey: "fieldStartYearPlaceholder", type: "text", required: true },
    { name: "purpose", labelKey: "fieldPurpose", placeholderKey: "fieldPurposePlaceholder", type: "textarea", required: true },
  ],
  CONDUCT: [
    { name: "institutionName", labelKey: "fieldInstitutionName", placeholderKey: "fieldInstitutionNamePlaceholder", type: "text", required: true },
    { name: "employerTitle", labelKey: "fieldEmployerTitle", placeholderKey: "fieldEmployerTitlePlaceholder", type: "text", required: true },
    { name: "purpose", labelKey: "fieldPurpose", placeholderKey: "fieldPurposePlaceholder2", type: "textarea", required: true },
  ],
  GUARANTOR: [
    { name: "guarantorName", labelKey: "fieldGuarantorName", placeholderKey: "fieldGuarantorNamePlaceholder", type: "text", required: true },
    { name: "guarantorId", labelKey: "fieldGuarantorId", placeholderKey: "fieldGuarantorIdPlaceholder", type: "text", required: true },
    { name: "guarantorHouse", labelKey: "fieldGuarantorHouse", placeholderKey: "fieldGuarantorHousePlaceholder", type: "text", required: true },
    { name: "suspectName", labelKey: "fieldSuspectName", placeholderKey: "fieldSuspectNamePlaceholder", type: "text", required: true },
    { name: "policeStation", labelKey: "fieldPoliceStation", placeholderKey: "fieldPoliceStationPlaceholder", type: "text", required: true },
  ],
  BUSINESS_PERMIT: [
    { name: "goodsDesc", labelKey: "fieldGoodsDesc", placeholderKey: "fieldGoodsDescPlaceholder", type: "text", required: true },
    { name: "quantity", labelKey: "fieldQuantity", placeholderKey: "fieldQuantityPlaceholder", type: "text", required: true },
    { name: "destinationShehia", labelKey: "fieldDestinationShehia", placeholderKey: "fieldDestinationShehiaPlaceholder", type: "text", required: true },
    { name: "destinationDistrict", labelKey: "fieldDestinationDistrict", placeholderKey: "fieldDestinationDistrictPlaceholder", type: "text", required: true },
    { name: "vehiclePlate", labelKey: "fieldVehiclePlate", placeholderKey: "fieldVehiclePlatePlaceholder", type: "text", required: true },
    { name: "carrierPhone", labelKey: "fieldCarrierPhone", placeholderKey: "fieldCarrierPhonePlaceholder", type: "text", required: true },
    { name: "validFrom", labelKey: "fieldValidFrom", type: "date", required: true },
    { name: "validTo", labelKey: "fieldValidTo", type: "date", required: true },
  ],
  TRAVEL_CLEARANCE: [
    { name: "destination", labelKey: "fieldDestination", placeholderKey: "fieldDestinationPlaceholder", type: "text", required: true },
    { name: "travelDate", labelKey: "fieldTravelDate", type: "date", required: true },
    { name: "purpose", labelKey: "fieldPurpose", placeholderKey: "fieldPurposePlaceholder3", type: "textarea", required: true },
  ],
};
