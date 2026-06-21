# PFWorkspaceGrid Anatomy

## Purpose

Arrange workspace regions using Foundation spacing and responsive behavior.

## Architectural Role

`floor`

## Required Slots

- `regions`

## Optional Slots

- `optional_sidebar`
- `optional_intelligence_rail`

## Allowed Variants

- `default`
- `two-column`
- `three-column`
- `dashboard`

## Required States

- `default`

## Accessibility Requirements

- Reading order must remain logical at every breakpoint.
- Collapsed layouts must preserve access to every region.
- Keyboard traversal must remain coherent.

## Token Dependencies

- `--space-4`
- `--space-5`
- `--space-6`
- `--bp-md`
- `--bp-lg`
- `--bp-xl`
- `--bp-2xl`

## Composition Rules

- No arbitrary grid spacing.
- Use Foundation breakpoints.
- Maintain visual rhythm.

## Anti-Patterns

- Custom spacing outside Foundation.
- Breakpoint behavior that hides critical regions.
- Density that weakens the dominant workspace.

## Implementation Notes For Future v0.5

- Keep layout primitives token-driven and responsive.
- Avoid hardcoding application-specific region maps.
