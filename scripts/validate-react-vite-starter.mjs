import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
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
    const starterDir = path.join(rootDir, "packages", "react-vite-starter");
    const packagePath = path.join(starterDir, "package.json");
    const registryPath = path.join(rootDir, "components", "registry", "component-registry.json");
    const mainPath = path.join(starterDir, "src", "main.jsx");
    const appPath = path.join(starterDir, "src", "App.jsx");
    const providerPath = path.join(starterDir, "src", "SentientProvider.jsx");

    report(fs.existsSync(starterDir), "starter-dir", "packages/react-vite-starter exists.");
    report(fs.existsSync(packagePath), "starter-package", "Starter package.json exists.");

    const registry = readJson(registryPath);
    const starterPackage = readJson(packagePath);
    const mainSource = fs.readFileSync(mainPath, "utf8");
    const appSource = fs.readFileSync(appPath, "utf8");
    const providerSource = fs.readFileSync(providerPath, "utf8");

    const expectedWrapperMap = {
      PFCard: "pf-card",
      PFPanel: "pf-panel",
      PFSection: "pf-section",
      PFMetricCard: "pf-metric-card",
      PFButton: "pf-button",
      PFStatusBadge: "pf-status-badge",
      PFCommandBar: "pf-command-bar",
      PFDataTable: "pf-data-table",
      PFWorkspaceGrid: "pf-workspace-grid",
      PFEmptyState: "pf-empty-state",
      PFTimeline: "pf-timeline",
      PFNavigation: "pf-navigation",
      PFModal: "pf-modal",
      PFDrawer: "pf-drawer",
      PFTabs: "pf-tabs",
      PFInput: "pf-input",
      PFSelect: "pf-select"
    };

    for (const entry of registry.components) {
      const wrapperName = entry.name;
      const wrapperPath = path.join(starterDir, "src", "components", `${wrapperName}.jsx`);
      report(fs.existsSync(wrapperPath), `wrapper-file:${wrapperName}`, `${wrapperName}.jsx exists.`);

      if (fs.existsSync(wrapperPath)) {
        const wrapperSource = fs.readFileSync(wrapperPath, "utf8");
        const expectedClass = expectedWrapperMap[wrapperName];
        report(
          wrapperSource.includes(expectedClass),
          `wrapper-class:${wrapperName}`,
          wrapperSource.includes(expectedClass) ? `${wrapperName} references ${expectedClass}.` : `${wrapperName} does not reference ${expectedClass}.`
        );
      }
    }

    const requiredProviderAttributes = [
      "data-project",
      "data-design-personality",
      "data-theme-mode",
      "data-density-mode",
      "data-motion-mode",
      "data-chapter-accent",
      "data-architectural-family",
      "data-spatial-identity",
      "data-application-mode"
    ];

    for (const attribute of requiredProviderAttributes) {
      report(
        providerSource.includes(attribute),
        `provider-attr:${attribute}`,
        providerSource.includes(attribute) ? `${attribute} is applied.` : `${attribute} is missing from SentientProvider.`
      );
    }

    report(
      mainSource.includes("../../../dist/sentient-foundation.css"),
      "foundation-import",
      mainSource.includes("../../../dist/sentient-foundation.css")
        ? "main.jsx imports dist/sentient-foundation.css."
        : "main.jsx is missing the Foundation CSS import."
    );
    report(
      mainSource.includes("../../../dist/sentient-primitives.css"),
      "primitives-import",
      mainSource.includes("../../../dist/sentient-primitives.css")
        ? "main.jsx imports dist/sentient-primitives.css."
        : "main.jsx is missing the Primitive CSS import."
    );
    report(
      mainSource.includes("../../../dist/sentient-personalities.css"),
      "personalities-import",
      mainSource.includes("../../../dist/sentient-personalities.css")
        ? "main.jsx imports dist/sentient-personalities.css."
        : "main.jsx is missing the Personality CSS import."
    );
    report(
      mainSource.includes("../../../dist/sentient-architectures.css"),
      "architectures-import",
      mainSource.includes("../../../dist/sentient-architectures.css")
        ? "main.jsx imports dist/sentient-architectures.css."
        : "main.jsx is missing the Architectural Family CSS import."
    );
    report(
      mainSource.includes("../../../dist/sentient-projects.css"),
      "projects-import",
      mainSource.includes("../../../dist/sentient-projects.css")
        ? "main.jsx imports dist/sentient-projects.css."
        : "main.jsx is missing the Project DNA CSS import."
    );

    const tailwindFiles = ["tailwind.config.js", "tailwind.config.cjs", "tailwind.config.ts", "postcss.config.js"];
    const foundTailwindFiles = tailwindFiles.filter((fileName) => fs.existsSync(path.join(starterDir, fileName)));
    report(foundTailwindFiles.length === 0, "tailwind-boundary", foundTailwindFiles.length === 0 ? "No Tailwind config found." : `Unexpected Tailwind files: ${foundTailwindFiles.join(", ")}`);

    const disallowedDeps = ["tailwindcss", "@mui/material", "antd", "chakra-ui", "@radix-ui/react-dialog", "framer-motion"];
    const allDeps = {
      ...(starterPackage.dependencies ?? {}),
      ...(starterPackage.devDependencies ?? {})
    };
    const foundDisallowedDeps = disallowedDeps.filter((dep) => dep in allDeps);
    report(
      foundDisallowedDeps.length === 0,
      "dependency-boundary",
      foundDisallowedDeps.length === 0 ? "No disallowed UI or styling libraries found." : `Unexpected dependencies: ${foundDisallowedDeps.join(", ")}`
    );

    const projectSpecificTerms = [
      "Powerframe",
      "TheRocketTree",
      "Mucho3D",
      "Flink3D",
      "ConceptSHOP",
      "CustomSHOP"
    ];
    const foundProjectTerms = projectSpecificTerms.filter((term) => appSource.includes(term));
    report(
      foundProjectTerms.length === 0,
      "app-neutrality",
      foundProjectTerms.length === 0 ? "App.jsx avoids project-specific theme content." : `Project-specific content found: ${foundProjectTerms.join(", ")}`
    );
  } catch (error) {
    console.error("FAIL react-starter-validation: Unable to validate the React/Vite starter.");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  if (failures.length > 0) {
    console.error(`React/Vite starter validation failed with ${failures.length} issue(s).`);
    process.exit(1);
  }

  console.log("React/Vite starter validation passed.");
  process.exit(0);
}

main();
