# PFEmptyState Anatomy

## Purpose

Explain absence of content and guide the user toward the next meaningful action.

## Architectural Role

`unoccupied-room`

## Required Slots

- `title`
- `message`

## Optional Slots

- `optional_action`
- `optional_secondary_action`
- `optional_illustration`

## Allowed Variants

- `default`
- `compact`
- `actionable`

## Required States

- `default`

## Accessibility Requirements

- Messages must be explicit and readable.
- Actions must be keyboard reachable.
- Illustrations must not carry required meaning.

## Token Dependencies

- `--space-4`
- `--space-5`
- `--space-6`
- `--radius-lg`
- `--text-h3`
- `--text-body`
- `--text-small`

## Composition Rules

- Empty states must be useful.
- Avoid vague messages.
- Offer one clear next step where possible.

## Anti-Patterns

- Apology-only messaging.
- Multiple competing recovery actions.
- Illustration-first layouts that bury the message.

## Implementation Notes For Future v0.5

- Keep the primitive centered on structure and readable message flow.
- Use illustration as optional support only.
