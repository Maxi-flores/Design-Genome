# Consumer Integration Guide

## Step 1: Import CSS In Correct Order

```html
<link rel="stylesheet" href="path/to/dist/sentient-foundation.css">
<link rel="stylesheet" href="path/to/dist/sentient-primitives.css">
<link rel="stylesheet" href="path/to/dist/sentient-personalities.css">
<link rel="stylesheet" href="path/to/dist/sentient-architectures.css">
<link rel="stylesheet" href="path/to/dist/sentient-projects.css">
```

## Step 2: Declare Theme Metadata

Create a governed theme declaration that uses approved project, personality, architectural family, and chapter accent values.

## Step 3: Apply Data Attributes To App Root

Example:

```html
<div
  data-project="powerframe-ecosystem"
  data-design-personality="aurora-command"
  data-architectural-family="command-tower"
  data-chapter-accent="violet-cyan"
  data-theme-mode="night"
  data-density-mode="compact"
  data-motion-mode="standard"
  data-spatial-identity="operations-deck"
  data-application-mode="runtime-management"
>
  ...
</div>
```

## Step 4: Use Approved Primitive Classes Or React Wrappers

Consume approved primitive classes directly, or use the wrappers in `packages/react-vite-starter/` as structural helpers.

## Step 5: Validate Theme Declarations

Run:

```bash
npm run validate:themes
npm run validate
```

## Step 6: Do Not Override Foundation Or Contracts

Applications must not:

- override Foundation variables
- rename primitive classes
- bypass component contracts
- treat personality styling as project-specific theming
- treat Project DNA as application UI

## React Starter Guidance

Use `packages/react-vite-starter` as a neutral reference implementation.

Do not copy preview content into product screens.

Use wrappers only as structural helpers.

## Codex Guidance

Before generating UI, Codex must read the theme declaration, Project DNA registry, component registry, and component contracts.
