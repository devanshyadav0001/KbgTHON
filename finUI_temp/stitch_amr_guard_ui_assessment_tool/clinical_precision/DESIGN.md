---
name: Clinical Precision
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45474c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#00190e'
  on-tertiary: '#ffffff'
  tertiary-container: '#00301f'
  on-tertiary-container: '#24a375'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is built on the pillars of authority, clarity, and trust. It targets healthcare professionals and patients who require immediate access to critical data without visual distraction. The aesthetic leans into **Corporate Modernism** with a clinical edge, prioritizing functional hierarchy over decorative elements.

The UI avoids all "vibe-coded" trends like glassmorphism or glowing effects in favor of a "Paper & Light" metaphor. It evokes a sense of sterile efficiency and calm through high-contrast legibility, generous negative space, and structured information density.

## Colors
The palette is rooted in medical semiotics. **Deep Navy** provides the structural authority for headers and primary text. **Medical Blue** is used for interactive elements and highlights to instill trust. **Deep Emerald** serves as a semantic indicator for positive health outcomes, safety, and "Success" states.

The background uses a "Cool Gray" base to reduce eye strain compared to pure white, while maintaining a clean, sterile environment. Neutral tones are used strictly for secondary information and structural borders.

## Typography
This design system utilizes a dual-font strategy. **Plus Jakarta Sans** is used for headlines to provide a modern, slightly softer professional tone. **Inter** is used for all body text, data points, and labels due to its exceptional legibility in dense interfaces.

For medical data, use `body-md` as the default reading size. Labels should use the `label-md` style with uppercase tracking to differentiate descriptors from actual patient data values.

## Layout & Spacing
The layout follows a strict **12-column fluid grid** for desktop and a **4-column grid** for mobile. A 4px baseline rhythm ensures vertical consistency. 

In clinical views, whitespace is used as a separator rather than lines whenever possible. High-density data views should transition to an 8px spacing unit, while patient-facing marketing or profile pages should use 16px/24px units to feel more approachable. Content is centered with a max-width of 1440px on extra-large displays to prevent line-length issues in medical records.

## Elevation & Depth
Depth is achieved through **Tonal Layers** and **Subtle Shadows**. Surfaces do not float high above the background; instead, they sit just above it to maintain a grounded, professional feel.

- **Level 0 (Background):** #f8fafc (Cool Gray).
- **Level 1 (Cards/Surface):** #ffffff (Pure White) with a 1px border (#e2e8f0).
- **Level 2 (Dropdowns/Modals):** Pure White with a `shadow-md` (0 4px 6px -1px rgb(0 0 0 / 0.1)).

Avoid all blurs, glows, or colored shadows. Use low-contrast outlines (1px solid) to define sections within a page.

## Shapes
The shape language is **Soft** but disciplined. A 4px (0.25rem) radius is the standard for functional elements like input fields and buttons, conveying precision. Larger containers like cards may use up to 8px (0.5rem) to slightly soften the professional atmosphere, but pill-shaped elements are reserved exclusively for status "Chips" and "Tags."

## Components
### Buttons
Buttons are solid and flat. **Primary Buttons** use Deep Navy (#1e293b) with white text. **Secondary Buttons** use an outline style with Medical Blue (#0ea5e9). Hover states involve a slight darkening of the hex code, never a glow or shadow increase.

### Input Fields
Fields use a 1px border (#cbd5e1) and white background. Focused states use a 2px Medical Blue border. Labels are always visible above the field (never just placeholders) to ensure accessibility in high-stress environments.

### Cards
Cards are the primary container for patient data. They must include a `1px` border (#e2e8f0) and a very light shadow. Headers within cards should have a subtle bottom border to separate titles from content.

### Data Tables
Tables are the backbone of this system. Use zebra-striping (alternating #f8fafc and #ffffff) for long lists. Column headers are `label-md` with a background fill of #f1f5f9.

### Status Chips
Use background tints for status:
- **Success:** Emerald background (10% opacity) with Emerald text.
- **Critical:** Red background (10% opacity) with Red text.
- **Pending:** Amber background (10% opacity) with Amber text.