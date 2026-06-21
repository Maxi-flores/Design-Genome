# PFMetricCard Anatomy

## Purpose

Display one measurable value, status, or trend.

## Architectural Role

`instrument`

## Required Slots

- `label`
- `value`

## Optional Slots

- `optional_delta`
- `optional_status`
- `optional_description`

## Allowed Variants

- `default`
- `success`
- `warning`
- `danger`
- `neutral`

## Required States

- `default`
- `loading`
- `updated`

## Accessibility Requirements

- Labels and units must be clear.
- Meaning must not depend on color alone.
- Important updates should be announced appropriately.

## Token Dependencies

- `--space-3`
- `--space-4`
- `--radius-md`
- `--text-small`
- `--text-h2`
- `--weight-medium`
- `--weight-semibold`
- `--elevation-1`

## Composition Rules

- One metric per card.
- Use description for context, not duplication.
- Variants should reflect the semantic state of the metric.

## Anti-Patterns

- Displaying multiple unrelated metrics.
- Using unclear units.
- Using color without text meaning.

## Implementation Notes For Future v0.5

- Keep value prominence strong while maintaining accessible supporting text.
- Allow compact and executive density without changing the core anatomy.
