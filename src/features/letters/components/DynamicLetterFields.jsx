import React from "react";

/**
 * Renders the set of extra fields specific to the currently selected
 * letter type (see LETTER_FORM_FIELDS in ResidentDashboard.constants.js).
 * Each field can be a text input, textarea, select, or date input.
 */
export default function DynamicLetterFields({ fields, dynamicFormData, onChange, t }) {
  return (
    <>
      {fields.map((field) => {
        if (field.type === "select") {
          return (
            <div className="col-12" key={field.name}>
              <label className="form-label fw-semibold" htmlFor={`field-${field.name}`}>
                {t(field.labelKey)} {field.required && <span className="text-danger">*</span>}
              </label>
              <select
                className="form-select"
                id={`field-${field.name}`}
                name={field.name}
                value={dynamicFormData[field.name] || ""}
                onChange={onChange}
                required={field.required}
              >
                <option value="">{t('selectOption')}</option>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          );
        }

        const FieldComponent = field.type === "textarea" ? "textarea" : "input";
        const inputProps = {
          className: "form-control",
          id: `field-${field.name}`,
          name: field.name,
          value: dynamicFormData[field.name] || "",
          onChange: onChange,
          placeholder: field.placeholderKey ? t(field.placeholderKey) : "",
          required: field.required,
        };

        if (field.type === "textarea") {
          inputProps.rows = 3;
        } else if (field.type === "date") {
          inputProps.type = "date";
        } else {
          inputProps.type = "text";
        }

        return (
          <div className="col-12" key={field.name}>
            <label className="form-label fw-semibold" htmlFor={`field-${field.name}`}>
              {t(field.labelKey)} {field.required && <span className="text-danger">*</span>}
            </label>
            <FieldComponent {...inputProps} />
          </div>
        );
      })}
    </>
  );
}
