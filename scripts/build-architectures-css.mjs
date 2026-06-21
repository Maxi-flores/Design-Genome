import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

const foundationPath = path.join(rootDir, "dist", "sentient-foundation.css");
const primitivesPath = path.join(rootDir, "dist", "sentient-primitives.css");
const personalitiesPath = path.join(rootDir, "dist", "sentient-personalities.css");
const sourcePath = path.join(rootDir, "styles", "architectures", "sentient-architectures.css");
const outputPath = path.join(rootDir, "dist", "sentient-architectures.css");

const header = `/*
Sentient OS Design Genome
v0.8 — Architectural Family Theme Layer
Generated from styles/architectures/sentient-architectures.css
*/

`;

function inlineImports(filePath, seen = new Set()) {
  const resolvedPath = path.resolve(filePath);

  if (seen.has(resolvedPath)) {
    return "";
  }

  seen.add(resolvedPath);

  const source = fs.readFileSync(resolvedPath, "utf8");
  const lines = source.split(/\r?\n/u);
  const inlineChunks = [];
  const localLines = [];

  for (const line of lines) {
    const importMatch = line.match(/^\s*@import\s+"(.+?)";\s*$/u);
    if (importMatch) {
      inlineChunks.push(inlineImports(path.resolve(path.dirname(resolvedPath), importMatch[1]), seen));
      continue;
    }

    localLines.push(line);
  }

  const localSource = localLines.join("\n").trim();
  if (localSource) {
    inlineChunks.push(localSource);
  }

  return inlineChunks.filter(Boolean).join("\n\n");
}

function main() {
  try {
    if (!fs.existsSync(foundationPath)) {
      throw new Error("dist/sentient-foundation.css is required before building architectural themes.");
    }

    if (!fs.existsSync(primitivesPath)) {
      throw new Error("dist/sentient-primitives.css is required before building architectural themes.");
    }

    if (!fs.existsSync(personalitiesPath)) {
      throw new Error("dist/sentient-personalities.css is required before building architectural themes.");
    }

    if (!fs.existsSync(sourcePath)) {
      throw new Error("styles/architectures/sentient-architectures.css was not found.");
    }

    const bundledSource = inlineImports(sourcePath).replace(/^\s*\/\*[\s\S]*?\*\/\s*/u, "");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `${header}${bundledSource.trim()}\n`, "utf8");

    console.log("PASS foundation-dependency: dist/sentient-foundation.css exists.");
    console.log("PASS primitives-dependency: dist/sentient-primitives.css exists.");
    console.log("PASS personalities-dependency: dist/sentient-personalities.css exists.");
    console.log("PASS architecture-source: styles/architectures/sentient-architectures.css loaded.");
    console.log("PASS architecture-build: dist/sentient-architectures.css generated.");
    process.exit(0);
  } catch (error) {
    console.error("FAIL architecture-build: Unable to generate dist/sentient-architectures.css.");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
