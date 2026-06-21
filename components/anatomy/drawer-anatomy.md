# PFDrawer Anatomy

## Purpose

Provide contextual detail or secondary workflows while preserving workspace context.

## Architectural Role

`side-room`

## Required Slots

- `header`
- `body`

## Optional Slots

- `optional_footer_actions`
- `optional_context_summary`

## Allowed Variants

- `default`
- `detail`
- `editor`

## Required States

- `closed`
- `opening`
- `open`
- `closing`

## Accessibility Requirements

- Purpose must be announced clearly.
- Keyboard focus should move into the drawer when opened.
- Dismissal controls must remain reachable.

## Token Dependencies

- `--space-4`
- `--space-5`
- `--space-6`
- `--radius-xl`
- `--text-h3`
- `--elevation-3`
- `--duration-normal`
- `--ease-enter`
- `--ease-exit`
- `--z-drawer`

## Composition Rules

- Drawers must preserve orientation.
- Drawers should not replace primary pages for complex workflows.
- Context summary should keep the parent workspace understandable.

## Anti-Patterns

- Hidden full-page replacement behavior.
- Unrelated tasks in one drawer.
- Weak relationship between drawer and parent context.

## Implementation Notes For Future v0.5

- Keep drawer structure neutral and context-preserving.
- Prioritize predictable width and motion behavior over expressive styling.
