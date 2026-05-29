/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TCategoryColors = {
  underweight: string;
  healthy: string;
  overweight: string;
  obese: string;
};

export type TCategoryCopy = {
  underweightLabel: string;
  underweightBlurb: string;
  healthyLabel: string;
  healthyBlurb: string;
  overweightLabel: string;
  overweightBlurb: string;
  obeseLabel: string;
  obeseBlurb: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  tagline: string;
  headline: string;
  subheadline: string;
  brandColor: TBrandColor;
  pageBackground: string;
  surfaceColor: string;
  categoryColors: TCategoryColors;
  categoryCopy: TCategoryCopy;
  heightLabel: string;
  weightLabel: string;
  metricToggleLabel: string;
  imperialToggleLabel: string;
  emptyStateMessage: string;
  disclaimerText: string;
  footerText: string;
  defaultUnitSystem: "metric" | "imperial";
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "BodyCheck",
  logoUrl: "FILL_LOGO_URL_HERE",
  tagline: "Your BMI, in seconds — no signups, no fuss.",
  headline: "What's my BMI?",
  subheadline:
    "Type in your height and weight. We'll handle the math and tell you what it means.",
  brandColor: {
    primary: "#10B981",
    secondary: "#F3F4F6",
    accent: "#60A5FA",
  },
  pageBackground: "#FAFAF7",
  surfaceColor: "#FFFFFF",
  categoryColors: {
    underweight: "#60A5FA",
    healthy: "#10B981",
    overweight: "#F59E0B",
    obese: "#EF4444",
  },
  categoryCopy: {
    underweightLabel: "Underweight",
    underweightBlurb:
      "You're a touch under the typical range. A little extra nourishment can go a long way — be kind to yourself.",
    healthyLabel: "Healthy",
    healthyBlurb:
      "You're in the healthy range — nice. Keep doing what feels good and steady.",
    overweightLabel: "Overweight",
    overweightBlurb:
      "You're a bit above the typical range. Small, gentle changes — more movement, mindful eating — add up over time.",
    obeseLabel: "Obese",
    obeseBlurb:
      "Your number is on the higher end. Don't panic — progress is built one calm step at a time, and small wins matter.",
  },
  heightLabel: "Height",
  weightLabel: "Weight",
  metricToggleLabel: "Metric",
  imperialToggleLabel: "Imperial",
  emptyStateMessage:
    "Pop your height and weight in — your BMI will appear here.",
  disclaimerText:
    "BMI is a rough guide, not the whole picture. It doesn't account for muscle, build, or lifestyle.",
  footerText: "Made with care. No accounts, no tracking, just a number.",
  defaultUnitSystem: "metric",
};
