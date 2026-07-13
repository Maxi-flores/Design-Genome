import assert from "node:assert/strict";
import test from "node:test";

import {
  type LayoutCanvasContract,
  LayoutGenomeValidationError,
  validateLayout,
} from "./validateLayout";

const genomeContract = `
<!-- GENOME-GUARDRAILS:START -->
- [ ] Use \`--space-1\`
- [ ] Use \`--space-2\`
- [ ] Use \`--space-3\`
- [ ] Use \`--space-4\`
- [ ] Use \`--space-5\`
- [ ] Use \`--space-6\`
- [ ] Use \`--space-7\`
- [ ] Use \`--space-8\`
- [ ] Use \`--space-9\`
- [ ] No arbitrary spacing values
- [ ] Use \`--bp-md\`
- [ ] Use \`--bp-lg\`
- [ ] Use \`pf-workspace-grid\` as the canvas
- [ ] Include <header>, <nav>, <main> and skip-to-main-content
- [ ] **Command Tower**: operational
<!-- GENOME-GUARDRAILS:END -->
`;

function buildValidLayout(): LayoutCanvasContract {
  return {
    architecturalFamily: "Command Tower",
    spatialIdentity: "Mission Control",
    densityMode: "compact",
    landmarks: {
      hasHeader: true,
      hasNavigation: true,
      hasMain: true,
      hasSkipToMainContent: true,
    },
    sidebarEnabled: true,
    sidebarA11y: {
      hasToggleButton: true,
      hasAriaExpanded: true,
      hasAriaControls: true,
    },
    workspaceDominant: true,
    hasCommandSurface: true,
    canvasComponentId: "pf-workspace-grid",
    breakpointRules: {
      collapseSidebarAt: "--bp-md",
      desktopLayoutAt: "--bp-lg",
      mobileSidebarMode: "overlay",
      desktopSidebarMode: "sticky",
    },
    regions: [{ id: "workspace", critical: true }],
    widgets: [{ id: "w1", componentId: "pf-metric-card", contractCompliant: true }],
    spacingTokensUsed: ["--space-4", "--space-6"],
  };
}

test("valid layout using approved tokens", () => {
  const result = validateLayout(buildValidLayout(), { genomeContractMarkdown: genomeContract });
  assert.equal(result.ok, true);
  assert.equal(result.errors.length, 0);
});

test("arbitrary spacing violation", () => {
  const layout = buildValidLayout();
  layout.arbitrarySpacingValues = ["18px"];

  const result = validateLayout(layout, { genomeContractMarkdown: genomeContract });
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((issue) => issue.ruleId === "layout.spacing.arbitrary.forbidden"));
});

test("forbidden token violation", () => {
  const layout = buildValidLayout();
  layout.forbiddenTokensUsed = ["--token-do-not-use"];

  const result = validateLayout(layout, {
    genomeContractMarkdown: genomeContract,
    rules: { forbiddenTokens: ["--token-do-not-use"] },
  });
  assert.ok(result.errors.some((issue) => issue.ruleId === "layout.token.forbidden"));
});

test("warning-only validation", () => {
  const layout = buildValidLayout();
  layout.widgets = [{ id: "w1", componentId: "third-party-widget", contractCompliant: true }];

  const result = validateLayout(layout, { mode: "warning", genomeContractMarkdown: genomeContract });
  assert.equal(result.errors.length, 0);
  assert.ok(result.warnings.some((issue) => issue.ruleId === "layout.widget.foundation_prefix.recommended"));
});

test("strict validation throws LayoutGenomeValidationError", () => {
  const layout = buildValidLayout();
  layout.spacingTokensUsed = ["--space-10"];

  assert.throws(
    () => validateLayout(layout, { mode: "strict", genomeContractMarkdown: genomeContract }),
    (error: unknown) => {
      assert.ok(error instanceof LayoutGenomeValidationError);
      return true;
    },
  );
});

test("multiple violations report accurate node paths", () => {
  const layout = buildValidLayout();
  layout.spacingTokensUsed = ["--space-4", "--space-10"];
  layout.sidebarA11y = {
    hasToggleButton: false,
    hasAriaExpanded: false,
    hasAriaControls: false,
  };

  const result = validateLayout(layout, { genomeContractMarkdown: genomeContract });
  const paths = new Set(result.issues.map((issue) => issue.path));

  assert.ok(paths.has("layout.spacingTokensUsed[1]"));
  assert.ok(paths.has("layout.sidebarA11y.hasToggleButton"));
  assert.ok(paths.has("layout.sidebarA11y.hasAriaExpanded"));
  assert.ok(paths.has("layout.sidebarA11y.hasAriaControls"));
});

test("missing or malformed genome guardrail configuration", () => {
  const result = validateLayout(buildValidLayout(), { genomeContractMarkdown: "no markers present" });
  assert.ok(result.warnings.some((issue) => issue.ruleId === "genome.config.malformed"));
});

test("responsive-layout rule violation", () => {
  const layout = buildValidLayout();
  layout.breakpointRules.collapseSidebarAt = "--bp-sm";

  const result = validateLayout(layout, { genomeContractMarkdown: genomeContract });
  assert.ok(result.errors.some((issue) => issue.ruleId === "layout.breakpoints.collapse.required"));
});
