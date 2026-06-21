# PFTabs Anatomy

## Purpose

Switch between related sections within the same context.

## Architectural Role

`internal-zone`

## Required Slots

- `tab_list`
- `tab_panels`

## Optional Slots

- `optional_counter`
- `optional_actions`

## Allowed Variants

- `default`
- `underline`
- `segmented`
- `compact`

## Required States

- `default`
- `active`
- `focus`
- `disabled`

## Accessibility Requirements

- Keyboard navigation should be supported.
- Active tab must be associated with its panel.
- Disabled tabs must remain understandable.

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

- Tabs must not be used for unrelated pages.
- Active tab must be clear.
- Keyboard navigation should be supported.

## Anti-Patterns

- Using tabs for unrelated routes.
- Vague tab labels.
- Mixing tab styles without structural reason.

## Implementation Notes For Future v0.5

- Keep the primitive focused on tab semantics and active-state clarity.
- Avoid style assumptions tied to any one architectural family.
