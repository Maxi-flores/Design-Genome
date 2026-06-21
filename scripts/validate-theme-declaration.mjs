import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

function readJson(relativePath) {
  const filePath = path.join(rootDir, relativePath);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getSchemaErrors(document, schema) {
  const errors = [];
  const allowedKeys = new Set(Object.keys(schema.properties ?? {}));

  if (schema.type === "object" && (typeof document !== "object" || document === null || Array.isArray(document))) {
    errors.push("Document must be an object.");
    return errors;
  }

  for (const key of schema.required ?? []) {
    if (!(key in document)) {
      errors.push(`Missing required property "${key}".`);
    }
  }

  if (schema.additionalProperties === false) {
    for (const key of Object.keys(document)) {
      if (!allowedKeys.has(key)) {
        errors.push(`Unexpected property "${key}".`);
      }
    }
  }

  for (const [key, rules] of Object.entries(schema.properties ?? {})) {
    if (!(key in document)) {
      continue;
    }

    const value = document[key];

    if (rules.type === "string") {
      if (typeof value !== "string") {
        errors.push(`Property "${key}" must be a string.`);
        continue;
      }

      if (typeof rules.minLength === "number" && value.length < rules.minLength) {
        errors.push(`Property "${key}" must be at least ${rules.minLength} characters long.`);
      }
    }

    if (Array.isArray(rules.enum) && !rules.enum.includes(value)) {
      errors.push(`Property "${key}" must be one of: ${rules.enum.join(", ")}.`);
    }
  }

  return errors;
}

function buildIndex(items, keys = ["name"]) {
  const index = new Map();

  for (const item of items) {
    for (const key of keys) {
      if (item[key]) {
        index.set(item[key], item);
      }
    }
  }

  return index;
}

function getRegistryErrors(theme, indexes) {
  const errors = [];
  const project = indexes.projects.get(theme.project);
  const personality = indexes.personalities.get(theme.design_personality);
  const family = indexes.families.get(theme.architectural_family);
  const accent = indexes.accents.get(theme.chapter_accent);

  if (!project) {
    errors.push(`Project "${theme.project}" is not registered.`);
  }

  if (!personality) {
    errors.push(`Personality "${theme.design_personality}" is not registered.`);
  }

  if (!family) {
    errors.push(`Architectural family "${theme.architectural_family}" is not registered.`);
  }

  if (!accent) {
    errors.push(`Chapter accent "${theme.chapter_accent}" is not registered.`);
  }

  if (personality && personality.status === "pending-family-approval") {
    errors.push(`Personality "${theme.design_personality}" is not activatable yet: ${personality.status}.`);
  }

  if (personality && !personality.compatible_architectural_families.includes(theme.architectural_family)) {
    errors.push(
      `Personality "${theme.design_personality}" is not compatible with architectural family "${theme.architectural_family}".`
    );
  }

  if (project && !project.preferred_architectural_families.includes(theme.architectural_family)) {
    errors.push(
      `Project "${theme.project}" does not approve architectural family "${theme.architectural_family}".`
    );
  }

  if (project && !project.preferred_personalities.includes(theme.design_personality)) {
    errors.push(`Project "${theme.project}" does not approve personality "${theme.design_personality}".`);
  }

  if (project && !project.allowed_chapter_accents.includes(theme.chapter_accent)) {
    errors.push(`Project "${theme.project}" does not approve chapter accent "${theme.chapter_accent}".`);
  }

  if (family && !family.recommended_spatial_identities.includes(theme.spatial_identity)) {
    errors.push(
      `Spatial identity "${theme.spatial_identity}" is not approved for architectural family "${theme.architectural_family}".`
    );
  }

  return errors;
}

function main() {
  const schema = readJson("schemas/theme-declaration.schema.json");
  const familyRegistry = readJson("registries/architectural-families.json");
  const personalityRegistry = readJson("registries/personalities.json");
  const projectRegistry = readJson("registries/project-dna.json");
  const accentRegistry = readJson("registries/chapter-accents.json");

  const indexes = {
    families: buildIndex(familyRegistry.families, ["name", "id"]),
    personalities: buildIndex(personalityRegistry.personalities, ["name", "id"]),
    projects: buildIndex(projectRegistry.projects, ["name", "id"]),
    accents: buildIndex(accentRegistry.accents, ["id", "name"])
  };

  const examplesDir = path.join(rootDir, "examples");
  const exampleFiles = fs
    .readdirSync(examplesDir)
    .filter((fileName) => fileName.endsWith(".theme.json"))
    .sort();

  if (exampleFiles.length === 0) {
    console.error("No example theme declarations were found.");
    process.exit(1);
  }

  let hasErrors = false;

  for (const fileName of exampleFiles) {
    const theme = JSON.parse(fs.readFileSync(path.join(examplesDir, fileName), "utf8"));
    const schemaErrors = getSchemaErrors(theme, schema);
    const registryErrors = getRegistryErrors(theme, indexes);
    const allErrors = [...schemaErrors, ...registryErrors];

    if (allErrors.length > 0) {
      hasErrors = true;
      console.error(`FAIL ${fileName}`);
      for (const error of allErrors) {
        console.error(`  - ${error}`);
      }
      continue;
    }

    console.log(`PASS ${fileName}`);
  }

  if (hasErrors) {
    process.exit(1);
  }

  console.log(`Validated ${exampleFiles.length} theme declaration(s).`);
}

main();
