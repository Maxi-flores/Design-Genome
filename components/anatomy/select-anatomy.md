# PFSelect Anatomy

## Purpose

Allow users to choose from a controlled set of options.

## Architectural Role

`intake-desk`

## Required Slots

- `label`
- `trigger`
- `options`

## Optional Slots

- `optional_description`
- `optional_error`
- `optional_placeholder`

## Allowed Variants

- `default`
- `quiet`
- `error`
- `success`

## Required States

- `default`
- `hover`
- `focus`
- `disabled`
- `open`
- `error`

## Accessibility Requirements

- Options must be understandable.
- Selected value must be clear.
- Keyboard accessibility is required.

## Token Dependencies

- `--space-2`
- `--space-3`
- `--space-4`
- `--radius-sm`
- `--text-small`
- `--text-body`
- `--focus-ring-width`
- `--focus-ring-offset`
- `--focus-ring-color`
- `--elevation-2`

## Composition Rules

- Use controlled option sets only.
- Labels and descriptions should clarify the decision.
- Option labels should be concise and comparable.

## Anti-Patterns

- Unbounded search disguised as a select.
- Vague option labels.
- Selected states that rely only on color.

## Implementation Notes For Future v0.5

- Keep trigger and option list primitives neutral.
- Preserve keyboard behavior and readable selected-state anatomy.
