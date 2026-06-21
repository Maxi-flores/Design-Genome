import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const tokensDir = path.join(rootDir, "tokens");
const distDir = path.join(rootDir, "dist");

const tokenFileMap = {
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

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
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

function createCssSection(groupName, tokens) {
  const lines = [`  /* ${groupName} */`];

  for (const token of tokens) {
    lines.push(`  ${token.cssVar}: ${token.value};`);
  }

  return lines.join("\n");
}

function buildCss(groupEntries) {
  const sections = groupEntries.map(([groupName, groupData]) =>
    createCssSection(groupName, collectCssTokens(groupData))
  );

  return [
    ":root {",
    sections.join("\n\n"),
    "}",
    "",
    "@media (prefers-reduced-motion: reduce) {",
    "  :root {",
    "    --duration-fast: 0ms;",
    "    --duration-normal: 0ms;",
    "    --duration-slow: 0ms;",
    "  }",
    "}",
    ""
  ].join("\n");
}

function main() {
  try {
    const foundation = readJson(path.join(tokensDir, "foundation.tokens.json"));
    const groupEntries = foundation.groups.map((groupName) => {
      const fileName = tokenFileMap[groupName];

      if (!fileName) {
        throw new Error(`No token file mapping exists for group "${groupName}".`);
      }

      const groupData = readJson(path.join(tokensDir, fileName));
      return [groupName, groupData];
    });

    const merged = {
      foundation,
      groups: Object.fromEntries(groupEntries)
    };

    merged.cssVariables = Object.fromEntries(
      groupEntries.flatMap(([, groupData]) =>
        collectCssTokens(groupData).map((token) => [token.cssVar, token.value])
      )
    );

    const cssOutput = buildCss(groupEntries);

    ensureDir(distDir);
    fs.writeFileSync(
      path.join(distDir, "sentient-foundation.tokens.json"),
      `${JSON.stringify(merged, null, 2)}\n`,
      "utf8"
    );
    fs.writeFileSync(path.join(distDir, "sentient-foundation.css"), cssOutput, "utf8");

    console.log("Built dist/sentient-foundation.tokens.json");
    console.log("Built dist/sentient-foundation.css");
    process.exit(0);
  } catch (error) {
    console.error("Failed to build Foundation CSS.");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
