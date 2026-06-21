# Governance Changelog

## v1.0 — Stable Internal Release

Promoted the Sentient OS Design Genome to its first stable internal release.

Added release manifest, public API documentation, import order contract, consumer integration guide, versioning policy, governance lockfile, release checklist, and release validation tooling.

Added a stable examples index linking all neutral preview documents.

Locked the stable public import order: Foundation, Primitives, Personalities, Architectures, Projects.

Defined the stable consumer contract for CSS exports, JSON exports, registries, schemas, component contracts, data attributes, build scripts, and validation scripts.

This version hardens the Design Genome for consumption by future Sentient OS ecosystem projects without adding new visual layers or application screens.

## v0.9 — Project DNA Composition Layer

Added data-attribute-driven Project DNA CSS for approved Sentient OS ecosystem projects.

Added generated Project DNA CSS distribution output.

Added Project DNA validation tooling to check project coverage, required project variables, data-project scoping, Foundation/personality/architecture boundary protection, primitive class usage, approved composition selectors, approved chapter accent bridges, and dist output.

Added a Project DNA preview that demonstrates composition differences without application screens, product dashboards, or chapter-specific UI.

Updated the React/Vite starter to consume the generated Project DNA layer through existing SentientProvider data attributes.

This version upgrades the Design Genome from architecture-aware spatial theming to project-aware composition.

## v0.8 — Architectural Family Theme Layer

Added data-attribute-driven architectural family CSS for approved Sentient OS architectural families.

Added generated architectural CSS distribution output.

Added architectural validation tooling to check family coverage, required architecture variables, data attribute scoping, Foundation token boundaries, personality variable boundaries, primitive class usage, density mode coverage, and dist output.

Added an architectural family preview that demonstrates spatial behavior differences without project-specific UI or chapter accent styling.

Updated the React/Vite starter to consume the generated architectural family layer through existing SentientProvider data attributes.

This version upgrades the Design Genome from personality-aware theming to architecture-aware spatial theming.

## v0.7 — Personality Theme Layer

Added governed per-personality CSS source files that activate through `data-design-personality` and `data-theme-mode`.

Added generated personality CSS distribution output and build tooling that composes the registry-backed source layer into `dist/sentient-personalities.css`.

Added personality validation tooling to verify contract variables, mode coverage, Foundation namespace protection, primitive-class boundaries, preview boundaries, and dist output.

Added neutral preview and documentation files that demonstrate activatable personalities without introducing project-specific UI.

Updated the React/Vite starter to consume Foundation, primitives, and personality CSS together and normalize personality names into CSS-ready data attributes.

This version upgrades the Design Genome from framework integration proof to governed personality activation.

## v0.6 — React/Vite Integration Starter Package

Added a neutral React/Vite starter package that consumes the generated Foundation CSS and Primitive CSS distribution files.

Added React wrapper components for approved Foundation primitives without introducing project-specific styling, personality themes, Tailwind, or external UI libraries.

Added SentientProvider to expose theme declaration metadata through data attributes for future project DNA, architectural family, and personality consumption.

Added integration validation tooling to verify wrapper coverage, primitive class usage, CSS imports, provider data attributes, and dependency boundaries.

This version upgrades the Design Genome from neutral CSS primitives to a framework integration proof.

## v0.5 — CSS Primitive Component Classes + Neutral Component Preview

Added framework-agnostic CSS primitive classes for approved Foundation components.

Added generated primitive CSS distribution output.

Added primitive validation tooling to check class coverage, slot element classes, Foundation token references, status support, focus token usage, and dist output.

Added a neutral primitive component preview that demonstrates component anatomy without project-specific UI or personality styling.

This version upgrades the Design Genome from component governance to neutral component primitives.

## v0.4 — Component Contracts + Primitive Component Anatomy

Added machine-readable contracts for approved Foundation components.

Added human-readable anatomy documents for component structure, slots, variants, states, accessibility, token dependencies, and anti-patterns.

Added a component registry to define the approved reusable component set.

Added component validation tooling to check contracts against schema, registry entries, anatomy files, Foundation token dependencies, approved categories, approved architectural roles, and status token mappings.

This version upgrades the Design Genome from token distribution to component governance.

## v0.3 — Foundation Tokens + CSS Variable Export Layer

Added machine-readable Foundation token files for spacing, typography, radius, breakpoints, motion, elevation, status semantics, z-index, and focus.

Added validation tooling for Foundation token integrity.

Added generated CSS and JSON export outputs for future application consumption.

Added a Foundation preview file for reviewing base token behavior without introducing project-specific UI.

This version upgrades the Design Genome from registry validation to reusable Foundation token distribution.

## 0.2.0 - 2026-06-21

- Added enforceable registries for architectural families, personalities, project DNA, and chapter accents.
- Added validated example theme declarations for Powerframe GMS, Powerframe TPR, Powerframe Finance, TheRocketTree, Mucho3D, and Sentient OS.
- Added a zero-dependency validator that checks theme declarations against the schema and cross-registry governance rules.
- Added `package.json` validation scripts for local and CI usage.
- Extended the theme declaration schema and template to require `project` for Project DNA resolution.
- Recorded `Ember Gaming` as a governed but non-activatable personality until `Performance Floor` becomes an approved architectural family.
