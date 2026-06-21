import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

const foundationPath = path.join(rootDir, "dist", "sentient-foundation.css");
const primitivesPath = path.join(rootDir, "dist", "sentient-primitives.css");
const sourcePath = path.join(rootDir, "styles", "personalities", "sentient-personalities.css");
const outputPath = path.join(rootDir, "dist", "sentient-personalities.css");

const header = `/*
Sentient OS Design Genome
v0.7 — Personality Theme Layer
Generated from styles/personalities/sentient-personalities.css
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
      const importedPath = path.resolve(path.dirname(resolvedPath), importMatch[1]);
      inlineChunks.push(inlineImports(importedPath, seen));
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
      throw new Error("dist/sentient-foundation.css is required before building personality themes.");
    }

    if (!fs.existsSync(primitivesPath)) {
      throw new Error("dist/sentient-primitives.css is required before building personality themes.");
    }

    if (!fs.existsSync(sourcePath)) {
      throw new Error("styles/personalities/sentient-personalities.css was not found.");
    }

    const bundledSource = inlineImports(sourcePath).replace(/^\s*\/\*[\s\S]*?\*\/\s*/u, "");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `${header}${bundledSource.trim()}\n`, "utf8");

    console.log("PASS foundation-dependency: dist/sentient-foundation.css exists.");
    console.log("PASS primitives-dependency: dist/sentient-primitives.css exists.");
    console.log("PASS personality-source: styles/personalities/sentient-personalities.css loaded.");
    console.log("PASS personality-build: dist/sentient-personalities.css generated.");
    process.exit(0);
  } catch (error) {
    console.error("FAIL personality-build: Unable to generate dist/sentient-personalities.css.");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
