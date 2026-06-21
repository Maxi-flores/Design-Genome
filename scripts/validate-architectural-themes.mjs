import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

const architectureVars = [
  "--architecture-bg-treatment",
  "--architecture-workspace-gap",
  "--architecture-section-gap",
  "--architecture-panel-gap",
  "--architecture-content-max-width",
  "--architecture-surface-depth",
  "--architecture-surface-opacity",
  "--architecture-panel-border-strength",
  "--architecture-navigation-width",
  "--architecture-command-height",
  "--architecture-grid-min-column",
  "--architecture-grid-density",
  "--architecture-focus-zone-opacity",
  "--architecture-layer-blur",
  "--architecture-atmosphere-intensity",
  "--architecture-motion-scale"
];

const forbiddenFoundationPrefixes = [
  "--space-",
  "--text-",
  "--radius-",
  "--bp-",
  "--duration-",
  "--z-",
  "--focus-"
];

const densityModes = ["compact", "standard", "focus", "executive"];

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

function main() {
  const failures = [];
  const report = (passed, label, detail) => {
    console.log(`${passed ? "PASS" : "FAIL"} ${label}: ${detail}`);
    if (!passed) {
      failures.push(`${label}: ${detail}`);
    }
  };

  try {
    const familiesPath = path.join(rootDir, "registries", "architectural-families.json");
    const registryPath = path.join(rootDir, "components", "registry", "component-registry.json");
    const foundationPath = path.join(rootDir, "dist", "sentient-foundation.tokens.json");
    const primitivesPath = path.join(rootDir, "dist", "sentient-primitives.css");
    const stylesDir = path.join(rootDir, "styles", "architectures");
    const indexPath = path.join(stylesDir, "sentient-architectures.css");
    const distPath = path.join(rootDir, "dist", "sentient-architectures.css");

    const familyRegistry = readJson(familiesPath);
    const componentRegistry = readJson(registryPath);
    const foundation = readJson(foundationPath);
    const knownFoundationVars = new Set(Object.keys(foundation.cssVariables ?? {}));
    const sourceFiles = fs.readdirSync(stylesDir).filter((fileName) => fileName.endsWith(".css")).sort();
    const sourceByFile = new Map(sourceFiles.map((fileName) => [fileName, fs.readFileSync(path.join(stylesDir, fileName), "utf8")]));
    const primitivesSource = fs.readFileSync(primitivesPath, "utf8");
    const allowedPrimitiveClasses = extractCssClasses(primitivesSource);
    const approvedComponentIds = new Set(componentRegistry.components.map((entry) => entry.id));
    const indexSource = fs.readFileSync(indexPath, "utf8");
    const indexImports = [...indexSource.matchAll(/@import\s+"\.\/(.+?\.css)";/g)].map((match) => match[1]);

    report(fs.existsSync(indexPath), "index-source", "styles/architectures/sentient-architectures.css exists.");

    for (const family of familyRegistry.families) {
      const fileName = `${family.id}.css`;
      const filePath = path.join(stylesDir, fileName);
      const source = sourceByFile.get(fileName) ?? "";

      report(fs.existsSync(filePath), `source:${family.id}`, fs.existsSync(filePath) ? `${fileName} exists.` : `Missing ${fileName}.`);

      if (!fs.existsSync(filePath)) {
        continue;
      }

      report(
        indexImports.includes(fileName),
        `index-import:${family.id}`,
        indexImports.includes(fileName) ? `${fileName} is imported by sentient-architectures.css.` : `${fileName} is not imported by sentient-architectures.css.`
      );

      report(
        source.includes(`data-architectural-family="${family.id}"`),
        `selector:${family.id}`,
        source.includes(`data-architectural-family="${family.id}"`)
          ? `${fileName} uses the required data-architectural-family selector.`
          : `${fileName} does not use the required data-architectural-family selector.`
      );

      const missingVars = architectureVars.filter((cssVar) => !source.includes(`${cssVar}:`));
      report(
        missingVars.length === 0,
        `contract-vars:${family.id}`,
        missingVars.length === 0 ? "All required architecture variables are defined." : `Missing variables: ${missingVars.join(", ")}`
      );

      const definedVars = [...source.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)].map((match) => match[1]);
      const forbiddenFoundationOverrides = definedVars.filter((cssVar) => forbiddenFoundationPrefixes.some((prefix) => cssVar.startsWith(prefix)));
      report(
        forbiddenFoundationOverrides.length === 0,
        `foundation-overrides:${family.id}`,
        forbiddenFoundationOverrides.length === 0 ? "No Foundation variable namespaces are overridden." : `Forbidden overrides: ${[...new Set(forbiddenFoundationOverrides)].join(", ")}`
      );

      const forbiddenPersonalityOverrides = definedVars.filter((cssVar) => cssVar.startsWith("--personality-"));
      report(
        forbiddenPersonalityOverrides.length === 0,
        `personality-overrides:${family.id}`,
        forbiddenPersonalityOverrides.length === 0 ? "No personality variables are overridden." : `Forbidden overrides: ${[...new Set(forbiddenPersonalityOverrides)].join(", ")}`
      );

      const missingModes = densityModes.filter(
        (mode) => !source.includes(`data-architectural-family="${family.id}"][data-density-mode="${mode}"]`)
      );
      report(
        missingModes.length === 0,
        `density-modes:${family.id}`,
        missingModes.length === 0 ? "Compact, standard, focus, and executive selectors are present." : `Missing density selectors: ${missingModes.join(", ")}`
      );
    }

    const allArchitectureSource = [...sourceByFile.values()].join("\n");
    const usedPrimitiveClasses = [...extractCssClasses(allArchitectureSource)].filter((className) => className.startsWith("pf-"));
    const disallowedClasses = usedPrimitiveClasses.filter((className) => !allowedPrimitiveClasses.has(className));
    report(
      disallowedClasses.length === 0,
      "primitive-class-boundary",
      disallowedClasses.length === 0 ? "Architectural CSS styles only approved primitive classes." : `Unknown primitive classes: ${[...new Set(disallowedClasses)].join(", ")}`
    );

    const offRegistryClasses = usedPrimitiveClasses.filter((className) => !approvedComponentIds.has(className));
    report(
      offRegistryClasses.length === 0,
      "component-boundary",
      offRegistryClasses.length === 0 ? "Architectural CSS targets only approved top-level primitive classes." : `Disallowed component classes: ${[...new Set(offRegistryClasses)].join(", ")}`
    );

    const unknownFoundationReferences = [...indexSource.matchAll(/var\((--[a-z0-9-]+)/gi)]
      .map((match) => match[1])
      .filter((cssVar) => !knownFoundationVars.has(cssVar) && !architectureVars.includes(cssVar) && !cssVar.startsWith("--personality-"));
    report(
      unknownFoundationReferences.length === 0,
      "variable-references",
      unknownFoundationReferences.length === 0 ? "Index CSS references only approved Foundation, personality, or architecture variables." : `Unknown CSS variables: ${[...new Set(unknownFoundationReferences)].join(", ")}`
    );

    report(fs.existsSync(distPath), "dist-output", fs.existsSync(distPath) ? "dist/sentient-architectures.css exists." : "dist/sentient-architectures.css is missing.");
  } catch (error) {
    console.error("FAIL architectures-validation: Unable to validate architectural themes.");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  if (failures.length > 0) {
    console.error(`Architectural theme validation failed with ${failures.length} issue(s).`);
    process.exit(1);
  }

  console.log("Architectural theme validation passed.");
  process.exit(0);
}

main();
