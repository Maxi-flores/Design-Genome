# PFStatusBadge Anatomy

## Purpose

Communicate state clearly and consistently.

## Architectural Role

`signal`

## Required Slots

- `label`

## Optional Slots

- `leading_icon`

## Allowed Variants

- `default`
- `subtle`
- `emphasis`

## Required States

- `active`
- `running`
- `completed`
- `paused`
- `blocked`
- `warning`
- `error`
- `draft`
- `archived`

## Accessibility Requirements

- Status color may not be the only meaning carrier.
- Labels must be readable.
- Status semantics must match Foundation status tokens.

## Token Dependencies

- `--space-1`
- `--space-2`
- `--space-3`
- `--radius-full`
- `--text-caption`
- `--weight-medium`

## Composition Rules

- Use only standardized semantic states.
- Keep labels concise.
- Pair with context when the badge alone is not enough.

## Anti-Patterns

- Decorative tag usage with fake statuses.
- Custom status semantics outside Foundation.
- Meaning carried only by color.

## Implementation Notes For Future v0.5

- Keep badge sizing compact and consistent.
- Avoid introducing project-specific chroma in the primitive implementation phase.
