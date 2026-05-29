/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};



export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    // ── Identity ───────────────────────────────────────────────────────────
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "tagline",
      type: "string",
      required: false,
      label: "Tagline",
      maxLength: 120,
    },
    {
      fieldName: "headline",
      type: "string",
      required: false,
      label: "Page Headline",
      maxLength: 80,
    },
    {
      fieldName: "subheadline",
      type: "string",
      required: false,
      label: "Page Subheadline",
      maxLength: 200,
    },

    // ── Brand colors ───────────────────────────────────────────────────────
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent",
        },
      ],
    },
    {
      fieldName: "pageBackground",
      type: "color",
      required: false,
      label: "Page Background",
    },
    {
      fieldName: "surfaceColor",
      type: "color",
      required: false,
      label: "Card Surface",
    },

    // ── BMI category styling ───────────────────────────────────────────────
    {
      fieldName: "categoryColors",
      type: "object",
      required: false,
      label: "Category Colors",
      fields: [
        { fieldName: "underweight", type: "color", required: false, label: "Underweight" },
        { fieldName: "healthy", type: "color", required: false, label: "Healthy" },
        { fieldName: "overweight", type: "color", required: false, label: "Overweight" },
        { fieldName: "obese", type: "color", required: false, label: "Obese" },
      ],
    },

    // ── BMI category copy (the friendly interpretations) ───────────────────
    {
      fieldName: "categoryCopy",
      type: "object",
      required: false,
      label: "Category Copy",
      fields: [
        {
          fieldName: "underweightLabel",
          type: "string",
          required: false,
          label: "Underweight — Label",
          maxLength: 40,
        },
        {
          fieldName: "underweightBlurb",
          type: "string",
          required: false,
          label: "Underweight — Blurb",
          maxLength: 240,
        },
        {
          fieldName: "healthyLabel",
          type: "string",
          required: false,
          label: "Healthy — Label",
          maxLength: 40,
        },
        {
          fieldName: "healthyBlurb",
          type: "string",
          required: false,
          label: "Healthy — Blurb",
          maxLength: 240,
        },
        {
          fieldName: "overweightLabel",
          type: "string",
          required: false,
          label: "Overweight — Label",
          maxLength: 40,
        },
        {
          fieldName: "overweightBlurb",
          type: "string",
          required: false,
          label: "Overweight — Blurb",
          maxLength: 240,
        },
        {
          fieldName: "obeseLabel",
          type: "string",
          required: false,
          label: "Obese — Label",
          maxLength: 40,
        },
        {
          fieldName: "obeseBlurb",
          type: "string",
          required: false,
          label: "Obese — Blurb",
          maxLength: 240,
        },
      ],
    },

    // ── UI labels ──────────────────────────────────────────────────────────
    {
      fieldName: "heightLabel",
      type: "string",
      required: false,
      label: "Height Field Label",
      maxLength: 40,
    },
    {
      fieldName: "weightLabel",
      type: "string",
      required: false,
      label: "Weight Field Label",
      maxLength: 40,
    },
    {
      fieldName: "metricToggleLabel",
      type: "string",
      required: false,
      label: "Metric Toggle Label",
      maxLength: 20,
    },
    {
      fieldName: "imperialToggleLabel",
      type: "string",
      required: false,
      label: "Imperial Toggle Label",
      maxLength: 20,
    },
    {
      fieldName: "emptyStateMessage",
      type: "string",
      required: false,
      label: "Empty State Message",
      maxLength: 160,
    },
    {
      fieldName: "disclaimerText",
      type: "string",
      required: false,
      label: "Disclaimer Text",
      maxLength: 240,
    },
    {
      fieldName: "footerText",
      type: "string",
      required: false,
      label: "Footer Text",
      maxLength: 160,
    },

    // ── Defaults ───────────────────────────────────────────────────────────
    {
      fieldName: "defaultUnitSystem",
      type: "enum",
      required: false,
      label: "Default Unit System",
      options: ["metric", "imperial"],
    },
  ],
};
