import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

const foundationPath = path.join(rootDir, "dist", "sentient-foundation.css");
const sourcePath = path.join(rootDir, "styles", "primitives", "sentient-primitives.css");
const outputPath = path.join(rootDir, "dist", "sentient-primitives.css");

const header = `/*
Sentient OS Design Genome
v0.5 — CSS Primitive Component Classes
Generated from styles/primitives/sentient-primitives.css
*/

`;

function main() {
  try {
    if (!fs.existsSync(foundationPath)) {
      throw new Error("dist/sentient-foundation.css is required before building primitives.");
    }

    if (!fs.existsSync(sourcePath)) {
      throw new Error("styles/primitives/sentient-primitives.css was not found.");
    }

    const source = fs.readFileSync(sourcePath, "utf8").replace(/^\s*\/\*[\s\S]*?\*\/\s*/u, "");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `${header}${source.trim()}\n`, "utf8");

    console.log("PASS foundation-dependency: dist/sentient-foundation.css exists.");
    console.log("PASS primitive-source: styles/primitives/sentient-primitives.css loaded.");
    console.log("PASS primitive-build: dist/sentient-primitives.css generated.");
    process.exit(0);
  } catch (error) {
    console.error("FAIL primitive-build: Unable to generate dist/sentient-primitives.css.");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
