# Project DNA Composition

## What Project DNA Composition Is

`v0.9` adds the Project DNA composition layer to the Sentient OS Design Genome.

Project DNA binds governed identity, approved personality choices, approved architectural family choices, and approved chapter accent bridges into one project-aware composition layer.

## How Project DNA Differs From Personality Themes

Personality themes define mood.

Project DNA decides which moods are valid for a project and how that project subtly binds identity to them.

## How Project DNA Differs From Architectural Families

Architectural families define spatial behavior.

Project DNA decides which spatial patterns are valid for a project and how those patterns compose with identity.

## How Project DNA Relates To Foundation And Primitive CSS

Project DNA sits above Foundation, primitives, personalities, and architectures.

It may reference those layers.

It may not replace them.

Project DNA may not override:

- Foundation variable namespaces
- personality variable namespaces
- architecture variable namespaces
- primitive class names
- component contracts

## How Project DNA Is Activated

Project DNA activates through:

- `data-project`
- `data-design-personality`
- `data-architectural-family`
- `data-chapter-accent`

Example:

```html
<section
  data-project="powerframe-ecosystem"
  data-design-personality="aurora-command"
  data-architectural-family="command-tower"
  data-chapter-accent="violet-cyan"
  data-theme-mode="night"
  data-density-mode="compact"
  data-motion-mode="standard"
>
  ...
</section>
```

## How Chapter Accents Are Bridged

Chapter accents are still not a full theme layer in `v0.9`.

Project DNA may bridge approved accent ids into project-level accent variables through `data-project` plus `data-chapter-accent`.

This creates composition-level accent binding without creating chapter-specific screens.

## What Project DNA May Change

Project DNA may change:

- project-level accent bridge
- project-level composition variables
- allowed personality and architecture pairings
- default surface tuning
- project identity metadata
- chapter accent binding
- ecosystem-level rhythm hints
- project-level focus emphasis

## What Project DNA May Not Change

Project DNA may not change:

- Foundation spacing scale
- Foundation typography hierarchy
- Foundation radius scale
- Foundation breakpoints
- primitive class names
- component contracts
- accessibility requirements
- status semantics
- personality variable contract
- architectural variable contract
- application-specific layouts
- feature-specific UI

## Why Project DNA Is Not Application UI

Project DNA composes governance layers.

It does not create application screens, product dashboards, routes, or feature layouts.

It is still pre-application governance.

## How Future Apps Should Import Project DNA CSS

Future apps should import the governed layers in this order:

```html
<link rel="stylesheet" href="path/to/dist/sentient-foundation.css">
<link rel="stylesheet" href="path/to/dist/sentient-primitives.css">
<link rel="stylesheet" href="path/to/dist/sentient-personalities.css">
<link rel="stylesheet" href="path/to/dist/sentient-architectures.css">
<link rel="stylesheet" href="path/to/dist/sentient-projects.css">
```

## How Codex Should Use Project DNA Before UI Generation

Before generating UI, Codex should:

1. Load the approved project identity.
2. Check allowed personalities and architectural families.
3. Resolve the approved chapter accent bridge.
4. Apply Foundation first.
5. Apply primitives second.
6. Apply personality third.
7. Apply architecture fourth.
8. Apply Project DNA composition fifth.
9. Keep application UI for later work.

Project DNA composes Foundation, Personality, Architecture, and chapter accents.

Project DNA does not create application screens.
