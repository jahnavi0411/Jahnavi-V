---
name: Academic Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#4b41e1'
  on-secondary: '#ffffff'
  secondary-container: '#645efb'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002114'
  on-tertiary-container: '#069669'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#0f0069'
  on-secondary-fixed-variant: '#3323cc'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an authoritative, high-density environment tailored for curriculum architects, university department heads, and accreditation review panels. The visual tone is structured, objective, and deeply trustworthy—bridging the rigor of higher education standards with the fluidity of modern enterprise software.

Drawing from modern minimalist corporate architecture with tactile, document-centered refinement, the interface prioritizes structured data legibility, complex matrix mapping, and zero-distraction workflows. Surfaces feel crisp, clinical, and architectural rather than playful. Every line, badge, and interactive token conveys institutional authority, precision, and compliance integrity.

## Colors

The palette balances deep academic slate tones with precise technical indicators:

- **Primary (`#0F172A`)**: Deep Navy Slate anchor for structural chrome, persistent navigation, primary headings, and authoritative containers.
- **Secondary (`#4F46E5`)**: Crisp Indigo Accent reserved for primary interactive vectors, focused states, constructive pathway actions, and curriculum link maps.
- **Tertiary (`#059669`)**: Emerald Accreditation Accent exclusively applied to compliance validation states, credit hour verifications, certified milestones, and accredited status badges.
- **Neutral (`#64748B`)**: Cool Slate Neutral driving subordinate data values, auxiliary metadata, inactive borders, and structural framing.

Background surfaces rely on crisp cool foundations: `#F8FAFC` for ambient viewport backgrounds, `#FFFFFF` for working document sheets and cards, and `#E2E8F0` for structural dividing lines.

## Typography

The typographic hierarchy relies on pure systematic precision via Inter. Vertical metric tracking is intentionally compact to preserve high visual density across accreditation rubrics, course outcome lists, and syllabus dependency trees.

Tabular figures (`font-variant-numeric: tabular-nums`) must be enforced on all credit-hour counters, course codes, and assessment percentages. Section labels and outcome badges use medium-to-semibold weights with slight tracking expansion to ensure legibility at micro scales.

## Layout & Spacing

Layouts follow a structured 12-column responsive fluid grid anchored by fixed workbench rails for course navigation and curriculum hierarchies. 

- **Desktop (>= 1280px)**: 12-column grid, 2rem margins, 1.5rem gutters. A 280px fixed structural panel houses syllabus outlines and audit sidebars.
- **Tablet (768px - 1279px)**: 8-column layout, 1.5rem margins, 1rem gutters. Sidebars fold into collapsible overlay trays.
- **Mobile (< 768px)**: 4-column layout, 1rem margins, 0.75rem gutters. Complex matrix builders stack vertically into progressive outcome steps.

Density remains high inside data tables and form grids: vertical stacking leverages `space-xs` and `space-sm` for related field-label pairings, while distinct curriculum sections split along `space-lg` and `space-xl` dividers.

## Elevation & Depth

Visual separation is primarily established through structured low-contrast borders (`1px solid #E2E8F0`) and calibrated surface tiers rather than heavy dropshadows:

- **Tier 0 (Canvas)**: `#F8FAFC` base application canvas.
- **Tier 1 (Surface Cards & Workbenches)**: `#FFFFFF` with `border: 1px solid #E2E8F0` and subtle ambient contact shadow `0 1px 3px 0 rgba(15, 23, 42, 0.05)`.
- **Tier 2 (Popovers, Dropdowns, Audit Flyouts)**: `#FFFFFF` with `border: 1px solid #CBD5E1` and ambient elevation `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)`.
- **Tier 3 (Modal Dialogs & Accreditation Sign-off Sheets)**: `#FFFFFF` with `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.

## Shapes

The interface embraces a crisp, disciplined "Soft" corner geometry (`roundedness: 1`). 

Standard interactive targets—buttons, input fields, dropdown toggles, and status badges—feature a strict `0.25rem` (4px) corner radius. Structural modules, course cards, and compliance containers scale to `0.5rem` (8px). Pills and fully rounded geometries are barred from form elements and data modules, reserved only for terminal state counters and micro badge indicators.

## Components

### Buttons
- **Primary**: Solid Indigo (`#4F46E5`) fill, white text, subtle hover lift to `#4338CA`. Tactile active press state (`transform: scale(0.99)`). 36px desktop height, 44px mobile touch target.
- **Secondary**: `#FFFFFF` background with 1px `#CBD5E1` border, `#0F172A` text. Hover shifts to `#F8FAFC` surface with `#94A3B8` border.
- **Destructive**: Pale red surface (`#FEF2F2`), `#DC2626` text and border for module deprecation and objective deletion.

### Badges & Chips
- **Accreditation Badge**: `#ECFDF5` background, `#059669` border and text. Accompanied by a 6px solid emerald status pip indicating compliant validation.
- **Taxonomy/Outcome Chip**: `#F1F5F9` neutral surface, `#475569` text, crisp 1px `#E2E8F0` border. Optional trailing dismiss action for prerequisite tags.

### Inputs & Form Fields
- Strict 1px `#CBD5E1` baseline border on `#FFFFFF` input planes.
- Focused state eliminates generic glow rings; applies a clean 1.5px `#4F46E5` outline with crisp outline-offset.
- Error state incorporates `#DC2626` framing accompanied by inline micro validation labels directly underneath.

### Checkboxes & Radios
- Checkboxes: 16px square, 3px border radius, `#CBD5E1` boundary. Checked state fills `#4F46E5` with sharp white SVG tick.
- Radios: 16px circular boundary, selected state features a clean 6px centered `#4F46E5` disc.

### Cards & Curriculum Units
- Course module wrappers leverage pure `#FFFFFF` backings, a 1px `#E2E8F0` frame, and an optional 3px left-accent border strip (Emerald for validated modules, Indigo for modules currently under revision, Slate for drafts).

### Domain-Specific Components
- **Competency Matrix Row**: Monospaced outcome index (`CS-LO-101`), inline Bloom's Taxonomy classification tag, inline assessment linkage mapping, and credit-hour verification ledger.
- **Accreditation Audit Rail**: Sticky vertical ledger displaying real-time compliance checks (e.g., ABET, WASC criteria), using clear tertiary green check indicators and neutral pending dots.