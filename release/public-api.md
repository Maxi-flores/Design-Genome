# Public API

## Stable Rule

Applications consume the Design Genome.

Applications do not mutate the Design Genome.

## CSS Exports

Stable public CSS exports:

- `dist/sentient-foundation.css`
- `dist/sentient-primitives.css`
- `dist/sentient-personalities.css`
- `dist/sentient-architectures.css`
- `dist/sentient-projects.css`

## JSON Exports

Stable public JSON exports:

- `dist/sentient-foundation.tokens.json`

## Registries

Stable public registries:

- `registries/architectural-families.json`
- `registries/personalities.json`
- `registries/project-dna.json`
- `registries/chapter-accents.json`
- `components/registry/component-registry.json`

## Schemas

Stable public schemas:

- `schemas/theme-declaration.schema.json`
- `schemas/component-contract.schema.json`

## Component Contracts

Approved component contracts under `components/contracts/` are part of the governed public surface.

Applications may consume these contracts and the component registry as source-of-truth references.

Applications may not fork or silently replace them.

## React/Vite Starter

`packages/react-vite-starter/` is the stable neutral reference integration package.

It demonstrates:

- import order
- provider data attributes
- primitive-aligned wrappers
- governance-safe consumption

It is not a product application.

## Theme Declaration Attributes

Stable data attributes:

- `data-project`
- `data-design-personality`
- `data-architectural-family`
- `data-chapter-accent`
- `data-theme-mode`
- `data-density-mode`
- `data-motion-mode`
- `data-spatial-identity`
- `data-application-mode`

Stable mode values:

- `theme_mode`: `day | night | auto`
- `density_mode`: `compact | standard | focus | executive`
- `motion_mode`: `minimal | standard | dynamic`

## Validation Scripts

Stable validation entrypoints:

- `npm run validate`
- `npm run validate:themes`
- `npm run validate:tokens`
- `npm run validate:components`
- `npm run validate:primitives`
- `npm run validate:react-starter`
- `npm run validate:personalities`
- `npm run validate:architectures`
- `npm run validate:projects`
- `npm run validate:release`

## Build Scripts

Stable build entrypoints:

- `npm run build`
- `npm run build:foundation`
- `npm run build:primitives`
- `npm run build:personalities`
- `npm run build:architectures`
- `npm run build:projects`

## Internal Details Not Promoted To Public API

The public API does not promise stability for every internal file layout detail, preview implementation detail, or validator implementation approach.

Only the documented exports, schemas, registries, contracts, data attributes, and entrypoint scripts above are stable at v1.0.
