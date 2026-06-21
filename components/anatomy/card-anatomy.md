# PFCard Anatomy

## Purpose

Contain one focused unit of information or action.

## Architectural Role

`room`

## Required Slots

- `header`
- `body`

## Optional Slots

- `optional_footer`

## Allowed Variants

- `default`
- `interactive`
- `selected`
- `muted`
- `elevated`

## Required States

- `default`
- `hover`
- `focus-within`
- `selected`
- `disabled`

## Accessibility Requirements

- Interactive cards must expose clear keyboard focus.
- Selected state must not rely on color alone.
- Headings and content order must remain readable.

## Token Dependencies

- `--space-4`
- `--space-5`
- `--radius-md`
- `--text-body`
- `--line-body`
- `--weight-semibold`
- `--elevation-1`

## Composition Rules

- Use one card for one coherent information cluster.
- Footer content should support the body rather than compete with it.
- Prefer PFMetricCard when the primary purpose is measurement.

## Anti-Patterns

- Multiple primary actions.
- Too many unrelated metrics.
- Decorative-only card usage.
- Nested cards without purpose.

## Implementation Notes For Future v0.5

- Provide neutral surface, interactive, and selected class primitives only.
- Keep anatomy compatible with Foundation spacing and focus tokens.
