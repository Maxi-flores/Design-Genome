# Sentient OS Design Genome

This repository is the governance layer for the Sentient OS ecosystem's web architecture.

It turns the Architectural Web Stylebook into reusable working assets:

- canonical documentation
- enforceable registries
- immutable Foundation tokens
- theme and page declaration templates
- machine-readable schema
- executable validation
- generated distribution artifacts
- design governance checklists
- Codex output guidance

## Core Principle

Sentient OS does not build isolated websites.

Sentient OS builds operating environments.

That means every interface should be treated as constructed architecture with:

- orientation
- hierarchy
- circulation
- atmosphere
- structural consistency

## Repository Structure

- `docs/architectural-web-stylebook.md`: canonical architectural stylebook
- `docs/architectural-family-themes.md`: architectural family theme governance rules
- `docs/project-dna-composition.md`: project DNA composition governance rules
- `release/*.md`: stable release contracts, public API docs, import order contract, and consumer guidance
- `release/*.json`: stable release manifest and governance lock snapshots
- `registries/*.json`: approved architectural families, personalities, project DNA, and chapter accents
- `schemas/theme-declaration.schema.json`: schema for synced theme declarations
- `tokens/*.json`: canonical Foundation token sources
- `examples/*.theme.json`: validated example declarations for real ecosystem applications
- `examples/foundation-preview.html`: token preview document for Foundation-only review
- `examples/architectural-families-preview.html`: neutral architectural family preview
- `examples/project-dna-preview.html`: neutral Project DNA composition preview
- `dist/sentient-foundation.css`: generated Foundation CSS variables
- `dist/sentient-foundation.tokens.json`: generated merged Foundation token export
- `components/registry/component-registry.json`: approved reusable component registry
- `components/contracts/*.contract.json`: machine-readable component contracts
- `components/anatomy/*.md`: human-readable component anatomy documents
- `styles/primitives/sentient-primitives.css`: neutral primitive CSS source
- `styles/personalities/*.css`: governed personality theme source files
- `styles/personalities/sentient-personalities.css`: personality theme composition entrypoint
- `styles/architectures/*.css`: governed architectural family source files
- `styles/architectures/sentient-architectures.css`: architectural family composition entrypoint
- `styles/projects/*.css`: governed Project DNA source files
- `styles/projects/sentient-projects.css`: Project DNA composition entrypoint
- `styles/previews/`: reserved preview-style source area
- `packages/react-vite-starter/`: neutral React/Vite integration proof package
- `scripts/build-foundation-css.mjs`: Foundation export builder
- `scripts/build-primitives-css.mjs`: primitive CSS distribution builder
- `scripts/build-personalities-css.mjs`: personality CSS distribution builder
- `scripts/build-architectures-css.mjs`: architectural CSS distribution builder
- `scripts/build-projects-css.mjs`: Project DNA CSS distribution builder
- `scripts/validate-theme-declaration.mjs`: zero-dependency validator for schema and registry compliance
- `scripts/validate-foundation-tokens.mjs`: zero-dependency validator for Foundation token integrity
- `scripts/validate-component-contracts.mjs`: zero-dependency validator for component governance integrity
- `scripts/validate-primitives-css.mjs`: primitive CSS contract-alignment validator
- `scripts/validate-react-vite-starter.mjs`: React/Vite starter integration validator
- `scripts/validate-personality-themes.mjs`: personality-theme governance validator
- `scripts/validate-architectural-themes.mjs`: architectural-theme governance validator
- `scripts/validate-project-dna-themes.mjs`: Project DNA governance validator
- `scripts/validate-release.mjs`: stable release contract validator
- `package.json`: validation entrypoints
- `templates/theme-declaration.example.json`: implementation-ready theme declaration example
- `templates/page-architecture.template.md`: page-level architecture declaration template
- `governance/changelog.md`: versioned governance changes
- `governance/design-evaluation-checklist.md`: approval checklist for design decisions
- `governance/codex-output-template.md`: required output format for Codex UI work
- `docs/personality-themes.md`: personality-layer governance rules
- `examples/personality-themes-preview.html`: neutral activatable personality preview
- `dist/sentient-personalities.css`: generated personality theme distribution
- `dist/sentient-architectures.css`: generated architectural family distribution
- `dist/sentient-projects.css`: generated Project DNA distribution

## Design Genome v1.0 — Stable Internal Release

`v1.0` is the first stable internal release of the Sentient OS Design Genome.

It does not add new visual layers.

It hardens the package for ecosystem consumption.

v1.0 defines:

- the stable public CSS exports
- the stable public JSON export
- the stable data-attribute contract
- the stable import order
- the consumer integration path
- the release validation contract
- the governance rules that applications must respect

Stable public CSS exports:

- `dist/sentient-foundation.css`
- `dist/sentient-primitives.css`
- `dist/sentient-personalities.css`
- `dist/sentient-architectures.css`
- `dist/sentient-projects.css`

Stable public JSON exports:

- `dist/sentient-foundation.tokens.json`

Stable public import order:

```html
<link rel="stylesheet" href="dist/sentient-foundation.css">
<link rel="stylesheet" href="dist/sentient-primitives.css">
<link rel="stylesheet" href="dist/sentient-personalities.css">
<link rel="stylesheet" href="dist/sentient-architectures.css">
<link rel="stylesheet" href="dist/sentient-projects.css">
```

Required data attributes:

- `data-project`
- `data-design-personality`
- `data-architectural-family`
- `data-chapter-accent`
- `data-theme-mode`
- `data-density-mode`
- `data-motion-mode`
- `data-spatial-identity`
- `data-application-mode`

Build commands:

```bash
npm run build
```

Validation commands:

```bash
npm run validate
npm run validate:release
```

Consumer integration path:

1. Import the stable CSS stack in order.
2. Declare governed theme metadata.
3. Apply stable data attributes to the app root.
4. Use approved primitives or React starter wrappers.
5. Validate before shipping.

Applications may:

- consume public exports
- use approved primitives and wrappers
- add application CSS after the Design Genome layers
- extend app behavior outside the package

Applications may not:

- fork or redefine Foundation variables
- rename primitive classes
- bypass component contracts
- use personality styling as project themes
- use Project DNA as application UI
- create local competing design systems inside governed apps

Applications consume the Design Genome; they do not fork or redefine it.

## Design Genome v0.3

`v0.3` introduces the immutable Foundation token layer and CSS variable export system.

This version adds one shared base that future applications can consume before applying:

- Project DNA
- architectural families
- visual personalities

The Foundation layer now covers:

- spacing
- typography
- radius
- breakpoints
- motion
- elevation
- status semantics
- z-index
- focus
- metadata
- generated CSS distribution
- generated JSON distribution

## Design Genome v0.4 — Component Contracts + Primitive Anatomy

`v0.4` adds the first component governance layer on top of the existing Foundation and registry system.

This phase does not implement components.

This phase defines what components are allowed to become.

The component governance layer now answers:

- which components are approved
- what each component is responsible for
- which slots, variants, and states are allowed
- which Foundation tokens each component consumes
- which accessibility rules apply
- which architectural role each component plays
- which anti-patterns must be avoided

Component governance sources live in:

- `components/registry/component-registry.json`
- `components/contracts/*.contract.json`
- `components/anatomy/*.md`
- `docs/component-contracts.md`

Validate component contracts directly:

```bash
npm run validate:components
```

Run the full governance validation suite:

```bash
npm run validate
```

Future Codex UI tasks should use the component layer in this order:

1. Check the component registry for an approved component.
2. Read the matching contract.
3. Read the matching anatomy document.
4. Confirm Foundation token dependencies.
5. Only then plan implementation work.

`v0.4` does not implement components.

`v0.4` defines what components are allowed to become.

## Design Genome v0.5 — CSS Primitive Component Classes + Neutral Component Preview

`v0.5` adds the first neutral CSS primitive layer for approved Foundation components.

This layer is:

- framework-agnostic
- token-based
- contract-aligned
- accessible by default
- neutral in tone and structure

Primitive CSS source lives in:

- `styles/primitives/sentient-primitives.css`

Generated primitive CSS lives in:

- `dist/sentient-primitives.css`

Preview files live in:

- `examples/primitive-components-preview.html`

Primitive documentation lives in:

- `docs/css-primitives.md`

Build primitive CSS only:

```bash
npm run build:primitives
```

Validate primitive CSS only:

```bash
npm run validate:primitives
```

Build the full CSS distribution layer:

```bash
npm run build
```

Validate the full governance stack:

```bash
npm run validate
```

Future apps should import Foundation first and primitives second:

```html
<link rel="stylesheet" href="path/to/dist/sentient-foundation.css">
<link rel="stylesheet" href="path/to/dist/sentient-primitives.css">
```

Future Codex UI tasks should use primitives in this order:

1. Check the approved component contract.
2. Use the matching primitive class as the neutral starting point.
3. Add project-level styling only when explicitly required by later phases.

`v0.5` does not implement React components.

`v0.5` does not introduce project UI.

`v0.5` does not introduce personality themes.

`v0.5` defines neutral CSS primitives based on approved component contracts.

## Design Genome v0.6 — React/Vite Integration Starter Package

`v0.6` adds a neutral React/Vite integration starter that proves future applications can consume the Design Genome without bypassing governance.

The starter package lives in:

- `packages/react-vite-starter/`

The starter demonstrates:

- importing `dist/sentient-foundation.css`
- importing `dist/sentient-primitives.css`
- exposing theme declaration metadata through `SentientProvider`
- using React wrappers aligned to approved primitive classes and component contracts

Validate the starter integration:

```bash
npm run validate:react-starter
npm run validate
```

Future apps should consume the Design Genome in this order:

1. Foundation CSS and tokens
2. Primitive CSS
3. Theme declaration metadata
4. Contract-aligned React wrappers
5. Project styling later
6. Personality themes later

`v0.6` still avoids project-specific styling and personality themes.

It is a framework integration proof, not a branded application or product UI.

## Design Genome v0.7 — Personality Theme Layer

`v0.7` adds the first governed personality theme layer on top of Foundation, primitives, and the React integration starter.

This version adds:

- per-personality CSS source files under `styles/personalities/`
- a shared personality distribution output at `dist/sentient-personalities.css`
- data-attribute activation through `data-design-personality` and `data-theme-mode`
- a validator that enforces registry coverage, variable contract coverage, approved primitive class usage, and pending-personality boundaries
- a neutral preview that demonstrates activatable personalities without creating project UI

The personality layer may change atmosphere, surfaces, accents, semantic tone, and focus color.

It may not override Foundation namespaces such as:

- `--space-*`
- `--text-*`
- `--radius-*`
- `--bp-*`
- `--duration-*`
- `--z-*`
- `--focus-*`

Build the personality layer directly:

```bash
npm run build:personalities
```

Validate the personality layer directly:

```bash
npm run validate:personalities
```

Future apps should now consume Design Genome CSS in this order:

1. Foundation CSS
2. Primitive CSS
3. Personality CSS
4. Theme declaration metadata
5. React or framework wrappers
6. Project-specific behavior later

## Design Genome v0.8 — Architectural Family Theme Layer

`v0.8` adds the first architecture-aware spatial layer on top of Foundation, primitives, personality themes, and the React starter.

This version adds:

- per-family architectural CSS source files under `styles/architectures/`
- a generated architectural family distribution file at `dist/sentient-architectures.css`
- data-attribute activation through `data-architectural-family`
- architectural validation for registry coverage, variable coverage, density mode coverage, primitive class boundaries, and dist output
- a neutral architectural family preview at `examples/architectural-families-preview.html`

Architectural families answer:

- what kind of digital space is this

Personalities answer:

- what is the mood

Build architectural themes directly:

```bash
npm run build:architectures
```

Validate architectural themes directly:

```bash
npm run validate:architectures
```

Preview architectural families by opening:

- `examples/architectural-families-preview.html`

`v0.8` is not project styling.

It does not create product screens, project dashboards, or chapter accent systems.

Chapter accents remain a separate later layer.

## Design Genome v0.9 — Project DNA Composition Layer

`v0.9` adds the first project-aware composition layer on top of Foundation, primitives, personalities, and architectural families.

This version adds:

- per-project CSS source files under `styles/projects/`
- a generated composition distribution file at `dist/sentient-projects.css`
- data-attribute activation through `data-project`
- chapter accent bridges through `data-project` plus `data-chapter-accent`
- a validator that enforces project coverage, variable coverage, approved composition selectors, approved accent bridges, and boundary protection
- a neutral Project DNA preview at `examples/project-dna-preview.html`

Project DNA answers:

- which ecosystem identity is active
- which personalities are allowed
- which architectural families are allowed
- which chapter accents are valid
- which default composition should load

Build Project DNA composition directly:

```bash
npm run build:projects
```

Validate Project DNA composition directly:

```bash
npm run validate:projects
```

Preview Project DNA composition by opening:

- `examples/project-dna-preview.html`

`v0.9` is not application UI.

It is the final pre-v1 composition layer before stable release hardening and public packaging work.

## Foundation Token Overview

Foundation tokens live in `tokens/` and are the canonical machine-readable source.

They are immutable at the architecture level and are intended to be consumed as a base contract across the ecosystem.

Generated outputs live in `dist/` and are produced from those token files, not maintained by hand.

## How To Build Foundation CSS

Build the generated Foundation outputs:

```bash
npm run build
```

This produces:

- `dist/sentient-foundation.css`
- `dist/sentient-foundation.tokens.json`

## How To Validate Tokens

Validate Foundation tokens only:

```bash
npm run validate:tokens
```

Validate themes and tokens together:

```bash
npm run validate
```

The token validator checks:

- required token groups exist
- required CSS variables exist
- approved spacing values
- approved typography scale values
- approved radius values
- approved breakpoint values
- approved motion durations
- universal status semantics
- duplicate CSS variable collisions

## How To Declare A Theme

Every theme declaration must be a JSON file that includes:

- `project`
- `design_personality`
- `theme_mode`
- `density_mode`
- `motion_mode`
- `chapter_accent`
- `architectural_family`
- `spatial_identity`
- `application_mode`

Minimal example:

```json
{
  "project": "Powerframe Ecosystem",
  "design_personality": "Aurora Command",
  "theme_mode": "night",
  "density_mode": "compact",
  "motion_mode": "standard",
  "chapter_accent": "violet-cyan",
  "architectural_family": "Command Tower",
  "spatial_identity": "Operations Deck",
  "application_mode": "Runtime Management"
}
```

Theme declarations should be treated as governance contracts, not loose preference files.

They must:

- satisfy `schemas/theme-declaration.schema.json`
- use approved values from the registries
- pair personalities only with compatible architectural families
- align each project to its approved Project DNA

## How To Validate A Theme

Validate all example themes:

```bash
npm run validate
```

Or run the theme-focused entrypoint directly:

```bash
npm run validate:themes
```

The validator checks:

- required schema fields
- allowed enum values from the schema
- registry membership for project, personality, chapter accent, and family
- personality-to-family compatibility
- project DNA compatibility for family, personality, and chapter accent
- family-to-spatial-identity compatibility

## How To Activate A Personality Theme

Personality themes are activated through governed data attributes:

```html
<section
  data-design-personality="oracle-intelligence"
  data-theme-mode="night"
>
  ...
</section>
```

`data-design-personality` should use the registry `id` form.

`data-theme-mode` must be one of:

- `day`
- `night`
- `auto`

Personality themes should be layered only after Foundation and primitives:

```html
<link rel="stylesheet" href="path/to/dist/sentient-foundation.css">
<link rel="stylesheet" href="path/to/dist/sentient-primitives.css">
<link rel="stylesheet" href="path/to/dist/sentient-personalities.css">
```

## How To Activate An Architectural Family

Architectural families activate through governed data attributes:

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

Architectural CSS source lives in:

- `styles/architectures/`

Generated architectural CSS lives at:

- `dist/sentient-architectures.css`

Future apps should import all active layers in this order:

```html
<link rel="stylesheet" href="path/to/dist/sentient-foundation.css">
<link rel="stylesheet" href="path/to/dist/sentient-primitives.css">
<link rel="stylesheet" href="path/to/dist/sentient-personalities.css">
<link rel="stylesheet" href="path/to/dist/sentient-architectures.css">
```

## How To Activate Project DNA

Project DNA activates through governed data attributes:

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

Project DNA CSS source lives in:

- `styles/projects/`

Generated Project DNA CSS lives at:

- `dist/sentient-projects.css`

Chapter accents are bridged at the Project DNA layer through approved `data-chapter-accent` ids.

Future apps should import all governed layers in this order:

```html
<link rel="stylesheet" href="path/to/dist/sentient-foundation.css">
<link rel="stylesheet" href="path/to/dist/sentient-primitives.css">
<link rel="stylesheet" href="path/to/dist/sentient-personalities.css">
<link rel="stylesheet" href="path/to/dist/sentient-architectures.css">
<link rel="stylesheet" href="path/to/dist/sentient-projects.css">
```

## How Future Projects Should Consume The Design Genome

Future projects should consume this repository as a source of truth rather than copying values by hand.

Recommended usage:

1. Import the generated Foundation CSS before project-level or personality-level styling.
2. Import the generated Primitive CSS before application-level component styling.
3. Import the generated Personality CSS when a governed atmosphere layer is needed.
4. Import the generated Architectural Family CSS when governed spatial behavior is needed.
5. Import the generated Project DNA CSS when governed composition is needed.
6. Consume generated token JSON when an application needs machine-readable token access.
7. Pick a project identity from `registries/project-dna.json`, or add a new governed entry first.
8. Declare themes using approved values from the registries.
9. Validate declarations, tokens, primitives, starter integration, personality themes, architectural themes, and Project DNA composition in local development and CI before merge.
10. Reuse Foundation contracts first, then Personality, then Architecture, then Project DNA, then application work later.
11. Record any new governed capability in `governance/changelog.md`.

If a project needs a new family, personality, or accent, add it through governance first and only then allow application work to consume it.

Import example:

```html
<link rel="stylesheet" href="path/to/dist/sentient-foundation.css">
<link rel="stylesheet" href="path/to/dist/sentient-primitives.css">
<link rel="stylesheet" href="path/to/dist/sentient-personalities.css">
<link rel="stylesheet" href="path/to/dist/sentient-architectures.css">
<link rel="stylesheet" href="path/to/dist/sentient-projects.css">
```

Applications may consume generated Foundation variables but may not redefine Foundation variables locally.

## Governance Rule For Token Usage

Foundation tokens are the immutable baseline of the ecosystem.

Rules:

- applications may consume generated Foundation variables
- applications may not redefine Foundation variables locally
- architectures may compose with Foundation but may not override it
- personalities may extend Foundation later, but may not erase Foundation structure
- arbitrary spacing, radius, z-index, and motion values should be treated as governance violations
- no application may create a new component pattern until it checks the component registry and contract layer

## Operating Order

All work in this repository follows the stylebook hierarchy:

1. Foundation
2. Component Contracts
3. Primitive CSS
4. React Wrappers
5. Personality
6. Architecture
7. Project DNA
8. Application
9. Feature

## Current Version

- Governance kit version: `1.0`
- Stylebook source version: `0.1`
- Status: `Stable internal release with hardened public exports, import contract, release validation, and consumer documentation`
