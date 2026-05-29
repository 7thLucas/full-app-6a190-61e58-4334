import { cn } from "~/lib/utils";
import type { UnitSystem } from "~/lib/bmi";

interface UnitToggleProps {
  value: UnitSystem;
  onChange: (next: UnitSystem) => void;
  metricLabel: string;
  imperialLabel: string;
}

/**
 * Segmented control for switching between metric and imperial units.
 * Matches the design spec: pill background `#F3F4F6` with a white,
 * subtly-shadowed active segment. Animated via a smooth 200ms transition.
 */
export function UnitToggle({
  value,
  onChange,
  metricLabel,
  imperialLabel,
}: UnitToggleProps) {
  const isMetric = value === "metric";

  return (
    <div
      role="tablist"
      aria-label="Unit system"
      className="relative inline-flex w-full items-center rounded-full bg-secondary p-1"
    >
      {/* Sliding thumb */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm transition-transform duration-200 ease-out",
          isMetric ? "translate-x-0" : "translate-x-[calc(100%+0px)]",
        )}
        style={{ left: 4 }}
      />
      <button
        type="button"
        role="tab"
        aria-selected={isMetric}
        onClick={() => onChange("metric")}
        className={cn(
          "relative z-10 flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
          isMetric ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {metricLabel}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={!isMetric}
        onClick={() => onChange("imperial")}
        className={cn(
          "relative z-10 flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
          !isMetric ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {imperialLabel}
      </button>
    </div>
  );
}
