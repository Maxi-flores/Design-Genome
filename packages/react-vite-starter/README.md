# React/Vite Starter

## What This Is

This package is a neutral React/Vite integration proof for the Sentient OS Design Genome.

It demonstrates how a React application can consume:

- generated Foundation CSS
- generated Primitive CSS
- generated Personality CSS
- generated Architectural Family CSS
- generated Project DNA CSS
- approved component contracts
- a governed theme declaration shape

## What This Is Not

This package is not:

- a production application
- a branded project
- a personality theme
- a project dashboard
- a replacement for the Design Genome CSS primitives

## How It Consumes Design Genome CSS

The starter imports the generated root distribution files directly from the repository:

- `../../../dist/sentient-foundation.css`
- `../../../dist/sentient-primitives.css`
- `../../../dist/sentient-personalities.css`
- `../../../dist/sentient-architectures.css`
- `../../../dist/sentient-projects.css`

It does not duplicate tokens or primitive classes locally.

`SentientProvider` also normalizes project, personality, architectural family, and chapter accent values into kebab-case data-attribute values so governed CSS selectors activate automatically from human-readable declarations.

## How React Wrappers Relate To Primitive CSS

Each wrapper adds semantic structure and lightweight accessibility behavior around the existing primitive CSS classes.

React wrappers may structure primitives but may not invent visual language.

## How React Wrappers Relate To Component Contracts

Each wrapper maps to an approved component contract and should only expose:

- approved slots
- approved variants
- approved states
- contract-aligned accessibility behavior

## How To Run The Starter

```bash
npm install
npm run dev
npm run build
```

## Why No Project Styling Exists Here

This package stays neutral on purpose.

Project styling, architectural family styling, and personality themes belong to later Design Genome phases.

## How Future Apps Should Use This Package

Future apps can copy or consume this package as a starter integration reference:

1. Keep Foundation, Primitive, Personality, Architectural Family, and Project DNA CSS imports intact.
2. Reuse the wrapper structure.
3. Activate project, personality, architectural family, and chapter accent composition through governed theme declaration data.
4. Layer project-specific behavior later without replacing the governance layers underneath.

## v1.0 Note

This starter now reflects the stable v1.0 import stack.

It is a neutral integration reference, not a product app.

Future apps may copy its provider and wrapper pattern, but must keep project-specific implementation outside the Design Genome package.
