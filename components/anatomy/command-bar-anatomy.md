# PFCommandBar Anatomy

## Purpose

Expose primary workspace commands in a stable and predictable location.

## Architectural Role

`control-surface`

## Required Slots

- `primary_actions`
- `secondary_actions`

## Optional Slots

- `optional_filters`
- `optional_search`
- `optional_status`

## Allowed Variants

- `default`
- `compact`
- `elevated`

## Required States

- `default`
- `busy`
- `disabled`

## Accessibility Requirements

- Commands must remain keyboard reachable.
- Search and filters require accessible labels.
- Busy states must still communicate what actions exist.

## Token Dependencies

- `--space-3`
- `--space-4`
- `--space-5`
- `--radius-md`
- `--text-body`
- `--weight-medium`
- `--elevation-2`
- `--z-command-bar`

## Composition Rules

- Keep primary actions visually distinct.
- Avoid command overload.
- Commands must be task-oriented.

## Anti-Patterns

- Mixing unrelated workspace actions.
- Hiding critical actions among secondary controls.
- Overusing icon-only controls.

## Implementation Notes For Future v0.5

- Preserve a stable structural region across densities.
- Plan for adaptable slots without changing the command hierarchy.
