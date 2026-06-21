# Architectural Family Themes

## What Architectural Family Themes Are

`v0.8` adds the first architectural family theme layer to the Sentient OS Design Genome.

Architectural family themes define what kind of digital space an interface becomes.

They shape spatial behavior rather than project identity.

## How Architectural Families Differ From Personality Themes

Personalities create atmosphere.

Architectural families create spatial behavior.

Project DNA composes them later.

Personality themes answer:

- what is the mood

Architectural family themes answer:

- what kind of digital space is this

## How Architectural Families Relate To Foundation

Foundation remains the immutable base contract.

Architectural families may reference Foundation spacing, breakpoints, motion, elevation, and focus tokens.

Architectural families may not override:

- `--space-*`
- `--text-*`
- `--radius-*`
- `--bp-*`
- `--duration-*`
- `--z-*`
- `--focus-*`

## How Architectural Families Relate To Primitive CSS

Architectural family themes do not replace primitives.

They map architecture-level variables onto approved primitive classes such as:

- `pf-navigation`
- `pf-command-bar`
- `pf-workspace-grid`
- `pf-card`
- `pf-panel`
- `pf-section`
- `pf-metric-card`
- `pf-data-table`
- `pf-empty-state`
- `pf-timeline`
- `pf-modal`
- `pf-drawer`
- `pf-tabs`
- `pf-input`
- `pf-select`

Primitive class names, component contracts, and accessibility expectations stay unchanged.

## How Architectural Families Are Activated

Architectural family themes activate through:

- `data-architectural-family`
- `data-density-mode`
- `data-theme-mode` when spatial readability needs it

Example:

```html
<section
  data-architectural-family="command-tower"
  data-design-personality="aurora-command"
  data-theme-mode="night"
  data-density-mode="standard"
  data-motion-mode="standard"
>
  ...
</section>
```

## What Architectural Families May Change

Architectural family themes may change:

- spatial behavior
- workspace rhythm
- surface layering
- panel density
- information hierarchy
- command zone emphasis
- navigation feeling
- structural depth
- layout atmosphere
- component grouping behavior

## What Architectural Families May Not Change

Architectural family themes may not change:

- Foundation spacing scale
- Foundation typography hierarchy
- Foundation radius scale
- Foundation breakpoints
- Primitive class names
- Component contracts
- accessibility requirements
- status semantics
- the personality variable contract
- project identity
- chapter accent styling

## Why Architectural Families Are Not Project Themes

Architectural families define reusable spatial patterns that multiple projects can share.

They are ecosystem-neutral.

They are not brand systems, project dashboards, or product screens.

## Why Chapter Accents Are Still Separate

Chapter accents are still a later layer.

They express guided chromatic emphasis and ecosystem storytelling, not spatial structure.

`v0.8` intentionally stops at architecture-aware spatial behavior.

## How Future Apps Should Import Architectural CSS

Future apps should import Design Genome CSS in this order:

```html
<link rel="stylesheet" href="path/to/dist/sentient-foundation.css">
<link rel="stylesheet" href="path/to/dist/sentient-primitives.css">
<link rel="stylesheet" href="path/to/dist/sentient-personalities.css">
<link rel="stylesheet" href="path/to/dist/sentient-architectures.css">
```

## How Codex Should Use Architectural Families Before UI Generation

Before generating UI, Codex should:

1. Load the approved theme declaration.
2. Resolve the architectural family from governed data.
3. Apply Foundation first.
4. Apply primitives second.
5. Apply personality atmosphere third.
6. Apply architectural family spatial behavior fourth.
7. Keep project styling and application screens for later phases.

Architectural family themes should guide structure before any project-specific visual system appears.
