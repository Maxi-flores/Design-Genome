import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function normalizeSlotSuffix(slotName) {
  return slotName.replace(/^optional_/, "").replace(/_/g, "-");
}

function getExpectedClassNames(component) {
  const baseClass = `.${component.id}`;
  return [baseClass];
}

function getExpectedElementClasses(contract) {
  const componentPrefix = `.${contract.id}__`;
  const suffixes = new Set();

  for (const slotName of [...(contract.slots?.required ?? []), ...(contract.slots?.optional ?? [])]) {
    const suffix = normalizeSlotSuffix(slotName);
    suffixes.add(suffix);

    if (suffix === "tab-panels") {
      suffixes.add("panel");
      suffixes.add("panels");
    }

    if (suffix === "nav-items") {
      suffixes.add("list");
      suffixes.add("item");
    }

    if (suffix === "items") {
      suffixes.add("item");
    }

    if (suffix === "table-header") {
      suffixes.add("header");
      suffixes.add("table");
    }

    if (suffix === "primary-actions") {
      suffixes.add("primary");
    }

    if (suffix === "secondary-actions") {
      suffixes.add("secondary");
    }

    if (suffix === "filters") {
      suffixes.add("filters");
    }

    if (suffix === "search") {
      suffixes.add("search");
    }

    if (suffix === "status") {
      suffixes.add("status");
    }

    if (suffix === "optional-empty-state" || suffix === "empty-state") {
      suffixes.add("empty-state");
    }

    if (suffix === "regions") {
      suffixes.add("regions");
    }
  }

  return [...suffixes].map((suffix) => `${componentPrefix}${suffix}`);
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
    const registry = readJson(path.join(rootDir, "components", "registry", "component-registry.json"));
    const foundation = readJson(path.join(rootDir, "dist", "sentient-foundation.tokens.json"));
    const sourceCssPath = path.join(rootDir, "styles", "primitives", "sentient-primitives.css");
    const distCssPath = path.join(rootDir, "dist", "sentient-primitives.css");
    const sourceCss = fs.readFileSync(sourceCssPath, "utf8");
    const knownVars = new Set(Object.keys(foundation.cssVariables ?? {}));
    const contracts = registry.components.map((entry) => {
      const contractPath = path.resolve(path.join(rootDir, "components", "registry", entry.contract_file));
      return readJson(contractPath);
    });

    for (const entry of registry.components) {
      const baseClass = `.${entry.id}`;
      report(sourceCss.includes(baseClass), `class:${entry.name}`, sourceCss.includes(baseClass) ? `${baseClass} exists.` : `Missing primitive class ${baseClass}.`);
    }

    for (const contract of contracts) {
      const missingClasses = getExpectedElementClasses(contract).filter((className) => !sourceCss.includes(className));
      report(
        missingClasses.length === 0,
        `slots:${contract.name}`,
        missingClasses.length === 0 ? "Required and optional slot element classes are present." : `Missing element classes: ${missingClasses.join(", ")}`
      );
    }

    const cssVarMatches = [...sourceCss.matchAll(/var\((--[a-z0-9-]+)/gi)].map((match) => match[1]);
    const unknownVars = [...new Set(cssVarMatches.filter((cssVar) => !knownVars.has(cssVar)))];
    report(
      unknownVars.length === 0,
      "foundation-vars",
      unknownVars.length === 0 ? "Primitive CSS references only known Foundation CSS variables." : `Unknown CSS variables: ${unknownVars.join(", ")}`
    );

    const spacingViolations = [];
    for (const match of sourceCss.matchAll(/(?:^|[\s{;])(?:padding|margin|gap|row-gap|column-gap|inset|top|right|bottom|left)\s*:\s*([^;]+);/gmi)) {
      const value = match[1];
      if (/(\d+px|\d+rem|\d+em)/i.test(value) && !/var\(--space-|var\(--focus-ring-offset\)/i.test(value)) {
        spacingViolations.push(match[0].trim());
      }
    }
    report(
      spacingViolations.length === 0,
      "spacing-values",
      spacingViolations.length === 0 ? "No obvious arbitrary spacing values found." : `Arbitrary spacing detected: ${spacingViolations.join(" | ")}`
    );

    const zIndexViolations = [];
    for (const match of sourceCss.matchAll(/z-index\s*:\s*([^;]+);/gi)) {
      const value = match[1].trim();
      if (!/^var\(--z-[a-z0-9-]+\)$/i.test(value)) {
        zIndexViolations.push(match[0].trim());
      }
    }
    report(
      zIndexViolations.length === 0,
      "z-index-values",
      zIndexViolations.length === 0 ? "No arbitrary z-index values found." : `Arbitrary z-index detected: ${zIndexViolations.join(" | ")}`
    );

    const statusContract = contracts.find((contract) => contract.name === "PFStatusBadge");
    const missingStatuses = (statusContract?.governance?.status_mappings ?? []).filter(
      (statusId) => !sourceCss.includes(`[data-status="${statusId}"]`)
    );
    report(
      missingStatuses.length === 0,
      "status-support",
      missingStatuses.length === 0 ? "Status badge CSS supports all universal statuses." : `Missing status selectors: ${missingStatuses.join(", ")}`
    );

    const focusVars = ["--focus-ring-width", "--focus-ring-offset", "--focus-ring-style", "--focus-ring-color"];
    const missingFocusVars = focusVars.filter((cssVar) => !sourceCss.includes(cssVar));
    report(
      missingFocusVars.length === 0,
      "focus-vars",
      missingFocusVars.length === 0 ? "Focus token variables are referenced." : `Missing focus token references: ${missingFocusVars.join(", ")}`
    );

    report(fs.existsSync(distCssPath), "dist-output", fs.existsSync(distCssPath) ? "dist/sentient-primitives.css exists." : "dist/sentient-primitives.css is missing.");
  } catch (error) {
    console.error("FAIL primitives-validation: Unable to validate primitive CSS.");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  if (failures.length > 0) {
    console.error(`Primitive CSS validation failed with ${failures.length} issue(s).`);
    process.exit(1);
  }

  console.log("Primitive CSS validation passed.");
  process.exit(0);
}

main();
