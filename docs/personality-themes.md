# Personality Themes

## What This Layer Does

`v0.7` adds the first governed personality theme layer to the Sentient OS Design Genome.

This layer sits above Foundation and primitives and below project-specific application UI.

It does not create new components.

It changes atmosphere through a controlled personality variable contract and data-attribute activation.

## Activation Model

Personality themes activate through:

- `data-design-personality`
- `data-theme-mode`

Example:

```html
<section
  data-design-personality="oracle-intelligence"
  data-theme-mode="night"
>
  ...
</section>
```

Approved modes are:

- `day`
- `night`
- `auto`

`auto` follows the user's `prefers-color-scheme` setting.

## Personality Variable Contract

Every personality source file must define the same variables:

- `--personality-bg`
- `--personality-surface`
- `--personality-surface-raised`
- `--personality-surface-muted`
- `--personality-border`
- `--personality-border-strong`
- `--personality-text`
- `--personality-text-muted`
- `--personality-text-subtle`
- `--personality-accent`
- `--personality-accent-strong`
- `--personality-accent-soft`
- `--personality-danger`
- `--personality-warning`
- `--personality-success`
- `--personality-info`
- `--personality-shadow`
- `--personality-glow`
- `--personality-focus`

## Governance Rules

Personality themes may:

- change atmosphere
- adjust surfaces
- adjust text tone
- adjust accents
- adjust semantic colors
- adjust shadow and glow treatment

Personality themes may not:

- override Foundation spacing tokens
- override Foundation typography scale tokens
- override Foundation radius tokens
- override Foundation breakpoint tokens
- override Foundation duration tokens
- override Foundation z-index tokens
- override Foundation focus token namespaces
- introduce new component class families

Personality styling must map onto existing approved primitive classes only.

## Source And Dist Files

Source files live in:

- `styles/personalities/*.css`

The aggregated source entrypoint is:

- `styles/personalities/sentient-personalities.css`

Generated distribution output lives at:

- `dist/sentient-personalities.css`

## Build And Validation

Build the personality layer only:

```bash
npm run build:personalities
```

Validate the personality layer only:

```bash
npm run validate:personalities
```

Run the full build and governance suite:

```bash
npm run build
npm run validate
```

## React Consumption

The React/Vite starter imports:

- `dist/sentient-foundation.css`
- `dist/sentient-primitives.css`
- `dist/sentient-personalities.css`

`SentientProvider` converts theme declaration personality names into kebab-case data-attribute values so registry-friendly declarations can activate governed CSS selectors automatically.

## Pending Personalities

`Ember Gaming` remains governed but not activatable because its declared `Performance Floor` family is not yet approved in the architectural family registry.

The source CSS may exist.

Examples and previews may not activate it until the family registry approves that architectural family.
