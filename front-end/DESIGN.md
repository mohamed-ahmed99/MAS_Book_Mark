---
name: Monolith System
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e4e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e4e2e1'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c7c6c6'
  on-secondary: '#303031'
  secondary-container: '#464747'
  on-secondary-container: '#b6b5b5'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e4e2e1'
  surface-variant: '#353535'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 16px
  margin: 24px
---

## Brand & Style

This design system is built on a philosophy of "Technical Minimalism." It treats the UI as a high-precision instrument, blending the aesthetics of a premium smartphone operating system with the functional density of a high-end SaaS platform. The system prioritizes clarity, structural integrity, and immediate legibility.

The visual style is characterized by:
- **Architectural Layouts:** Every element is aligned to a strict grid, emphasizing a sense of order and reliability.
- **Micro-interactions:** Motion should be swift and mechanical, mimicking the haptics of physical hardware.
- **The "App Icon" Paradigm:** Content is grouped into distinct, identifiable modules rather than sprawling cards, creating a workspace that feels like a curated dashboard of tools.
- **High-End Utility:** By stripping away gradients and expressive color, the focus remains entirely on data, typography, and user action.

## Colors

The palette is strictly monochrome, relying on contrast and value rather than hue to establish hierarchy.

**Dark Mode (Primary)**
- **Surface:** `#0A0A0A` serves as the canvas, providing a deep, ink-like backdrop.
- **Elevated Surface:** `#171717` for secondary containers.
- **Border:** `#262626` for subtle separation; `#404040` for interactive states.
- **Text:** `#FFFFFF` (High emphasis), `#A3A3A3` (Medium emphasis), `#737373` (Disabled/Metadata).

**Light Mode**
- **Surface:** `#FFFFFF` for the main canvas.
- **Elevated Surface:** `#F5F5F5` for containers.
- **Border:** `#E5E5E5` for standard separation.
- **Text:** `#000000` (High emphasis), `#525252` (Medium emphasis), `#737373` (Disabled/Metadata).

## Typography

Typography is used as a structural element. **Geist** provides a clean, technical sans-serif feel for the majority of the interface. For headings, tight letter-spacing (negative tracking) is mandatory to achieve a "dense" premium look. 

**JetBrains Mono** is introduced for labels, status indicators, and metadata to reinforce the "technical/developer" nature of the tool. Use it sparingly for non-prose elements to maintain high information density without sacrificing aesthetics.

## Layout & Spacing

This design system uses a strict 4px grid system. All dimensions, padding, and margins must be multiples of 4.

**Layout Model:**
- **The "Dock" approach:** Layouts should center around a main workspace with persistent, slim sidebars or a bottom "dock" bar.
- **Grid:** Use a 12-column fluid grid for desktop with 16px gutters.
- **Modules:** Instead of expansive cards, group related items into compact modules (App Icon style) with fixed aspect ratios (1:1 or 4:3) where possible.
- **Reflow:** On mobile, margins reduce to 16px and the 12-column grid collapses to a single column, with the dock transitioning to a bottom-fixed navigation element.

## Elevation & Depth

This system avoids traditional deep shadows to maintain a flat, technical aesthetic. Depth is communicated through color value and borders.

1.  **Level 0 (Base):** Primary background (`#0A0A0A` or `#FFFFFF`).
2.  **Level 1 (Surface):** Secondary background with a 1px solid border (`#262626` in dark, `#E5E5E5` in light). 
3.  **Level 2 (Active/Overlay):** Tertiary background with a 1px solid border. For modals or dropdowns, a very subtle, sharp shadow can be used: `0 4px 0px rgba(0,0,0,0.2)` in light mode, or a 1px `#404040` border in dark mode.
4.  **Interaction:** Hovering over an element should never trigger a shadow; instead, increase the border brightness or change the background value by one step.

## Shapes

The shape language is "Soft-Square." Elements are primarily rectangular to convey precision, but corners are subtly softened to avoid a "legacy Windows" feel.

- **Base Radius:** 4px (Used for buttons, inputs, and small modules).
- **Large Radius:** 8px (Used for primary containers or the "App Icon" style modules).
- **Interactive Elements:** Checkboxes and radio buttons use the 4px radius (never fully circular) to maintain the technical geometric theme.

## Components

**Buttons**
- **Primary:** High contrast. Pure white text on black background (light mode) or black text on pure white background (dark mode). 4px radius.
- **Ghost:** 1px border (`#262626` / `#E5E5E5`). No background until hover.

**App Icon Modules**
- These are the core navigation and dashboard units. They are squares (e.g., 64x64px or 128x128px) with an 8px radius. In dark mode, they use a `#171717` surface with a central monochrome icon.

**Inputs**
- Flat design. 1px border. No shadows. Use JetBrains Mono for placeholder text to emphasize the technical nature.

**Lists**
- Tight vertical density. Separate items with 1px horizontal lines. Use `#737373` for secondary list text.

**Status Indicators**
- Use small 6px geometric shapes (dots or squares). Even for status (Success/Error), keep the colors muted or monochrome if possible, using icons (X or Check) rather than bright reds or greens to maintain the premium monochrome look.