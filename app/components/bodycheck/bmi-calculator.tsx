import { useMemo, useState } from "react";
import {
  calculateImperialBmi,
  calculateMetricBmi,
  parseUserNumber,
  resolveBmi,
  type BmiCategoryKey,
  type BmiResult,
  type UnitSystem,
} from "~/lib/bmi";
import { useConfigurables } from "~/modules/configurables";
import { UnitToggle } from "./unit-toggle";
import { MeasurementInput } from "./measurement-input";
import { ResultDisplay } from "./result-display";

/**
 * BodyCheck — the entire P0 feature in one card.
 *
 * Branding, labels, copy, colors are ALL sourced from `useConfigurables()`
 * so the app owner can edit them live in the portal middle editor.
 * Pure UI state (the typed numbers + selected unit) stays local.
 */
export function BmiCalculator() {
  const { config } = useConfigurables();

  // Start in the owner's preferred unit system; default to metric.
  const initialUnit: UnitSystem =
    config?.defaultUnitSystem === "imperial" ? "imperial" : "metric";

  const [unit, setUnit] = useState<UnitSystem>(initialUnit);

  // Metric inputs
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  // Imperial inputs
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLb, setWeightLb] = useState("");

  const result: BmiResult | null = useMemo(() => {
    if (unit === "metric") {
      const h = parseUserNumber(heightCm);
      const w = parseUserNumber(weightKg);
      if (h === null || w === null) return null;
      return resolveBmi(calculateMetricBmi(h, w));
    }
    const ft = parseUserNumber(heightFt) ?? 0;
    const inches = parseUserNumber(heightIn) ?? 0;
    const lb = parseUserNumber(weightLb);
    // For imperial, require at least one of ft/in AND a valid weight.
    if ((ft === 0 && inches === 0) || lb === null) return null;
    return resolveBmi(calculateImperialBmi(ft, inches, lb));
  }, [unit, heightCm, weightKg, heightFt, heightIn, weightLb]);

  const categoryColors: Record<BmiCategoryKey, string> = {
    underweight: config?.categoryColors?.underweight ?? "#60A5FA",
    healthy: config?.categoryColors?.healthy ?? "#10B981",
    overweight: config?.categoryColors?.overweight ?? "#F59E0B",
    obese: config?.categoryColors?.obese ?? "#EF4444",
  };

  const categoryCopy: Record<BmiCategoryKey, { label: string; blurb: string }> = {
    underweight: {
      label: config?.categoryCopy?.underweightLabel ?? "Underweight",
      blurb:
        config?.categoryCopy?.underweightBlurb ??
        "You're a touch under the typical range.",
    },
    healthy: {
      label: config?.categoryCopy?.healthyLabel ?? "Healthy",
      blurb:
        config?.categoryCopy?.healthyBlurb ??
        "You're in the healthy range — nice.",
    },
    overweight: {
      label: config?.categoryCopy?.overweightLabel ?? "Overweight",
      blurb:
        config?.categoryCopy?.overweightBlurb ??
        "You're a bit above the typical range.",
    },
    obese: {
      label: config?.categoryCopy?.obeseLabel ?? "Obese",
      blurb:
        config?.categoryCopy?.obeseBlurb ??
        "Your number is on the higher end.",
    },
  };

  const heightLabel = config?.heightLabel ?? "Height";
  const weightLabel = config?.weightLabel ?? "Weight";
  const metricLabel = config?.metricToggleLabel ?? "Metric";
  const imperialLabel = config?.imperialToggleLabel ?? "Imperial";
  const emptyStateMessage =
    config?.emptyStateMessage ?? "Pop your height and weight in.";
  const disclaimerText =
    config?.disclaimerText ??
    "BMI is a rough guide, not the whole picture.";

  return (
    <section
      className="w-full max-w-[480px] rounded-2xl bg-card p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-8"
      aria-labelledby="bodycheck-card-title"
    >
      <h2 id="bodycheck-card-title" className="sr-only">
        BMI Calculator
      </h2>

      <div className="flex flex-col gap-6">
        <UnitToggle
          value={unit}
          onChange={setUnit}
          metricLabel={metricLabel}
          imperialLabel={imperialLabel}
        />

        {unit === "metric" ? (
          <div className="flex flex-col gap-4">
            <MeasurementInput
              id="height-cm"
              label={heightLabel}
              unit="cm"
              placeholder="e.g. 170"
              value={heightCm}
              onChange={setHeightCm}
            />
            <MeasurementInput
              id="weight-kg"
              label={weightLabel}
              unit="kg"
              placeholder="e.g. 65"
              value={weightKg}
              onChange={setWeightKg}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                {heightLabel}
              </span>
              <div className="flex gap-3">
                <MeasurementInput
                  id="height-ft"
                  label=""
                  ariaLabel={`${heightLabel} (feet)`}
                  unit="ft"
                  placeholder="e.g. 5"
                  value={heightFt}
                  onChange={setHeightFt}
                  width="narrow"
                />
                <MeasurementInput
                  id="height-in"
                  label=""
                  ariaLabel={`${heightLabel} (inches)`}
                  unit="in"
                  placeholder="e.g. 7"
                  value={heightIn}
                  onChange={setHeightIn}
                  width="narrow"
                />
              </div>
            </div>
            <MeasurementInput
              id="weight-lb"
              label={weightLabel}
              unit="lb"
              placeholder="e.g. 150"
              value={weightLb}
              onChange={setWeightLb}
            />
          </div>
        )}

        <ResultDisplay
          result={result}
          emptyStateMessage={emptyStateMessage}
          categoryColors={categoryColors}
          categoryCopy={categoryCopy}
          disclaimerText={disclaimerText}
        />
      </div>
    </section>
  );
}
