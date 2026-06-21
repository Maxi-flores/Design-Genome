# PFButton Anatomy

## Purpose

Trigger one clear action.

## Architectural Role

`control-surface`

## Required Slots

- `label`

## Optional Slots

- `leading_icon`
- `trailing_icon`
- `loading_label`

## Allowed Variants

- `primary`
- `secondary`
- `ghost`
- `danger`
- `success`

## Required States

- `default`
- `hover`
- `focus`
- `active`
- `disabled`
- `loading`

## Accessibility Requirements

- Icon-only buttons require accessible labels.
- Focus states must be visible.
- Disabled and loading states must remain understandable.

## Token Dependencies

- `--space-2`
- `--space-3`
- `--space-4`
- `--radius-sm`
- `--text-body`
- `--weight-medium`
- `--duration-fast`
- `--ease-standard`
- `--focus-ring-width`
- `--focus-ring-offset`
- `--focus-ring-color`

## Composition Rules

- One primary action per area.
- Use verbs.
- Use secondary or ghost styling for supporting actions.

## Anti-Patterns

- Multiple equal primary actions.
- Non-verbal labels.
- Icon-only usage without accessible naming.

## Implementation Notes For Future v0.5

- Keep button anatomy neutral and token-driven.
- Distinguish states through structure and semantics before color styling.
