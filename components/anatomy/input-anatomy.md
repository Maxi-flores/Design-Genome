# PFInput Anatomy

## Purpose

Collect typed user input clearly and accessibly.

## Architectural Role

`intake-desk`

## Required Slots

- `label`
- `control`

## Optional Slots

- `optional_description`
- `optional_error`
- `optional_prefix`
- `optional_suffix`

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
- `readonly`
- `error`

## Accessibility Requirements

- Inputs require labels.
- Errors must be readable.
- Focus states are mandatory.

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

## Composition Rules

- Descriptions should clarify input meaning or format.
- Errors should explain recovery.
- Prefix and suffix content must not replace the label.

## Anti-Patterns

- Placeholder-only labeling.
- Error states without readable text.
- Hidden focus indicators.

## Implementation Notes For Future v0.5

- Keep control chrome minimal and token-driven.
- Preserve a consistent form field rhythm across densities.
