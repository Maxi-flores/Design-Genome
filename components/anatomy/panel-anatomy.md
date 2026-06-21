# PFPanel Anatomy

## Purpose

Provide a structural surface for grouped controls, context, or supporting information.

## Architectural Role

`wall`

## Required Slots

- `header`
- `body`

## Optional Slots

- `optional_actions`

## Allowed Variants

- `default`
- `context`
- `intelligence`
- `system`

## Required States

- `default`
- `collapsed`
- `expanded`
- `disabled`

## Accessibility Requirements

- Preserve semantic heading structure.
- Expose expanded and collapsed state when collapsible.
- Keep action areas keyboard reachable.

## Token Dependencies

- `--space-4`
- `--space-5`
- `--radius-lg`
- `--text-h3`
- `--text-body`
- `--elevation-1`

## Composition Rules

- Use panels for supporting context instead of primary navigation.
- Action areas should serve the body content.
- Intelligence variants should support orientation, not noise.

## Anti-Patterns

- Using panels as decoration.
- Overloading panels with unrelated content.
- Placing primary navigation inside arbitrary panels.

## Implementation Notes For Future v0.5

- Support calm structural surfaces before expressive styling.
- Reserve intelligence emphasis for explicit states, not permanent glow.
