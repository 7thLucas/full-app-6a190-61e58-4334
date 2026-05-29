# BodyCheck — Design Guidelines

## Design Philosophy
Calm, clean, confident. The interface should feel like a trusted friend handing you a glass of water — not a doctor's office, not a fitness app, not a clinical tool. Generous whitespace, soft edges, gentle motion.

## Colors

### Primary Palette
- **Background:** `#FAFAF7` (warm off-white, easy on the eyes)
- **Surface:** `#FFFFFF` (pure white for the calculator card)
- **Primary Accent:** `#10B981` (calm, encouraging green — used for the "Healthy" state and primary actions)
- **Text Primary:** `#1F2937` (deep slate, high readability)
- **Text Secondary:** `#6B7280` (muted gray for helper text)
- **Border / Divider:** `#E5E7EB` (subtle hairline)

### Category Colors (semantic, tasteful — NOT alarming)
- **Underweight:** `#60A5FA` (soft sky blue — calm, neutral)
- **Healthy:** `#10B981` (gentle green — encouraging)
- **Overweight:** `#F59E0B` (warm amber — neutral, not red)
- **Obese:** `#EF4444` (soft coral red — used sparingly, paired with kind copy)

Color is a visual cue, never a verdict.

## Typography

### Font Family
- **Primary:** `Inter` (system fallback: -apple-system, BlinkMacSystemFont, sans-serif)
- **Display / Number:** `Inter` with tabular numerals for the BMI result

### Scale
- **Display (BMI result):** 72px / weight 600 / tracking -0.02em
- **H1 (page title):** 36px / weight 700 / tracking -0.01em
- **H2 (section):** 24px / weight 600
- **Body:** 16px / weight 400 / line-height 1.6
- **Caption / Helper:** 14px / weight 400 / color: text-secondary
- **Label:** 14px / weight 500 / uppercase letter-spacing 0.05em (sparingly)

## Spacing
- Base unit: 4px
- Component padding: 24px (mobile), 32px (desktop)
- Section spacing: 48px–64px between major blocks
- Generous whitespace is the default — never crowd the result

## Layout
- **Single-column, centered layout** — max-width 480px for the calculator card, 640px for the page
- Mobile-first; the calculator should feel native on a phone
- Above the fold: page title, calculator card, result. No scroll required on desktop.

## Components

### Calculator Card
- White surface (`#FFFFFF`)
- Rounded corners: 16px
- Soft shadow: `0 4px 24px rgba(0, 0, 0, 0.04)`
- Padding: 32px
- Contains: unit toggle, height input, weight input, result display

### Unit Toggle (Metric / Imperial)
- Segmented control style
- Background: `#F3F4F6`
- Active segment: white surface with subtle shadow
- Smooth transition (200ms ease)

### Input Fields
- Height: 56px (comfortable touch target)
- Border: 1px solid `#E5E7EB`
- Border-radius: 12px
- Focus state: 2px ring in primary accent
- Label above, helper text below
- Large, readable numeric input (18px)

### Result Display
- Appears below inputs with a gentle fade-in (300ms)
- BMI number: 72px display weight, color matches category
- Category label: 18px, weight 600, color matches category
- Interpretation copy: 16px, text-primary, max-width 360px, line-height 1.6

### Buttons (if needed for reset/share)
- Primary: solid primary accent, white text, 12px border-radius, 48px height
- Secondary: ghost style, primary accent text, transparent background
- Hover: subtle scale (1.02) + slight shadow lift

## Elevation
- **Level 0 (page background):** flat
- **Level 1 (calculator card):** `0 4px 24px rgba(0, 0, 0, 0.04)`
- **Level 2 (focused input / hovered button):** `0 6px 32px rgba(0, 0, 0, 0.06)`

## Motion
- All transitions: 200–300ms, `ease-out` curve
- Result fade-in: 300ms with subtle upward translate (4px)
- Unit toggle: 200ms cross-fade
- No bouncy or playful animations — calm and intentional

## Accessibility
- WCAG AA contrast minimum (all category colors tested against white)
- All inputs labeled
- Focus rings visible
- Numeric inputs use `inputmode="decimal"` on mobile
- Result region uses `aria-live="polite"` so screen readers announce updates

## Voice in UI
- Microcopy is short, warm, and human
  - Placeholder: "e.g. 170" not "Enter height in cm"
  - Result blurbs: "You're in the healthy range — nice." not "Your BMI is within normal parameters."
- Never use exclamation marks for medical categories
- Always close with a soft, honest line: "BMI is a rough guide, not the whole picture."

## Don'ts
- No stock fitness photography
- No scales, dumbbells, or "before/after" imagery
- No red alert banners or warning icons
- No gradients on the result number (keep it clean and confident)
- No dark mode at launch — the warm off-white IS the brand
