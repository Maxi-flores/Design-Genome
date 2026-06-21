# PFNavigation Anatomy

## Purpose

Provide stable movement through the product environment.

## Architectural Role

`circulation`

## Required Slots

- `nav_items`

## Optional Slots

- `optional_section_labels`
- `optional_status_indicators`
- `optional_footer_actions`

## Allowed Variants

- `rail`
- `sidebar`
- `topbar`
- `compact`

## Required States

- `default`
- `active`
- `collapsed`
- `expanded`

## Accessibility Requirements

- Users must understand where they are.
- Active location must be programmatically clear.
- Keyboard traversal must remain predictable.

## Token Dependencies

- `--space-2`
- `--space-3`
- `--space-4`
- `--text-small`
- `--text-body`
- `--focus-ring-width`
- `--focus-ring-offset`
- `--focus-ring-color`
- `--z-navigation`

## Composition Rules

- Navigation location must remain predictable.
- Users must understand where they are.
- Do not mix unrelated navigation models in one view.

## Anti-Patterns

- Mixing primary and unrelated secondary navigation.
- Hiding active location cues.
- Using navigation for unrelated actions.

## Implementation Notes For Future v0.5

- Build navigation primitives with orientation first, styling second.
- Keep layout-agnostic enough to support rail, sidebar, and topbar patterns.
