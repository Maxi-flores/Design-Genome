import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

const projectVars = [
  "--project-identity",
  "--project-accent-primary",
  "--project-accent-secondary",
  "--project-accent-soft",
  "--project-accent-contrast",
  "--project-surface-tuning",
  "--project-border-tuning",
  "--project-focus-emphasis",
  "--project-navigation-emphasis",
  "--project-command-emphasis",
  "--project-dashboard-emphasis",
  "--project-intelligence-emphasis",
  "--project-motion-tuning",
  "--project-density-preference"
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

function toId(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
    const projectsPath = path.join(rootDir, "registries", "project-dna.json");
    const accentsPath = path.join(rootDir, "registries", "chapter-accents.json");
    const personalitiesPath = path.join(rootDir, "registries", "personalities.json");
    const familiesPath = path.join(rootDir, "registries", "architectural-families.json");
    const registryPath = path.join(rootDir, "components", "registry", "component-registry.json");
    const primitivesPath = path.join(rootDir, "dist", "sentient-primitives.css");
    const stylesDir = path.join(rootDir, "styles", "projects");
    const indexPath = path.join(stylesDir, "sentient-projects.css");
    const distPath = path.join(rootDir, "dist", "sentient-projects.css");

    const projectRegistry = readJson(projectsPath);
    const accentRegistry = readJson(accentsPath);
    const personalityRegistry = readJson(personalitiesPath);
    const familyRegistry = readJson(familiesPath);
    const componentRegistry = readJson(registryPath);
    const approvedAccentIds = new Set(accentRegistry.accents.map((entry) => entry.id));
    const approvedPersonalityIds = new Set(personalityRegistry.personalities.map((entry) => entry.id));
    const approvedFamilyIds = new Set(familyRegistry.families.map((entry) => entry.id));
    const sourceFiles = fs.readdirSync(stylesDir).filter((fileName) => fileName.endsWith(".css")).sort();
    const sourceByFile = new Map(sourceFiles.map((fileName) => [fileName, fs.readFileSync(path.join(stylesDir, fileName), "utf8")]));
    const primitivesSource = fs.readFileSync(primitivesPath, "utf8");
    const allowedPrimitiveClasses = extractCssClasses(primitivesSource);
    const approvedComponentIds = new Set(componentRegistry.components.map((entry) => entry.id));
    const indexSource = fs.readFileSync(indexPath, "utf8");
    const indexImports = [...indexSource.matchAll(/@import\s+"\.\/(.+?\.css)";/g)].map((match) => match[1]);

    report(fs.existsSync(indexPath), "index-source", "styles/projects/sentient-projects.css exists.");

    for (const project of projectRegistry.projects) {
      const fileName = `${project.id}.css`;
      const filePath = path.join(stylesDir, fileName);
      const source = sourceByFile.get(fileName) ?? "";

      report(fs.existsSync(filePath), `source:${project.id}`, fs.existsSync(filePath) ? `${fileName} exists.` : `Missing ${fileName}.`);

      if (!fs.existsSync(filePath)) {
        continue;
      }

      report(
        indexImports.includes(fileName),
        `index-import:${project.id}`,
        indexImports.includes(fileName) ? `${fileName} is imported by sentient-projects.css.` : `${fileName} is not imported by sentient-projects.css.`
      );

      report(
        source.includes(`data-project="${project.id}"`),
        `selector:${project.id}`,
        source.includes(`data-project="${project.id}"`)
          ? `${fileName} uses the required data-project selector.`
          : `${fileName} does not use the required data-project selector.`
      );

      const missingVars = projectVars.filter((cssVar) => !source.includes(`${cssVar}:`));
      report(
        missingVars.length === 0,
        `contract-vars:${project.id}`,
        missingVars.length === 0 ? "All required project variables are defined." : `Missing variables: ${missingVars.join(", ")}`
      );

      const definedVars = [...source.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)].map((match) => match[1]);
      const forbiddenFoundationOverrides = definedVars.filter((cssVar) => forbiddenFoundationPrefixes.some((prefix) => cssVar.startsWith(prefix)));
      report(
        forbiddenFoundationOverrides.length === 0,
        `foundation-overrides:${project.id}`,
        forbiddenFoundationOverrides.length === 0 ? "No Foundation variable namespaces are overridden." : `Forbidden overrides: ${[...new Set(forbiddenFoundationOverrides)].join(", ")}`
      );

      const forbiddenPersonalityOverrides = definedVars.filter((cssVar) => cssVar.startsWith("--personality-"));
      report(
        forbiddenPersonalityOverrides.length === 0,
        `personality-overrides:${project.id}`,
        forbiddenPersonalityOverrides.length === 0 ? "No personality variables are overridden." : `Forbidden overrides: ${[...new Set(forbiddenPersonalityOverrides)].join(", ")}`
      );

      const forbiddenArchitectureOverrides = definedVars.filter((cssVar) => cssVar.startsWith("--architecture-"));
      report(
        forbiddenArchitectureOverrides.length === 0,
        `architecture-overrides:${project.id}`,
        forbiddenArchitectureOverrides.length === 0 ? "No architecture variables are overridden." : `Forbidden overrides: ${[...new Set(forbiddenArchitectureOverrides)].join(", ")}`
      );

      const allowedPairings = [];
      for (const personalityName of project.preferred_personalities ?? []) {
        for (const familyName of project.preferred_architectural_families ?? []) {
          allowedPairings.push({
            personalityId: toId(personalityName),
            familyId: toId(familyName)
          });
        }
      }

      const hasAllowedComposition = allowedPairings.some(
        ({ personalityId, familyId }) =>
          source.includes(`data-design-personality="${personalityId}"`) &&
          source.includes(`data-architectural-family="${familyId}"`)
      );
      report(
        hasAllowedComposition,
        `composition-selector:${project.id}`,
        hasAllowedComposition ? "At least one approved personality + architectural family selector is present." : "No approved personality + architectural family composition selector found."
      );

      const accentMatches = [...source.matchAll(/data-chapter-accent="([^"]+)"/g)].map((match) => match[1]);
      const invalidAccentIds = accentMatches.filter((accentId) => !approvedAccentIds.has(accentId));
      report(
        invalidAccentIds.length === 0,
        `accent-bridge:${project.id}`,
        invalidAccentIds.length === 0 ? "Chapter accent selectors use approved accent IDs only." : `Invalid accent IDs: ${[...new Set(invalidAccentIds)].join(", ")}`
      );
    }

    const allProjectSource = [...sourceByFile.values()].join("\n");
    const usedPrimitiveClasses = [...extractCssClasses(allProjectSource)].filter((className) => className.startsWith("pf-"));
    const disallowedClasses = usedPrimitiveClasses.filter((className) => !allowedPrimitiveClasses.has(className));
    report(
      disallowedClasses.length === 0,
      "primitive-class-boundary",
      disallowedClasses.length === 0 ? "Project DNA CSS styles only approved primitive classes." : `Unknown primitive classes: ${[...new Set(disallowedClasses)].join(", ")}`
    );

    const offRegistryClasses = usedPrimitiveClasses.filter((className) => !approvedComponentIds.has(className));
    report(
      offRegistryClasses.length === 0,
      "component-boundary",
      offRegistryClasses.length === 0 ? "Project DNA CSS targets only approved top-level primitive classes." : `Disallowed component classes: ${[...new Set(offRegistryClasses)].join(", ")}`
    );

    const personalityMatches = [...allProjectSource.matchAll(/data-design-personality="([^"]+)"/g)].map((match) => match[1]);
    const invalidPersonalityIds = personalityMatches.filter((personalityId) => !approvedPersonalityIds.has(personalityId));
    report(
      invalidPersonalityIds.length === 0,
      "personality-selectors",
      invalidPersonalityIds.length === 0 ? "Project selectors reference approved personality IDs only." : `Invalid personality IDs: ${[...new Set(invalidPersonalityIds)].join(", ")}`
    );

    const familyMatches = [...allProjectSource.matchAll(/data-architectural-family="([^"]+)"/g)].map((match) => match[1]);
    const invalidFamilyIds = familyMatches.filter((familyId) => !approvedFamilyIds.has(familyId));
    report(
      invalidFamilyIds.length === 0,
      "family-selectors",
      invalidFamilyIds.length === 0 ? "Project selectors reference approved architectural family IDs only." : `Invalid family IDs: ${[...new Set(invalidFamilyIds)].join(", ")}`
    );

    report(fs.existsSync(distPath), "dist-output", fs.existsSync(distPath) ? "dist/sentient-projects.css exists." : "dist/sentient-projects.css is missing.");
  } catch (error) {
    console.error("FAIL projects-validation: Unable to validate Project DNA themes.");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  if (failures.length > 0) {
    console.error(`Project DNA theme validation failed with ${failures.length} issue(s).`);
    process.exit(1);
  }

  console.log("Project DNA theme validation passed.");
  process.exit(0);
}

main();
