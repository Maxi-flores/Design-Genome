import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const tokensDir = path.join(rootDir, "tokens");

const expectedTokenFiles = {
  foundation: "foundation.tokens.json",
  spacing: "spacing.tokens.json",
  typography: "typography.tokens.json",
  radius: "radius.tokens.json",
  breakpoints: "breakpoints.tokens.json",
  motion: "motion.tokens.json",
  elevation: "elevation.tokens.json",
  status: "status.tokens.json",
  zIndex: "z-index.tokens.json",
  focus: "focus.tokens.json"
};

const expectedFoundationGroups = [
  "spacing",
  "typography",
  "radius",
  "breakpoints",
  "motion",
  "elevation",
  "status",
  "zIndex",
  "focus"
];

const expectedSpacing = {
  "--space-1": "4px",
  "--space-2": "8px",
  "--space-3": "12px",
  "--space-4": "16px",
  "--space-5": "24px",
  "--space-6": "32px",
  "--space-7": "48px",
  "--space-8": "64px",
  "--space-9": "80px"
};

const expectedTypography = {
  "--text-hero": "40px",
  "--text-h1": "32px",
  "--text-h2": "24px",
  "--text-h3": "20px",
  "--text-body-lg": "18px",
  "--text-body": "16px",
  "--text-small": "14px",
  "--text-caption": "12px"
};

const expectedRadius = {
  "--radius-xs": "4px",
  "--radius-sm": "8px",
  "--radius-md": "12px",
  "--radius-lg": "16px",
  "--radius-xl": "20px",
  "--radius-2xl": "24px",
  "--radius-full": "999px"
};

const expectedBreakpoints = {
  "--bp-xs": "480px",
  "--bp-sm": "640px",
  "--bp-md": "768px",
  "--bp-lg": "1024px",
  "--bp-xl": "1280px",
  "--bp-2xl": "1440px"
};

const expectedMotionDurations = {
  "--duration-fast": "120ms",
  "--duration-normal": "220ms",
  "--duration-slow": "360ms"
};

const expectedStatusIds = [
  "active",
  "running",
  "completed",
  "paused",
  "blocked",
  "warning",
  "error",
  "draft",
  "archived"
];

const expectedRequiredCssVars = [
  "--space-1",
  "--space-9",
  "--font-primary",
  "--text-body",
  "--radius-md",
  "--bp-lg",
  "--duration-normal",
  "--elevation-2",
  "--z-modal",
  "--focus-ring-color"
];

function readJson(fileName) {
  return JSON.parse(fs.readFileSync(path.join(tokensDir, fileName), "utf8"));
}

function collectCssTokens(value, bucket = []) {
  if (Array.isArray(value)) {
    for (const item of value) {
      collectCssTokens(item, bucket);
    }
    return bucket;
  }

  if (value && typeof value === "object") {
    if (typeof value.cssVar === "string" && typeof value.value === "string") {
      bucket.push(value);
    }

    for (const nestedValue of Object.values(value)) {
      collectCssTokens(nestedValue, bucket);
    }
  }

  return bucket;
}

function createVarMap(tokens) {
  return new Map(tokens.map((token) => [token.cssVar, token.value]));
}

function record(checkName, passed, detail, failures) {
  const prefix = passed ? "PASS" : "FAIL";
  console.log(`${prefix} ${checkName}: ${detail}`);
  if (!passed) {
    failures.push(`${checkName}: ${detail}`);
  }
}

function expectMapValues(checkName, expectedMap, actualMap, failures) {
  const mismatches = [];

  for (const [cssVar, expectedValue] of Object.entries(expectedMap)) {
    const actualValue = actualMap.get(cssVar);
    if (actualValue !== expectedValue) {
      mismatches.push(`${cssVar} expected ${expectedValue} but found ${actualValue ?? "missing"}`);
    }
  }

  record(checkName, mismatches.length === 0, mismatches.length === 0 ? "Approved scale verified." : mismatches.join("; "), failures);
}

function main() {
  const failures = [];

  try {
    const fileNames = fs.readdirSync(tokensDir).filter((fileName) => fileName.endsWith(".json"));
    const parsed = Object.fromEntries(Object.entries(expectedTokenFiles).map(([key, fileName]) => [key, readJson(fileName)]));

    record(
      "token-files",
      Object.values(expectedTokenFiles).every((fileName) => fileNames.includes(fileName)),
      "All required token files are present.",
      failures
    );

    const foundationGroups = parsed.foundation.groups ?? [];
    const missingGroups = expectedFoundationGroups.filter((groupName) => !foundationGroups.includes(groupName));
    record(
      "foundation-groups",
      missingGroups.length === 0,
      missingGroups.length === 0 ? "All required token groups are declared." : `Missing groups: ${missingGroups.join(", ")}`,
      failures
    );

    const allCssTokens = Object.values(parsed).flatMap((groupData) => collectCssTokens(groupData));
    const cssVarMap = createVarMap(allCssTokens);
    const duplicates = allCssTokens.reduce((accumulator, token) => {
      accumulator[token.cssVar] = (accumulator[token.cssVar] ?? 0) + 1;
      return accumulator;
    }, {});

    const duplicateVars = Object.entries(duplicates)
      .filter(([, count]) => count > 1)
      .map(([cssVar]) => cssVar);

    record(
      "required-css-vars",
      expectedRequiredCssVars.every((cssVar) => cssVarMap.has(cssVar)),
      expectedRequiredCssVars.every((cssVar) => cssVarMap.has(cssVar))
        ? "All required CSS variables are present."
        : `Missing required CSS vars: ${expectedRequiredCssVars.filter((cssVar) => !cssVarMap.has(cssVar)).join(", ")}`,
      failures
    );

    expectMapValues("spacing-scale", expectedSpacing, createVarMap(parsed.spacing.tokens), failures);
    expectMapValues("typography-scale", expectedTypography, createVarMap(parsed.typography.scale), failures);
    expectMapValues("radius-scale", expectedRadius, createVarMap(parsed.radius.tokens), failures);
    expectMapValues("breakpoint-scale", expectedBreakpoints, createVarMap(parsed.breakpoints.tokens), failures);
    expectMapValues("motion-durations", expectedMotionDurations, createVarMap(parsed.motion.durations), failures);

    const actualStatuses = new Set((parsed.status.statuses ?? []).map((status) => status.id));
    const missingStatuses = expectedStatusIds.filter((statusId) => !actualStatuses.has(statusId));
    record(
      "universal-statuses",
      missingStatuses.length === 0,
      missingStatuses.length === 0 ? "All universal statuses are present." : `Missing statuses: ${missingStatuses.join(", ")}`,
      failures
    );

    record(
      "duplicate-css-vars",
      duplicateVars.length === 0,
      duplicateVars.length === 0 ? "No duplicate CSS variables found." : `Duplicate cssVar values: ${duplicateVars.join(", ")}`,
      failures
    );
  } catch (error) {
    console.error("FAIL token-validation: Unable to load or inspect Foundation token files.");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  if (failures.length > 0) {
    console.error(`Foundation token validation failed with ${failures.length} issue(s).`);
    process.exit(1);
  }

  console.log("Foundation token validation passed.");
  process.exit(0);
}

main();
