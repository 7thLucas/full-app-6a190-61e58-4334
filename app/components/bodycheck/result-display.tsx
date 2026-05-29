import { cn } from "~/lib/utils";
import type { BmiCategoryKey, BmiResult } from "~/lib/bmi";

interface ResultDisplayProps {
  result: BmiResult | null;
  emptyStateMessage: string;
  /** Color hex for each category, sourced from configurables. */
  categoryColors: Record<BmiCategoryKey, string>;
  /** Label + blurb for each category, sourced from configurables. */
  categoryCopy: Record<
    BmiCategoryKey,
    {
      label: string;
      blurb: string;
    }
  >;
  disclaimerText: string;
}

/**
 * The result panel that sits below the inputs.
 *
 * - Empty state: muted hint
 * - Populated state: big BMI number (tabular, color-matched), category label,
 *   short interpretation blurb, then the honest "BMI is a rough guide" disclaimer.
 *
 * The container uses aria-live="polite" so screen readers announce updates
 * as the user types, without nagging.
 */
export function ResultDisplay({
  result,
  emptyStateMessage,
  categoryColors,
  categoryCopy,
  disclaimerText,
}: ResultDisplayProps) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="min-h-[180px] w-full"
    >
      {result === null ? (
        <div className="flex h-[180px] items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/40 px-6 text-center">
          <p className="text-sm text-muted-foreground">{emptyStateMessage}</p>
        </div>
      ) : (
        <ResultPanel
          result={result}
          categoryColors={categoryColors}
          categoryCopy={categoryCopy}
          disclaimerText={disclaimerText}
        />
      )}
    </div>
  );
}

function ResultPanel({
  result,
  categoryColors,
  categoryCopy,
  disclaimerText,
}: {
  result: BmiResult;
  categoryColors: Record<BmiCategoryKey, string>;
  categoryCopy: Record<BmiCategoryKey, { label: string; blurb: string }>;
  disclaimerText: string;
}) {
  const color = categoryColors[result.category];
  const copy = categoryCopy[result.category];
  const formatted = result.bmi.toFixed(1);

  return (
    <div
      key={`${result.category}-${formatted}`}
      className={cn(
        "bodycheck-rise flex flex-col items-center gap-4 rounded-2xl border border-border bg-white p-6 text-center sm:p-8",
      )}
    >
      <div className="flex flex-col items-center gap-1">
        <span
          className={cn(
            "bodycheck-tabnums leading-none",
            "text-[64px] sm:text-[72px]",
          )}
          style={{
            color,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {formatted}
        </span>
        <span
          className="text-base font-semibold sm:text-lg"
          style={{ color }}
        >
          {copy.label}
        </span>
      </div>

      <p className="max-w-[360px] text-base leading-relaxed text-foreground">
        {copy.blurb}
      </p>

      <div className="mt-2 w-full">
        <CategoryBar active={result.category} categoryColors={categoryColors} />
      </div>

      <p className="max-w-[420px] pt-2 text-xs text-muted-foreground">
        {disclaimerText}
      </p>
    </div>
  );
}

/**
 * A four-segment bar showing the BMI category scale. The active
 * segment is opaque + slightly elevated; inactive segments are tinted.
 * Subtle, not loud — just a quick spatial cue.
 */
function CategoryBar({
  active,
  categoryColors,
}: {
  active: BmiCategoryKey;
  categoryColors: Record<BmiCategoryKey, string>;
}) {
  const order: BmiCategoryKey[] = [
    "underweight",
    "healthy",
    "overweight",
    "obese",
  ];

  return (
    <div className="flex w-full items-stretch gap-1.5">
      {order.map((key) => {
        const isActive = key === active;
        return (
          <div
            key={key}
            aria-hidden="true"
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-300 ease-out",
            )}
            style={{
              backgroundColor: categoryColors[key],
              opacity: isActive ? 1 : 0.25,
              transform: isActive ? "scaleY(1.4)" : "scaleY(1)",
              transformOrigin: "center",
            }}
          />
        );
      })}
    </div>
  );
}
