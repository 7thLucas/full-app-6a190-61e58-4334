import type { MetaFunction } from "react-router";
import { useConfigurables } from "~/modules/configurables";
import { BmiCalculator } from "~/components/bodycheck/bmi-calculator";

export const meta: MetaFunction = () => {
  return [
    { title: "BodyCheck — What's my BMI?" },
    {
      name: "description",
      content:
        "A clean, no-friction BMI calculator. Type in your height and weight, see your number, understand what it means. No accounts. No tracking.",
    },
  ];
};

export default function IndexPage() {
  const { config, loading } = useConfigurables();

  // Resolve everything with safe fallbacks so first-paint never shows
  // "FILL_X_HERE" tokens even before the API has responded.
  const appName = config?.appName || "BodyCheck";
  const tagline = config?.tagline || "Your BMI, in seconds.";
  const headline = config?.headline || "What's my BMI?";
  const subheadline =
    config?.subheadline ||
    "Type in your height and weight. We'll handle the math.";
  const footerText = config?.footerText || "";
  const logoUrl =
    config?.logoUrl && !config.logoUrl.startsWith("FILL_") ? config.logoUrl : "";

  return (
    <main
      className="relative min-h-screen w-full bg-background"
      style={{
        backgroundColor: config?.pageBackground || undefined,
      }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[640px] flex-col items-center px-5 pb-16 pt-10 sm:px-6 sm:pt-16">
        {/* ── Header ───────────────────────────────────────────── */}
        <header className="flex w-full flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2.5">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${appName} logo`}
                className="h-8 w-8 rounded-lg object-contain"
              />
            ) : (
              <LogoFallback />
            )}
            <span className="text-base font-semibold tracking-tight text-foreground">
              {appName}
            </span>
          </div>
          {tagline ? (
            <p className="text-sm text-muted-foreground">{tagline}</p>
          ) : null}
        </header>

        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="mt-10 flex w-full flex-col items-center gap-3 text-center sm:mt-14">
          <h1
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.01em" }}
          >
            {headline}
          </h1>
          <p className="max-w-[440px] text-base leading-relaxed text-muted-foreground">
            {subheadline}
          </p>
        </section>

        {/* ── Calculator card ─────────────────────────────────── */}
        <div className="mt-8 flex w-full justify-center sm:mt-10">
          {/*
            We render the calculator even while configurables are still loading;
            it falls back to sensible defaults internally so the UX is never
            blocked behind a spinner — speed is the #1 strategic principle.
          */}
          <BmiCalculator />
        </div>

        {/* ── Footer ──────────────────────────────────────────── */}
        <footer className="mt-auto pt-12 text-center">
          {footerText ? (
            <p className="text-xs text-muted-foreground">{footerText}</p>
          ) : null}
        </footer>

        {/* Tiny hidden hint for screen readers while initial fetch resolves. */}
        {loading ? (
          <span className="sr-only" aria-live="polite">
            Loading {appName}.
          </span>
        ) : null}
      </div>
    </main>
  );
}

/**
 * Inline SVG logo fallback used when no logoUrl is configured yet.
 * Stays in the brand's primary color via `currentColor` + `text-primary`.
 */
function LogoFallback() {
  return (
    <span
      className="flex h-8 w-8 items-center justify-center rounded-lg text-primary"
      style={{ backgroundColor: "rgba(16, 185, 129, 0.12)" }}
      aria-hidden="true"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </span>
  );
}
