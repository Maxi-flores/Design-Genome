# CSS Primitives

## Purpose

CSS primitives are the first reusable, framework-agnostic implementation layer built from approved Sentient OS component contracts.

They provide neutral structure and behavior for approved components without introducing:

- project identity
- architectural family styling
- personality atmosphere
- framework-specific code

## Why Primitives Come After Contracts

The Design Genome sequence is intentional:

1. Foundation tokens
2. Component contracts
3. Neutral CSS primitives
4. Project styling later
5. Personality themes later
6. React implementation later

Contracts define what a component is allowed to become. Primitive CSS is the first reusable implementation expression of that contract.

## How Primitives Consume Foundation Tokens

Primitive classes consume the generated Foundation CSS variables from `dist/sentient-foundation.css`.

They use Foundation tokens for:

- spacing
- typography
- radius
- motion
- elevation
- focus
- z-index

Primitive classes do not redefine the Foundation layer.

## How Primitives Relate To Component Contracts

Each primitive class maps to an approved component contract from `components/contracts/`.

That means primitives are expected to reflect:

- required slots
- allowed variants
- required states where relevant
- token dependencies
- accessibility requirements
- anti-pattern boundaries

## How Primitives Differ From Personality Themes

Primitive classes define neutral structure and behavior.

They do not define project identity or personality atmosphere.

That means no:

- project color systems
- architectural family look and feel
- expressive atmospheric styling
- personality-specific motion or surface treatment

## How Future Projects Should Import Primitive CSS

Import Foundation first, then primitives:

```html
<link rel="stylesheet" href="path/to/dist/sentient-foundation.css">
<link rel="stylesheet" href="path/to/dist/sentient-primitives.css">
```

Projects should then layer project-specific styling and later personality systems on top of those neutral primitives rather than replacing the primitives outright.

## How Codex Should Use Primitives Before Creating UI

Before generating UI, Codex should:

1. Read the component registry.
2. Read the relevant component contract.
3. Read the anatomy document.
4. Use the neutral primitive class as the base implementation target.
5. Only then compose project-specific UI if that work is explicitly requested.

## Why v0.5 Is Still Framework-Agnostic

`v0.5` does not implement React components.

`v0.5` does not implement project UI.

`v0.5` defines neutral CSS primitives based on approved component contracts.

The goal is to make future integrations into React, Vite, or other ecosystems simpler without binding the Design Genome to a specific framework too early.
