import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

const personalityVars = [
  "--personality-bg",
  "--personality-surface",
  "--personality-surface-raised",
  "--personality-surface-muted",
  "--personality-border",
  "--personality-border-strong",
  "--personality-text",
  "--personality-text-muted",
  "--personality-text-subtle",
  "--personality-accent",
  "--personality-accent-strong",
  "--personality-accent-soft",
  "--personality-danger",
  "--personality-warning",
  "--personality-success",
  "--personality-info",
  "--personality-shadow",
  "--personality-glow",
  "--personality-focus"
];

const forbiddenPrefixes = [
  "--space-",
  "--text-",
  "--radius-",
  "--bp-",
  "--duration-",
  "--z-",
  "--focus-"
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function extractCssClasses(source) {
  const classNames = new Set();

  for (const match of source.matchAll(/\.([a-z][a-z0-9-]*(?:__[a-z0-9-]+)?)(?=[^a-z0-9-])/gi)) {
    classNames.add(match[1]);
  }

  return classNames;
}

function extractVarReferences(source) {
  const vars = new Set();

  for (const match of source.matchAll(/var\((--[a-z0-9-]+)/gi)) {
    vars.add(match[1]);
  }

  return vars;
}

function isActivatable(personality) {
  return personality.status !== "pending-family-approval" && Array.isArray(personality.compatible_architectural_families) && personality.compatible_architectural_families.length > 0;
}

function main() {
  const failures = [];
  const report = (passed, label, detail) => {
    console.log(`${passed ? "PASS" : "FAIL"} ${label}: ${detail}`);
    if (!passed) {
      failures.push(`${label}: ${detail}`);
    }
  };

  try {
    const personalitiesPath = path.join(rootDir, "registries", "personalities.json");
    const registryPath = path.join(rootDir, "components", "registry", "component-registry.json");
    const foundationPath = path.join(rootDir, "dist", "sentient-foundation.tokens.json");
    const primitivesPath = path.join(rootDir, "dist", "sentient-primitives.css");
    const stylesDir = path.join(rootDir, "styles", "personalities");
    const indexPath = path.join(stylesDir, "sentient-personalities.css");
    const previewPath = path.join(rootDir, "examples", "personality-themes-preview.html");
    const distPath = path.join(rootDir, "dist", "sentient-personalities.css");

    const personalityRegistry = readJson(personalitiesPath);
    const componentRegistry = readJson(registryPath);
    const foundation = readJson(foundationPath);
    const approvedComponentIds = new Set(componentRegistry.components.map((entry) => entry.id));
    const knownFoundationVars = new Set(Object.keys(foundation.cssVariables ?? {}));
    const allowedVars = new Set([...knownFoundationVars, ...personalityVars]);
    const sourceFiles = fs.readdirSync(stylesDir).filter((fileName) => fileName.endsWith(".css")).sort();
    const sourceByFile = new Map(sourceFiles.map((fileName) => [fileName, fs.readFileSync(path.join(stylesDir, fileName), "utf8")]));
    const primitivesSource = fs.readFileSync(primitivesPath, "utf8");
    const allowedPrimitiveClasses = extractCssClasses(primitivesSource);
    const indexSource = fs.readFileSync(indexPath, "utf8");
    const indexImports = [...indexSource.matchAll(/@import\s+"\.\/(.+?\.css)";/g)].map((match) => match[1]);
    const exampleFiles = fs.readdirSync(path.join(rootDir, "examples")).filter((fileName) => fileName.endsWith(".theme.json"));

    report(fs.existsSync(indexPath), "index-source", "styles/personalities/sentient-personalities.css exists.");
    report(fs.existsSync(previewPath), "preview-example", "examples/personality-themes-preview.html exists.");

    for (const personality of personalityRegistry.personalities) {
      const fileName = `${personality.id}.css`;
      const personalityPath = path.join(stylesDir, fileName);
      const source = sourceByFile.get(fileName) ?? "";

      report(fs.existsSync(personalityPath), `source:${personality.id}`, fs.existsSync(personalityPath) ? `${fileName} exists.` : `Missing ${fileName}.`);

      if (!fs.existsSync(personalityPath)) {
        continue;
      }

      report(
        indexImports.includes(fileName),
        `index-import:${personality.id}`,
        indexImports.includes(fileName) ? `${fileName} is imported by sentient-personalities.css.` : `${fileName} is not imported by sentient-personalities.css.`
      );

      report(
        source.includes(`data-design-personality="${personality.id}"`),
        `selector:${personality.id}`,
        source.includes(`data-design-personality="${personality.id}"`)
          ? `${fileName} uses the required data-design-personality selector.`
          : `${fileName} does not use the required data-design-personality selector.`
      );

      const missingVars = personalityVars.filter((cssVar) => !source.includes(`${cssVar}:`));
      report(
        missingVars.length === 0,
        `contract-vars:${personality.id}`,
        missingVars.length === 0 ? "All required personality variables are defined." : `Missing variables: ${missingVars.join(", ")}`
      );

      const forbiddenOverrides = [...source.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)]
        .map((match) => match[1])
        .filter((cssVar) => forbiddenPrefixes.some((prefix) => cssVar.startsWith(prefix)));
      report(
        forbiddenOverrides.length === 0,
        `foundation-overrides:${personality.id}`,
        forbiddenOverrides.length === 0 ? "No Foundation variable namespaces are overridden." : `Forbidden overrides: ${[...new Set(forbiddenOverrides)].join(", ")}`
      );

      if (isActivatable(personality)) {
        const requiredModes = ["day", "night", "auto"];
        const missingModes = requiredModes.filter(
          (mode) => !source.includes(`data-design-personality="${personality.id}"][data-theme-mode="${mode}"]`)
        );
        report(
          missingModes.length === 0,
          `modes:${personality.id}`,
          missingModes.length === 0 ? "Day, night, and auto selectors are present." : `Missing mode selectors: ${missingModes.join(", ")}`
        );
      }
    }

    const allPersonalitySource = [...sourceByFile.values()].join("\n");
    const usedPrimitiveClasses = [...extractCssClasses(allPersonalitySource)].filter((className) => className.startsWith("pf-"));
    const disallowedClasses = usedPrimitiveClasses.filter((className) => !allowedPrimitiveClasses.has(className));
    report(
      disallowedClasses.length === 0,
      "primitive-class-boundary",
      disallowedClasses.length === 0 ? "Personality CSS styles only approved primitive classes." : `Unknown primitive classes: ${[...new Set(disallowedClasses)].join(", ")}`
    );

    const offRegistryClasses = usedPrimitiveClasses.filter((className) => {
      for (const componentId of approvedComponentIds) {
        if (className === componentId || className.startsWith(`${componentId}__`)) {
          return false;
        }
      }
      return true;
    });
    report(
      offRegistryClasses.length === 0,
      "component-prefix-boundary",
      offRegistryClasses.length === 0 ? "Styled primitive classes align to approved component prefixes." : `Off-registry classes: ${[...new Set(offRegistryClasses)].join(", ")}`
    );

    const unknownVarReferences = [...extractVarReferences(indexSource)].filter((cssVar) => !allowedVars.has(cssVar));
    report(
      unknownVarReferences.length === 0,
      "variable-references",
      unknownVarReferences.length === 0 ? "Index CSS references only approved Foundation or personality variables." : `Unknown CSS variables: ${[...new Set(unknownVarReferences)].join(", ")}`
    );

    const previewSource = fs.readFileSync(previewPath, "utf8");
    report(
      !previewSource.includes('data-design-personality="ember-gaming"'),
      "preview-ember-boundary",
      !previewSource.includes('data-design-personality="ember-gaming"')
        ? "Preview does not activate the pending Ember Gaming personality."
        : "Preview activates the pending Ember Gaming personality."
    );

    const exampleViolations = [];
    for (const fileName of exampleFiles) {
      const themeSource = fs.readFileSync(path.join(rootDir, "examples", fileName), "utf8");
      if (themeSource.includes("Ember Gaming") || themeSource.includes("ember-gaming")) {
        exampleViolations.push(fileName);
      }
    }
    report(
      exampleViolations.length === 0,
      "example-ember-boundary",
      exampleViolations.length === 0 ? "Theme examples do not activate Ember Gaming." : `Pending personality used in: ${exampleViolations.join(", ")}`
    );

    report(fs.existsSync(distPath), "dist-output", fs.existsSync(distPath) ? "dist/sentient-personalities.css exists." : "dist/sentient-personalities.css is missing.");
  } catch (error) {
    console.error("FAIL personalities-validation: Unable to validate personality themes.");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  if (failures.length > 0) {
    console.error(`Personality theme validation failed with ${failures.length} issue(s).`);
    process.exit(1);
  }

  console.log("Personality theme validation passed.");
  process.exit(0);
}

main();
