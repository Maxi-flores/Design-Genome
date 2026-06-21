# Component Contracts

## Purpose

Component contracts are the governance layer that defines what a Sentient OS component is allowed to become before any implementation begins.

They exist so future application teams and Codex agents can answer the following questions consistently:

- Which components are approved?
- What is each component responsible for?
- Which slots, variants, and states are allowed?
- Which Foundation tokens does the component consume?
- Which accessibility rules are mandatory?
- Which architectural role does the component play?
- What should the component never do?

## Why Contracts Exist Before Implementation

The Design Genome works in a strict order:

1. Tokens before components.
2. Contracts before implementation.
3. Governance before UI.

This keeps future component work aligned with the Sentient OS Architectural Web Stylebook instead of letting application teams invent local component patterns ad hoc.

## Relationship To Foundation Tokens

Component contracts do not replace the Foundation token layer.

They depend on it.

Every contract references Foundation token CSS variables for spacing, typography, radius, motion, focus, elevation, status semantics, and layout rhythm. Components are expected to consume those variables rather than redefining base values locally.

## Relationship To The Architectural Web Stylebook

The stylebook defines architectural meaning:

- cards are rooms
- panels are walls
- dashboards and workspace regions are floors
- navigation is circulation
- command bars are control surfaces

The component contract layer translates those meanings into explicit reusable rules so that implementation can stay aligned with architectural intent.

## How Codex Should Use Contracts Before Creating UI

Before generating UI, Codex should:

1. Check `components/registry/component-registry.json` for an approved component.
2. Read the matching contract in `components/contracts/`.
3. Read the matching anatomy document in `components/anatomy/`.
4. Confirm token dependencies against the Foundation layer.
5. Reuse first. Extend second. Create third. Document always.

No application may create a new component pattern until it checks the component registry and contract layer.

## How Future Apps Should Consume Component Rules

Future apps should consume this layer as governance input, not as a loose suggestion.

Recommended workflow:

1. Import Foundation tokens and generated CSS.
2. Choose from approved components in the registry.
3. Implement only the slots, states, variants, and accessibility rules described by the contract.
4. Validate contracts before merging governance changes.
5. Add new component patterns only by extending the governance layer first.

## Why v0.4 Is Governance-Only

`v0.4` does not implement components.

`v0.4` defines what components are allowed to become.

That means:

- no React components yet
- no component CSS classes yet
- no project-specific UI
- no personality themes
- no screen implementation

The goal is to create a readable, enforceable contract layer that makes future component implementation scalable and consistent across the Sentient OS ecosystem.
