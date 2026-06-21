# PFTimeline Anatomy

## Purpose

Represent ordered events, project phases, activity history, or progress over time.

## Architectural Role

`road`

## Required Slots

- `items`

## Optional Slots

- `optional_header`
- `optional_current_marker`
- `optional_legend`

## Allowed Variants

- `default`
- `compact`
- `detailed`
- `progress`

## Required States

- `default`
- `current`
- `completed`
- `upcoming`

## Accessibility Requirements

- Event order must be understandable without layout cues alone.
- Current position must be clear when relevant.
- Time labels must remain readable.

## Token Dependencies

- `--space-3`
- `--space-4`
- `--space-5`
- `--text-small`
- `--text-body`
- `--radius-full`

## Composition Rules

- Order must be clear.
- States must be readable.
- Current position should be obvious when relevant.

## Anti-Patterns

- Timelines without meaningful order.
- Overloaded event items.
- Ambiguous current-state markers.

## Implementation Notes For Future v0.5

- Support both vertical and horizontal primitives without changing semantics.
- Keep timeline markers and labels token-driven.
