import { forwardRef } from "react";
import { cn } from "~/lib/utils";

interface MeasurementInputProps {
  id: string;
  /** Visible label shown above the input. Pass empty string to suppress. */
  label: string;
  /**
   * Falls back to `label` when label is empty (used by paired ft/in inputs
   * where the visible label sits on the parent group).
   */
  ariaLabel?: string;
  unit: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  /** Optional helper text shown below the field (e.g. "between 100 and 250"). */
  helper?: string;
  /** Visual width hint — use "narrow" for paired ft/in fields. */
  width?: "full" | "narrow";
}

/**
 * Numeric measurement input with stacked label, unit pill, and helper text.
 *
 * Design contract:
 * - 56px tall touch target
 * - 12px border radius
 * - Soft hairline border, 2px primary ring on focus
 * - Uses inputmode="decimal" so mobile keyboards show numeric pad
 * - Accepts both "." and "," as decimal marks (parsed upstream)
 */
export const MeasurementInput = forwardRef<HTMLInputElement, MeasurementInputProps>(
  function MeasurementInput(
    {
      id,
      label,
      ariaLabel,
      unit,
      value,
      onChange,
      placeholder,
      helper,
      width = "full",
    },
    ref,
  ) {
    const computedAriaLabel = label || ariaLabel || unit;
    return (
      <div className={cn("flex flex-col gap-2", width === "narrow" ? "flex-1" : "w-full")}>
        {label ? (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
          </label>
        ) : null}
        <div
          className={cn(
            "group relative flex h-14 items-center rounded-xl border border-border bg-white",
            "transition-shadow duration-200 ease-out",
            "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30",
            "hover:shadow-[0_6px_32px_rgba(0,0,0,0.06)]",
          )}
        >
          <input
            ref={ref}
            id={id}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            aria-label={computedAriaLabel}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className={cn(
              "h-full w-full rounded-xl bg-transparent px-4 text-lg text-foreground outline-none",
              "placeholder:text-muted-foreground/70 bodycheck-tabnums",
            )}
          />
          <span
            aria-hidden="true"
            className="mr-4 select-none text-sm font-medium text-muted-foreground"
          >
            {unit}
          </span>
        </div>
        {helper ? (
          <p className="text-xs text-muted-foreground">{helper}</p>
        ) : null}
      </div>
    );
  },
);
