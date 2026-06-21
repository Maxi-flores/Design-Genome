import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
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
    const manifest = readJson("release/release-manifest.json");
    const lockfile = readJson("release/governance-lockfile.json");
    const packageJson = readJson("package.json");
    const readme = fs.readFileSync(path.join(rootDir, "README.md"), "utf8");
    const changelog = fs.readFileSync(path.join(rootDir, "governance", "changelog.md"), "utf8");
    const examplesIndex = fs.readFileSync(path.join(rootDir, "examples", "index.html"), "utf8");
    const starterMain = fs.readFileSync(path.join(rootDir, "packages", "react-vite-starter", "src", "main.jsx"), "utf8");

    for (const relativePath of manifest.public_css_exports ?? []) {
      report(fs.existsSync(path.join(rootDir, relativePath)), `public-css:${relativePath}`, `${relativePath} exists.`);
    }

    for (const relativePath of manifest.public_json_exports ?? []) {
      report(fs.existsSync(path.join(rootDir, relativePath)), `public-json:${relativePath}`, `${relativePath} exists.`);
    }

    for (const relativePath of manifest.public_registries ?? []) {
      report(fs.existsSync(path.join(rootDir, relativePath)), `public-registry:${relativePath}`, `${relativePath} exists.`);
    }

    for (const relativePath of manifest.public_schemas ?? []) {
      report(fs.existsSync(path.join(rootDir, relativePath)), `public-schema:${relativePath}`, `${relativePath} exists.`);
    }

    for (const relativePath of manifest.public_docs ?? []) {
      report(fs.existsSync(path.join(rootDir, relativePath)), `public-doc:${relativePath}`, `${relativePath} exists.`);
    }

    const expectedImportOrder = [
      "sentient-foundation.css",
      "sentient-primitives.css",
      "sentient-personalities.css",
      "sentient-architectures.css",
      "sentient-projects.css"
    ];
    report(
      JSON.stringify(manifest.required_import_order) === JSON.stringify(expectedImportOrder),
      "import-order",
      JSON.stringify(manifest.required_import_order) === JSON.stringify(expectedImportOrder)
        ? "Required import order matches the stable v1.0 sequence."
        : `Unexpected import order: ${(manifest.required_import_order ?? []).join(", ")}`
    );

    report(packageJson.version === "1.0.0", "package-version", packageJson.version === "1.0.0" ? "package.json version is 1.0.0." : `package.json version is ${packageJson.version}.`);
    report(manifest.version === "1.0.0", "manifest-version", manifest.version === "1.0.0" ? "release manifest version is 1.0.0." : `release manifest version is ${manifest.version}.`);
    report(lockfile.version === "1.0.0", "lockfile-version", lockfile.version === "1.0.0" ? "governance lockfile version is 1.0.0." : `governance lockfile version is ${lockfile.version}.`);

    report(changelog.includes("## v1.0"), "changelog-v1", changelog.includes("## v1.0") ? "governance changelog includes v1.0." : "governance changelog is missing v1.0.");
    report(readme.includes("Design Genome v1.0"), "readme-v1", readme.includes("Design Genome v1.0") ? "README includes v1.0 section." : "README is missing the v1.0 section.");

    const previewFiles = [
      "foundation-preview.html",
      "primitive-components-preview.html",
      "personality-themes-preview.html",
      "architectural-families-preview.html",
      "project-dna-preview.html"
    ];
    for (const previewFile of previewFiles) {
      report(
        examplesIndex.includes(previewFile),
        `examples-index:${previewFile}`,
        examplesIndex.includes(previewFile) ? `examples/index.html links to ${previewFile}.` : `examples/index.html is missing ${previewFile}.`
      );
    }

    const requiredStarterImports = [
      "../../../dist/sentient-foundation.css",
      "../../../dist/sentient-primitives.css",
      "../../../dist/sentient-personalities.css",
      "../../../dist/sentient-architectures.css",
      "../../../dist/sentient-projects.css"
    ];
    for (const importPath of requiredStarterImports) {
      report(
        starterMain.includes(importPath),
        `starter-import:${importPath}`,
        starterMain.includes(importPath) ? `${importPath} is imported by the React starter.` : `${importPath} is missing from the React starter.`
      );
    }
  } catch (error) {
    console.error("FAIL release-validation: Unable to validate the v1.0 release contract.");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  if (failures.length > 0) {
    console.error(`Release validation failed with ${failures.length} issue(s).`);
    process.exit(1);
  }

  console.log("Release validation passed.");
  process.exit(0);
}

main();
