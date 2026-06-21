# PFModal Anatomy

## Purpose

Focus attention on a temporary task, confirmation, or critical information.

## Architectural Role

`temporary-chamber`

## Required Slots

- `header`
- `body`

## Optional Slots

- `optional_footer_actions`
- `optional_close_control`

## Allowed Variants

- `default`
- `confirmation`
- `critical`

## Required States

- `closed`
- `opening`
- `open`
- `closing`

## Accessibility Requirements

- Focus must be trapped while open.
- A clear escape path must exist.
- Title and purpose must be announced.

## Token Dependencies

- `--space-4`
- `--space-5`
- `--space-6`
- `--radius-2xl`
- `--text-h3`
- `--elevation-4`
- `--duration-normal`
- `--ease-enter`
- `--ease-exit`
- `--focus-ring-width`
- `--focus-ring-offset`
- `--focus-ring-color`
- `--z-modal`

## Composition Rules

- Modals must have a clear escape.
- Do not use modals for complex workflows unless necessary.
- Focus must be trapped inside while open.

## Anti-Patterns

- Stacked modals by default.
- Long multistep workflows in small dialogs.
- Hidden or ambiguous close behavior.

## Implementation Notes For Future v0.5

- Use neutral overlay and surface primitives only.
- Keep motion short and reduced-motion friendly.
