/**
 * BMI math + category resolution.
 *
 * Kept pure (no React, no DOM) so it is trivial to unit-test and to
 * reuse from any component. All inputs are validated; bad input
 * returns `null` so callers can render an empty state cleanly.
 */

export type UnitSystem = "metric" | "imperial";

export type BmiCategoryKey = "underweight" | "healthy" | "overweight" | "obese";

export interface BmiResult {
  /** BMI value rounded to one decimal place. */
  bmi: number;
  /** Canonical category key (use to look up color + copy from configurables). */
  category: BmiCategoryKey;
}

/**
 * Parse a free-form user-entered number string. Returns null for blank
 * or non-numeric input. Accepts comma OR period as the decimal mark
 * because non-US users habitually type "1,75".
 */
export function parseUserNumber(raw: string): number | null {
  if (raw === undefined || raw === null) return null;
  const trimmed = String(raw).trim();
  if (trimmed === "") return null;
  const normalized = trimmed.replace(",", ".");
  const value = Number(normalized);
  if (!Number.isFinite(value)) return null;
  if (value <= 0) return null;
  return value;
}

/**
 * Metric BMI: weight (kg) / height (m)^2.
 */
export function calculateMetricBmi(heightCm: number, weightKg: number): number | null {
  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg)) return null;
  if (heightCm <= 0 || weightKg <= 0) return null;
  const meters = heightCm / 100;
  return weightKg / (meters * meters);
}

/**
 * Imperial BMI: 703 * weight (lb) / height (in)^2.
 */
export function calculateImperialBmi(
  heightFeet: number,
  heightInches: number,
  weightLb: number,
): number | null {
  if (
    !Number.isFinite(heightFeet) ||
    !Number.isFinite(heightInches) ||
    !Number.isFinite(weightLb)
  ) {
    return null;
  }
  const totalInches = heightFeet * 12 + heightInches;
  if (totalInches <= 0 || weightLb <= 0) return null;
  return (703 * weightLb) / (totalInches * totalInches);
}

/**
 * Map a numeric BMI to one of the four standard WHO adult categories.
 * Boundaries used are the canonical adult thresholds:
 *   < 18.5  → underweight
 *   < 25    → healthy
 *   < 30    → overweight
 *   >= 30   → obese
 */
export function classifyBmi(bmi: number): BmiCategoryKey {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "healthy";
  if (bmi < 30) return "overweight";
  return "obese";
}

/**
 * One-shot helper: takes a raw BMI number and returns the rounded value
 * plus category, or null if the input isn't a usable finite number.
 */
export function resolveBmi(rawBmi: number | null): BmiResult | null {
  if (rawBmi === null) return null;
  if (!Number.isFinite(rawBmi)) return null;
  // Guard against absurd values (typo guard, not a medical bound).
  if (rawBmi <= 0 || rawBmi > 200) return null;
  const rounded = Math.round(rawBmi * 10) / 10;
  return { bmi: rounded, category: classifyBmi(rounded) };
}
