# PFSection Anatomy

## Purpose

Group related content into a clear workspace region.

## Architectural Role

`floor`

## Required Slots

- `section_header`
- `section_body`

## Optional Slots

- `optional_footer`

## Allowed Variants

- `default`
- `compact`
- `focus`
- `executive`

## Required States

- `default`

## Accessibility Requirements

- Section headings should remain semantic.
- Reading order must remain logical.
- Regions should stay understandable as layouts adapt.

## Token Dependencies

- `--space-5`
- `--space-6`
- `--space-7`
- `--text-h2`
- `--text-body`

## Composition Rules

- Use sections to establish major workspace hierarchy.
- Group only related content.
- Use focus and executive variants to reduce competing noise.

## Anti-Patterns

- Decorative grouping without structural meaning.
- Mixing unrelated content under one section heading.
- Excessive nested sections that obscure the floor plan.

## Implementation Notes For Future v0.5

- Treat PFSection as a layout primitive rather than a highly styled surface.
- Preserve strong heading spacing and clear vertical rhythm.
