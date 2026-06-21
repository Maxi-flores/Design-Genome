# PFDataTable Anatomy

## Purpose

Display structured records for scanning, comparison, filtering, and action.

## Architectural Role

`ledger`

## Required Slots

- `table_header`
- `columns`
- `rows`

## Optional Slots

- `optional_toolbar`
- `optional_pagination`
- `optional_empty_state`

## Allowed Variants

- `default`
- `dense`
- `comfortable`
- `zebra`

## Required States

- `default`
- `loading`
- `empty`
- `sorted`
- `filtered`

## Accessibility Requirements

- Preserve table semantics.
- Sorting and filtering controls must be described.
- Interactive cells must remain keyboard reachable.

## Token Dependencies

- `--space-2`
- `--space-3`
- `--space-4`
- `--text-small`
- `--text-body`
- `--radius-sm`
- `--focus-ring-width`
- `--focus-ring-offset`
- `--focus-ring-color`

## Composition Rules

- Tables must remain readable.
- Actions must be predictable.
- Sorting and filtering controls must be clear.

## Anti-Patterns

- Using tables for unstructured narrative content.
- Hiding primary data under unclear controls.
- Packing too many unrelated actions into rows.

## Implementation Notes For Future v0.5

- Keep density and scanning rhythm adjustable through tokens.
- Preserve a clean ledger structure before introducing richer states.
