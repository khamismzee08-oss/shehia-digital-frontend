// ============================================================
// TRANSLATIONS for the shared FileUploadInput component (Swahili / English)
// ============================================================
// FileUploadInput takes an optional `lang` prop ("SW" | "ENG", default "SW"),
// so forms that don't pass it (letters, issues) behave exactly as before.
// "{max}" in fileTooLarge is replaced with the size limit in MB.

export const TRANSLATIONS = {
  SW: {
    chooseFile: "Chagua Faili",
    takePhoto: "Piga Picha",
    chooseFileInstead: "Chagua Faili Badala Yake",
    retake: "Piga Tena",
    usePhoto: "Tumia Picha",
    switchCamera: "Badilisha kamera",
    capturedAlt: "Picha iliyopigwa",
    fileTooLarge: "Faili ni kubwa mno. Kiwango cha juu ni {max}MB.",
    cameraOpenFailed: "Imeshindikana kufungua kamera.",
    cameraDenied:
      "Ruhusa ya kutumia kamera imekataliwa. Ruhusu ufikiaji wa kamera kwenye mipangilio ya kivinjari chako, kisha jaribu tena.",
    cameraNotFound: "Hakuna kamera iliyopatikana kwenye kifaa hiki.",
    cameraBusy: "Kamera inatumiwa na programu nyingine kwa sasa.",
  },
  ENG: {
    chooseFile: "Choose File",
    takePhoto: "Take Photo",
    chooseFileInstead: "Choose a File Instead",
    retake: "Retake",
    usePhoto: "Use Photo",
    switchCamera: "Switch camera",
    capturedAlt: "Captured photo",
    fileTooLarge: "File is too large. The maximum size is {max}MB.",
    cameraOpenFailed: "Could not open the camera.",
    cameraDenied:
      "Camera permission was denied. Allow camera access in your browser settings, then try again.",
    cameraNotFound: "No camera was found on this device.",
    cameraBusy: "The camera is currently being used by another app.",
  },
};
