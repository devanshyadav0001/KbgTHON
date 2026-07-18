---
name: AMR Guard Design System
colors:
  surface: '#0e1322'
  surface-dim: '#0e1322'
  surface-bright: '#343949'
  surface-container-lowest: '#090e1c'
  surface-container-low: '#161b2b'
  surface-container: '#1a1f2f'
  surface-container-high: '#25293a'
  surface-container-highest: '#2f3445'
  on-surface: '#dee1f7'
  on-surface-variant: '#bbcac6'
  inverse-surface: '#dee1f7'
  inverse-on-surface: '#2b3040'
  outline: '#859490'
  outline-variant: '#3c4947'
  surface-tint: '#4fdbc8'
  primary: '#4fdbc8'
  on-primary: '#003731'
  primary-container: '#14b8a6'
  on-primary-container: '#00423b'
  inverse-primary: '#006b5f'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#16bb83'
  on-tertiary-container: '#00442c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#71f8e4'
  primary-fixed-dim: '#4fdbc8'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005048'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0e1322'
  on-background: '#dee1f7'
  surface-variant: '#2f3445'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
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
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
The design system for this health-tech platform is built upon a foundation of **Premium Glassmorphism**. It is designed to evoke a sense of advanced intelligence, precision, and medical authority while remaining accessible to a broad audience. The visual narrative balances the "cold" efficiency of AI with the "warm" necessity of human health awareness.

The aesthetic utilizes deep, immersive navy environments punctuated by high-vibrancy teal and cyan accents. This contrast directs user attention toward critical data and educational insights. The interface feels lightweight and layered, using translucent surfaces to maintain a sense of depth and spatial awareness, suggesting a multi-dimensional approach to solving antimicrobial resistance.

## Colors
The palette is centered on a **Deep Navy (#0a0f1e)** base to reduce eye strain and provide a sophisticated backdrop for medical data. 

- **Primary Accent**: A vibrant Teal-to-Cyan gradient is reserved for primary actions, progress indicators, and "active" AI states. 
- **Surface Logic**: Glass surfaces use a semi-transparent Slate-800 mix with a heavy backdrop blur (20px) to ensure legibility and create a sense of physical layering.
- **Semantic Coloration**: Standardized Emerald (Success), Amber (Warning), and Red (Danger) are used for resistance level indicators and health status updates, ensuring immediate cognitive recognition of risks.

## Typography
The typographic system uses a tiered hierarchy to separate "Narrative" from "Data."

- **Headlines (Outfit)**: A modern geometric sans-serif that feels clean and optimistic. High weights (700-800) are used for impactful headings and hero sections.
- **Body (Inter)**: Chosen for its exceptional readability in dense medical or educational contexts. 
- **Data & Labels (JetBrains Mono)**: Used for technical readouts, microbial DNA sequences, or specific resistance metrics to provide a scientific, precise character.

All large display text should utilize slightly tighter letter-spacing to maintain a "premium" feel.

## Layout & Spacing
The design system employs a **Fluid Grid** model with a 12-column structure for desktop and a single-column stack for mobile. 

- **Rhythm**: A 4px base unit governs all padding and margins. 
- **Margins**: Use 24px (lg) margins on mobile to ensure content doesn't feel cramped against screen edges.
- **Grouping**: Related health data points should be grouped within cards using 16px (md) internal padding, while separate modules should be spaced with 32px (xl) or 48px (2xl) to allow the glass background to "breathe."

## Elevation & Depth
Depth is not achieved through traditional shadows, but through **Tonal Stacking and Blur**.

- **Level 1 (Base)**: The deep navy background (#0a0f1e).
- **Level 2 (Cards/Surfaces)**: Glassmorphic layers with 20px backdrop-blur. These use a 1px solid border at 6% white opacity to define edges against the dark background.
- **Level 3 (Overlays/Modals)**: Higher opacity glass (70%) with a slight inner glow (0.5px white) on the top edge to simulate light catching the "rim" of the glass.
- **Interaction**: On hover, cards should increase in background opacity by 10% and the border opacity should double to 12%.

## Shapes
The shape language is "Approachable Geometric." 

- **Cards**: Fixed at 16px radius to feel friendly and modern.
- **Buttons**: Slightly tighter at 12px to imply precision and action.
- **Badges/Chips**: Full pill-shape (999px) to contrast against the more structured card layouts.

## Components
- **Buttons**: Primary buttons use the Teal-to-Cyan gradient with white text. Secondary buttons are "Ghost" style with the subtle border and a blur effect. All buttons have a 12px corner radius.
- **Cards**: Essential for data display. Must feature the 20px backdrop-blur and 16px radius. Titles within cards should use Outfit 600.
- **Progress Bars**: Used for resistance tracking or loading states. Use a dark track (#1e293b) with a Teal gradient fill. Add a subtle "shimmer" animation—a light streak moving left-to-right—to denote active AI processing.
- **Status Badges**: Small pill shapes using semantic colors (e.g., Emerald for "Low Resistance"). Use a low-opacity background of the color with a high-opacity text of the same color for legibility.
- **Input Fields**: Dark backgrounds with the subtle white border. On focus, the border should transition to the Teal primary color with a soft outer glow (0px 0px 8px rgba(20, 184, 166, 0.3)).
- **Data Visualization**: Charts should avoid solid fills; use gradients and line-weights that mimic the "glow" of the primary accent colors.