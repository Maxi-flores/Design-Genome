import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

const approvedCategories = new Set([
  "surface",
  "layout",
  "navigation",
  "action",
  "status",
  "data",
  "form",
  "feedback",
  "overlay",
  "timeline"
]);

const approvedRoles = new Set([
  "room",
  "wall",
  "floor",
  "corridor",
  "control-surface",
  "instrument",
  "ledger",
  "road",
  "lobby",
  "temporary-chamber",
  "side-room",
  "internal-zone",
  "intake-desk",
  "unoccupied-room",
  "signal",
  "circulation"
]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function validateAgainstSchema(contract, schema) {
  const errors = [];

  if (schema.type === "object" && (typeof contract !== "object" || contract === null || Array.isArray(contract))) {
    errors.push("Contract must be an object.");
    return errors;
  }

  for (const field of schema.required ?? []) {
    if (!(field in contract)) {
      errors.push(`Missing required field "${field}".`);
    }
  }

  for (const [key, rules] of Object.entries(schema.properties ?? {})) {
    if (!(key in contract)) {
      continue;
    }

    const value = contract[key];

    if (rules.type === "string") {
      if (typeof value !== "string") {
        errors.push(`Field "${key}" must be a string.`);
        continue;
      }

      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`Field "${key}" must be at least ${rules.minLength} characters long.`);
      }

      if (rules.pattern && !(new RegExp(rules.pattern).test(value))) {
        errors.push(`Field "${key}" does not match the required pattern.`);
      }

      if (Array.isArray(rules.enum) && !rules.enum.includes(value)) {
        errors.push(`Field "${key}" must be one of: ${rules.enum.join(", ")}.`);
      }
    }

    if (rules.type === "array") {
      if (!Array.isArray(value)) {
        errors.push(`Field "${key}" must be an array.`);
      }
    }

    if (rules.type === "object") {
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        errors.push(`Field "${key}" must be an object.`);
        continue;
      }

      for (const requiredField of rules.required ?? []) {
        if (!(requiredField in value)) {
          errors.push(`Field "${key}" is missing required property "${requiredField}".`);
        }
      }
    }
  }

  return errors;
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
    const schemaPath = path.join(rootDir, "schemas", "component-contract.schema.json");
    const registryPath = path.join(rootDir, "components", "registry", "component-registry.json");
    const contractsDir = path.join(rootDir, "components", "contracts");
    const anatomyDir = path.join(rootDir, "components", "anatomy");
    const foundationPath = path.join(rootDir, "dist", "sentient-foundation.tokens.json");
    const statusTokensPath = path.join(rootDir, "tokens", "status.tokens.json");

    const schema = readJson(schemaPath);
    const registry = readJson(registryPath);
    const foundationTokens = readJson(foundationPath);
    const statusTokens = readJson(statusTokensPath);
    const foundationVars = new Set(Object.keys(foundationTokens.cssVariables ?? {}));
    const allowedStatuses = new Set((statusTokens.statuses ?? []).map((status) => status.id));

    const contractFileNames = fs.readdirSync(contractsDir).filter((fileName) => fileName.endsWith(".json"));
    const contractPaths = contractFileNames.map((fileName) => path.join(contractsDir, fileName));
    const contracts = contractPaths.map((filePath) => readJson(filePath));
    const registryEntries = registry.components ?? [];

    report(contractFileNames.length > 0, "contract-files", `Loaded ${contractFileNames.length} contract file(s).`);
    report(registryEntries.length > 0, "registry-entries", `Loaded ${registryEntries.length} registry entry(ies).`);

    const registryIds = registryEntries.map((entry) => entry.id);
    const contractIds = contracts.map((contract) => contract.id);
    const duplicateRegistryIds = registryIds.filter((id, index) => registryIds.indexOf(id) !== index);
    const duplicateContractIds = contractIds.filter((id, index) => contractIds.indexOf(id) !== index);

    report(duplicateRegistryIds.length === 0, "duplicate-registry-ids", duplicateRegistryIds.length === 0 ? "No duplicate registry IDs." : duplicateRegistryIds.join(", "));
    report(duplicateContractIds.length === 0, "duplicate-contract-ids", duplicateContractIds.length === 0 ? "No duplicate contract IDs." : duplicateContractIds.join(", "));

    for (const contract of contracts) {
      const schemaErrors = validateAgainstSchema(contract, schema);
      report(schemaErrors.length === 0, `schema:${contract.name}`, schemaErrors.length === 0 ? "Contract matches schema requirements." : schemaErrors.join("; "));

      report(approvedCategories.has(contract.category), `category:${contract.name}`, approvedCategories.has(contract.category) ? contract.category : `Unapproved category "${contract.category}".`);
      report(approvedRoles.has(contract.architectural_role), `role:${contract.name}`, approvedRoles.has(contract.architectural_role) ? contract.architectural_role : `Unapproved architectural role "${contract.architectural_role}".`);

      const missingVars = (contract.token_dependencies ?? []).filter((cssVar) => !foundationVars.has(cssVar));
      report(
        missingVars.length === 0,
        `token-dependencies:${contract.name}`,
        missingVars.length === 0 ? "All token dependencies exist in dist/sentient-foundation.tokens.json." : `Missing token dependencies: ${missingVars.join(", ")}`
      );

      if (contract.name === "PFStatusBadge") {
        const statusMappings = contract.governance?.status_mappings ?? [];
        const missingStatuses = statusMappings.filter((statusId) => !allowedStatuses.has(statusId));
        report(
          missingStatuses.length === 0,
          "status-mappings:PFStatusBadge",
          missingStatuses.length === 0 ? "PFStatusBadge status mappings align with Foundation status tokens." : `Unknown status mappings: ${missingStatuses.join(", ")}`
        );
      }
    }

    for (const entry of registryEntries) {
      const contractPath = path.resolve(path.join(path.dirname(registryPath), entry.contract_file));
      const anatomyPath = path.resolve(path.join(path.dirname(registryPath), entry.anatomy_file));
      report(fs.existsSync(contractPath), `registry-contract:${entry.name}`, fs.existsSync(contractPath) ? path.relative(rootDir, contractPath) : `Missing contract file ${entry.contract_file}`);
      report(fs.existsSync(anatomyPath), `registry-anatomy:${entry.name}`, fs.existsSync(anatomyPath) ? path.relative(rootDir, anatomyPath) : `Missing anatomy file ${entry.anatomy_file}`);
    }

    const missingContractsForRegistry = registryIds.filter((id) => !contractIds.includes(id));
    const missingRegistryForContracts = contractIds.filter((id) => !registryIds.includes(id));
    report(
      missingContractsForRegistry.length === 0,
      "registry-to-contract-coverage",
      missingContractsForRegistry.length === 0 ? "Every registry entry has a matching contract." : `Missing contracts for: ${missingContractsForRegistry.join(", ")}`
    );
    report(
      missingRegistryForContracts.length === 0,
      "contract-to-registry-coverage",
      missingRegistryForContracts.length === 0 ? "Every contract is listed in the registry." : `Missing registry entries for: ${missingRegistryForContracts.join(", ")}`
    );

    const anatomyFiles = fs.readdirSync(anatomyDir).filter((fileName) => fileName.endsWith(".md"));
    report(anatomyFiles.length >= registryEntries.length, "anatomy-files", `Loaded ${anatomyFiles.length} anatomy file(s).`);
  } catch (error) {
    console.error("FAIL component-validation: Unable to load component governance files.");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  if (failures.length > 0) {
    console.error(`Component contract validation failed with ${failures.length} issue(s).`);
    process.exit(1);
  }

  console.log("Component contract validation passed.");
  process.exit(0);
}

main();
