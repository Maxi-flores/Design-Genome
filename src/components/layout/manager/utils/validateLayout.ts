export type DensityMode = "compact" | "standard" | "focus" | "executive";

export type ArchitecturalFamily =
  | "Command Tower"
  | "Glass Atrium"
  | "Blueprint Studio"
  | "Signal Terminal"
  | "Executive Gallery"
  | "Horizon Workspace";

export type BreakpointToken =
  | "--bp-xs"
  | "--bp-sm"
  | "--bp-md"
  | "--bp-lg"
  | "--bp-xl"
  | "--bp-2xl";

export type SpacingToken =
  | "--space-1"
  | "--space-2"
  | "--space-3"
  | "--space-4"
  | "--space-5"
  | "--space-6"
  | "--space-7"
  | "--space-8"
  | "--space-9";

export type SidebarMobileMode = "overlay" | "slide-over";
export type SidebarDesktopMode = "sticky" | "side-by-side";

export type LayoutWarningCode =
  | "workspace-not-dominant"
  | "missing-command-surface"
  | "non-pf-widget-id"
  | "genome-contract-missing"
  | "genome-contract-malformed";

export type LayoutValidationSeverity = "warning" | "error";
export type LayoutValidationMode = "warning" | "error" | "strict";

export interface LayoutLandmarks {
  hasHeader: boolean;
  hasNavigation: boolean;
  hasMain: boolean;
  hasSkipToMainContent: boolean;
  hasFooter?: boolean;
  hasAppShell?: boolean;
}

export interface SidebarA11yState {
  hasToggleButton: boolean;
  hasAriaExpanded: boolean;
  hasAriaControls: boolean;
}

export interface LayoutRegion {
  id: string;
  critical?: boolean;
  hiddenBelow?: BreakpointToken;
}

export interface LayoutWidget {
  id: string;
  componentId: string;
  contractCompliant?: boolean;
}

export interface LayoutBreakpointRules {
  collapseSidebarAt: BreakpointToken;
  desktopLayoutAt: BreakpointToken;
  mobileSidebarMode: SidebarMobileMode;
  desktopSidebarMode: SidebarDesktopMode;
}

export interface LayoutCanvasContract {
  architecturalFamily: ArchitecturalFamily;
  spatialIdentity: string;
  densityMode: DensityMode;
  landmarks: LayoutLandmarks;
  sidebarEnabled: boolean;
  sidebarA11y?: SidebarA11yState;
  workspaceDominant?: boolean;
  hasCommandSurface?: boolean;
  canvasComponentId: string;
  breakpointRules: LayoutBreakpointRules;
  regions: LayoutRegion[];
  widgets: LayoutWidget[];
  spacingTokensUsed: string[];
  arbitrarySpacingValues?: string[];
  sectionPaddingTokens?: string[];
  componentGapTokens?: string[];
  typographyTokensUsed?: string[];
  radiusTokensUsed?: string[];
  surfaceColorTokensUsed?: string[];
  deprecatedTokensUsed?: string[];
  forbiddenTokensUsed?: string[];
  gridColumns?: number;
  maxContentWidthToken?: string;
  layoutNestingDepth?: number;
}

export interface LayoutValidationIssue {
  ruleId: string;
  severity: LayoutValidationSeverity;
  message: string;
  path: string;
  expected?: string;
  received?: string;
  remediation?: string;
}

export interface LayoutValidationWarning {
  code: LayoutWarningCode;
  message: string;
}

export interface LayoutGenomeRules {
  allowedSpacingTokens: string[];
  forbidArbitrarySpacing: boolean;
  allowedTypographyTokens: string[];
  allowedRadiusTokens: string[];
  allowedSurfaceColorTokens: string[];
  allowedBreakpoints: string[];
  requiredSidebarCollapseBreakpoint: string;
  requiredDesktopLayoutBreakpoint: string;
  allowedArchitecturalFamilies: string[];
  requiredCanvasComponentId: string;
  requireAppShell: boolean;
  requireHeader: boolean;
  requireNavigation: boolean;
  requireMain: boolean;
  requireFooter: boolean;
  requireSkipLink: boolean;
  allowedGridColumns: number[];
  maxLayoutNestingDepth: number;
  allowedMaxContentWidthTokens: string[];
  deprecatedTokens: string[];
  forbiddenTokens: string[];
}

export interface ValidateLayoutOptions {
  mode?: LayoutValidationMode;
  warningAsError?: boolean;
  onIssue?: (issue: LayoutValidationIssue) => void;
  onWarning?: (warning: LayoutValidationWarning) => void;
  genomeContractMarkdown?: string;
  rules?: Partial<LayoutGenomeRules>;
}

export interface LayoutValidationResult {
  ok: boolean;
  issues: LayoutValidationIssue[];
  warnings: LayoutValidationIssue[];
  errors: LayoutValidationIssue[];
  rules: LayoutGenomeRules;
}

const DEFAULT_RULES: LayoutGenomeRules = {
  allowedSpacingTokens: [
    "--space-1",
    "--space-2",
    "--space-3",
    "--space-4",
    "--space-5",
    "--space-6",
    "--space-7",
    "--space-8",
    "--space-9",
  ],
  forbidArbitrarySpacing: true,
  allowedTypographyTokens: [
    "--text-h1",
    "--text-h2",
    "--text-h3",
    "--text-body",
    "--text-small",
    "--text-caption",
    "--font-primary",
    "--font-secondary",
    "--font-mono",
    "--weight-regular",
    "--weight-medium",
    "--weight-semibold",
    "--weight-bold",
    "--line-tight",
    "--line-normal",
    "--line-relaxed",
  ],
  allowedRadiusTokens: [
    "--radius-xs",
    "--radius-sm",
    "--radius-md",
    "--radius-lg",
    "--radius-xl",
    "--radius-2xl",
    "--radius-full",
  ],
  allowedSurfaceColorTokens: [],
  allowedBreakpoints: ["--bp-xs", "--bp-sm", "--bp-md", "--bp-lg", "--bp-xl", "--bp-2xl"],
  requiredSidebarCollapseBreakpoint: "--bp-md",
  requiredDesktopLayoutBreakpoint: "--bp-lg",
  allowedArchitecturalFamilies: [
    "Command Tower",
    "Glass Atrium",
    "Blueprint Studio",
    "Signal Terminal",
    "Executive Gallery",
    "Horizon Workspace",
  ],
  requiredCanvasComponentId: "pf-workspace-grid",
  requireAppShell: false,
  requireHeader: true,
  requireNavigation: true,
  requireMain: true,
  requireFooter: false,
  requireSkipLink: true,
  allowedGridColumns: [1, 2, 3, 4, 5, 6, 8, 12],
  maxLayoutNestingDepth: 3,
  allowedMaxContentWidthTokens: [],
  deprecatedTokens: [],
  forbiddenTokens: [],
};

const GENOME_START_MARKER = /<!--\s*GENOME-GUARDRAILS(?::START)?\s*-->/i;
const GENOME_END_MARKER = /<!--\s*GENOME-GUARDRAILS(?::END)?\s*-->/i;

export class LayoutGenomeValidationError extends Error {
  readonly issues: LayoutValidationIssue[];

  constructor(message: string, issues: LayoutValidationIssue[]) {
    super(message);
    this.name = "LayoutGenomeValidationError";
    this.issues = issues;
  }
}

export class LayoutCompilationError extends LayoutGenomeValidationError {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message, [{ ruleId: code, severity: "error", message, path: "layout" }]);
    this.name = "LayoutCompilationError";
    this.code = code;
  }
}

function mergeRules(overrides: Partial<LayoutGenomeRules>): LayoutGenomeRules {
  return {
    ...DEFAULT_RULES,
    ...overrides,
    allowedSpacingTokens: [...(overrides.allowedSpacingTokens ?? DEFAULT_RULES.allowedSpacingTokens)],
    allowedTypographyTokens: [...(overrides.allowedTypographyTokens ?? DEFAULT_RULES.allowedTypographyTokens)],
    allowedRadiusTokens: [...(overrides.allowedRadiusTokens ?? DEFAULT_RULES.allowedRadiusTokens)],
    allowedSurfaceColorTokens: [...(overrides.allowedSurfaceColorTokens ?? DEFAULT_RULES.allowedSurfaceColorTokens)],
    allowedBreakpoints: [...(overrides.allowedBreakpoints ?? DEFAULT_RULES.allowedBreakpoints)],
    allowedArchitecturalFamilies: [...(overrides.allowedArchitecturalFamilies ?? DEFAULT_RULES.allowedArchitecturalFamilies)],
    allowedGridColumns: [...(overrides.allowedGridColumns ?? DEFAULT_RULES.allowedGridColumns)],
    allowedMaxContentWidthTokens: [...(overrides.allowedMaxContentWidthTokens ?? DEFAULT_RULES.allowedMaxContentWidthTokens)],
    deprecatedTokens: [...(overrides.deprecatedTokens ?? DEFAULT_RULES.deprecatedTokens)],
    forbiddenTokens: [...(overrides.forbiddenTokens ?? DEFAULT_RULES.forbiddenTokens)],
  };
}

function extractSectionBetweenGenomeMarkers(markdown: string): string | undefined {
  const startMatch = markdown.match(GENOME_START_MARKER);
  const endMatch = markdown.match(GENOME_END_MARKER);
  if (!startMatch || !endMatch || startMatch.index === undefined || endMatch.index === undefined) {
    return undefined;
  }

  const start = startMatch.index + startMatch[0].length;
  const end = endMatch.index;
  if (start >= end) {
    return undefined;
  }

  return markdown.slice(start, end);
}

function collectTokens(section: string): string[] {
  const tokens = new Set<string>();
  const tokenPattern = /`(--[a-z0-9-]+)`/gi;
  let match = tokenPattern.exec(section);
  while (match) {
    tokens.add(match[1]);
    match = tokenPattern.exec(section);
  }
  return [...tokens];
}

function parseArchitecturalFamilies(section: string): string[] {
  const families = new Set<string>();
  const familyPattern = /\*\*([^*]+)\*\*:/g;
  let match = familyPattern.exec(section);
  while (match) {
    const value = match[1].trim();
    if (value.length > 0) {
      families.add(value);
    }
    match = familyPattern.exec(section);
  }
  return [...families];
}

function normalizeGenomeRules(
  markdown: string | undefined,
): { rules: LayoutGenomeRules; configIssues: LayoutValidationIssue[] } {
  if (!markdown || markdown.trim().length === 0) {
    return {
      rules: DEFAULT_RULES,
      configIssues: [
        {
          ruleId: "genome.config.missing",
          severity: "warning",
          message: "Genome guardrail contract is missing. Using default embedded guardrails.",
          path: "genomeContractMarkdown",
          remediation: "Pass synchronized architecture markdown containing GENOME-GUARDRAILS markers.",
        },
      ],
    };
  }

  const section = extractSectionBetweenGenomeMarkers(markdown);
  if (!section) {
    return {
      rules: DEFAULT_RULES,
      configIssues: [
        {
          ruleId: "genome.config.malformed",
          severity: "warning",
          message: "Genome guardrail markers are missing or malformed. Using default embedded guardrails.",
          path: "genomeContractMarkdown",
          expected: "<!-- GENOME-GUARDRAILS:START --> ... <!-- GENOME-GUARDRAILS:END -->",
          remediation: "Repair marker block in synchronized architecture contract.",
        },
      ],
    };
  }

  const tokens = collectTokens(section);
  const spacingTokens = tokens.filter((token) => token.startsWith("--space-"));
  const typographyTokens = tokens.filter(
    (token) =>
      token.startsWith("--text-") ||
      token.startsWith("--font-") ||
      token.startsWith("--weight-") ||
      token.startsWith("--line-"),
  );
  const radiusTokens = tokens.filter((token) => token.startsWith("--radius-"));
  const breakpointTokens = tokens.filter((token) => token.startsWith("--bp-"));
  const families = parseArchitecturalFamilies(section);

  const overrides: Partial<LayoutGenomeRules> = {};
  if (spacingTokens.length > 0) {
    overrides.allowedSpacingTokens = spacingTokens;
  }
  if (typographyTokens.length > 0) {
    overrides.allowedTypographyTokens = typographyTokens;
  }
  if (radiusTokens.length > 0) {
    overrides.allowedRadiusTokens = radiusTokens;
  }
  if (breakpointTokens.length > 0) {
    overrides.allowedBreakpoints = breakpointTokens;
  }
  if (families.length > 0) {
    overrides.allowedArchitecturalFamilies = families;
  }
  if (section.includes("No arbitrary spacing values")) {
    overrides.forbidArbitrarySpacing = true;
  }
  if (section.includes("pf-workspace-grid")) {
    overrides.requiredCanvasComponentId = "pf-workspace-grid";
  }
  if (section.includes("skip-to-main-content")) {
    overrides.requireSkipLink = true;
  }
  if (section.includes("<header>")) {
    overrides.requireHeader = true;
  }
  if (section.includes("<nav>")) {
    overrides.requireNavigation = true;
  }
  if (section.includes("<main>")) {
    overrides.requireMain = true;
  }

  return { rules: mergeRules(overrides), configIssues: [] };
}

function toWarningCode(ruleId: string): LayoutWarningCode {
  switch (ruleId) {
    case "layout.workspace_dominant.recommended":
      return "workspace-not-dominant";
    case "layout.command_surface.recommended":
      return "missing-command-surface";
    case "layout.widget.foundation_prefix.recommended":
      return "non-pf-widget-id";
    case "genome.config.missing":
      return "genome-contract-missing";
    default:
      return "genome-contract-malformed";
  }
}

function pushIssue(
  issues: LayoutValidationIssue[],
  issue: LayoutValidationIssue,
  options: ValidateLayoutOptions,
): void {
  issues.push(issue);
  options.onIssue?.(issue);
  if (issue.severity === "warning") {
    options.onWarning?.({ code: toWarningCode(issue.ruleId), message: issue.message });
  }
}

function checkAllowedTokenList(
  issues: LayoutValidationIssue[],
  options: ValidateLayoutOptions,
  ruleId: string,
  pathPrefix: string,
  tokens: string[] | undefined,
  allowedTokens: string[],
  tokenKind: string,
): void {
  if (!tokens || tokens.length === 0) {
    return;
  }

  const allowed = new Set(allowedTokens);
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (!allowed.has(token)) {
      pushIssue(
        issues,
        {
          ruleId,
          severity: "error",
          message: `${tokenKind} token '${token}' is not allowed by genome guardrails.`,
          path: `${pathPrefix}[${index}]`,
          expected: allowedTokens.join(", "),
          received: token,
        },
        options,
      );
    }
  }
}

export function validateLayout(
  layout: LayoutCanvasContract,
  options: ValidateLayoutOptions = {},
): LayoutValidationResult {
  const mode = options.mode ?? "warning";
  const normalized = normalizeGenomeRules(options.genomeContractMarkdown);
  const rules = mergeRules({ ...normalized.rules, ...options.rules });
  const issues: LayoutValidationIssue[] = [...normalized.configIssues];

  if (!rules.allowedArchitecturalFamilies.includes(layout.architecturalFamily)) {
    pushIssue(
      issues,
      {
        ruleId: "layout.architectural_family.invalid",
        severity: "error",
        message: `Architectural family '${layout.architecturalFamily}' is not allowed by layout guardrails.`,
        path: "layout.architecturalFamily",
        expected: rules.allowedArchitecturalFamilies.join(", "),
        received: layout.architecturalFamily,
      },
      options,
    );
  }

  if (layout.spatialIdentity.trim().length === 0) {
    pushIssue(
      issues,
      {
        ruleId: "layout.spatial_identity.required",
        severity: "error",
        message: "Spatial identity is required before layout generation.",
        path: "layout.spatialIdentity",
        expected: "non-empty string",
        received: layout.spatialIdentity,
      },
      options,
    );
  }

  if (layout.canvasComponentId !== rules.requiredCanvasComponentId) {
    pushIssue(
      issues,
      {
        ruleId: "layout.canvas.component.invalid",
        severity: "error",
        message: `Main widget injection surface must be '${rules.requiredCanvasComponentId}'.`,
        path: "layout.canvasComponentId",
        expected: rules.requiredCanvasComponentId,
        received: layout.canvasComponentId,
      },
      options,
    );
  }

  if (rules.requireAppShell && layout.landmarks.hasAppShell !== true) {
    pushIssue(
      issues,
      {
        ruleId: "layout.landmarks.app_shell.required",
        severity: "error",
        message: "Layout must include an app shell container.",
        path: "layout.landmarks.hasAppShell",
        expected: "true",
        received: String(layout.landmarks.hasAppShell),
      },
      options,
    );
  }

  if (rules.requireHeader && !layout.landmarks.hasHeader) {
    pushIssue(
      issues,
      {
        ruleId: "layout.landmarks.header.required",
        severity: "error",
        message: "App shell must include a <header> landmark.",
        path: "layout.landmarks.hasHeader",
        expected: "true",
        received: String(layout.landmarks.hasHeader),
      },
      options,
    );
  }

  if (rules.requireNavigation && !layout.landmarks.hasNavigation) {
    pushIssue(
      issues,
      {
        ruleId: "layout.landmarks.navigation.required",
        severity: "error",
        message: "App shell must include a <nav> landmark.",
        path: "layout.landmarks.hasNavigation",
        expected: "true",
        received: String(layout.landmarks.hasNavigation),
      },
      options,
    );
  }

  if (rules.requireMain && !layout.landmarks.hasMain) {
    pushIssue(
      issues,
      {
        ruleId: "layout.landmarks.main.required",
        severity: "error",
        message: "App shell must include a <main> landmark.",
        path: "layout.landmarks.hasMain",
        expected: "true",
        received: String(layout.landmarks.hasMain),
      },
      options,
    );
  }

  if (rules.requireFooter && !layout.landmarks.hasFooter) {
    pushIssue(
      issues,
      {
        ruleId: "layout.landmarks.footer.required",
        severity: "error",
        message: "App shell must include a <footer> landmark.",
        path: "layout.landmarks.hasFooter",
        expected: "true",
        received: String(layout.landmarks.hasFooter),
      },
      options,
    );
  }

  if (rules.requireSkipLink && !layout.landmarks.hasSkipToMainContent) {
    pushIssue(
      issues,
      {
        ruleId: "layout.landmarks.skip_link.required",
        severity: "error",
        message: "Layout must include a skip-to-main-content link.",
        path: "layout.landmarks.hasSkipToMainContent",
        expected: "true",
        received: String(layout.landmarks.hasSkipToMainContent),
      },
      options,
    );
  }

  checkAllowedTokenList(
    issues,
    options,
    "layout.spacing.token.invalid",
    "layout.spacingTokensUsed",
    layout.spacingTokensUsed,
    rules.allowedSpacingTokens,
    "Spacing",
  );

  checkAllowedTokenList(
    issues,
    options,
    "layout.section_padding.token.invalid",
    "layout.sectionPaddingTokens",
    layout.sectionPaddingTokens,
    rules.allowedSpacingTokens,
    "Section padding",
  );

  checkAllowedTokenList(
    issues,
    options,
    "layout.component_gap.token.invalid",
    "layout.componentGapTokens",
    layout.componentGapTokens,
    rules.allowedSpacingTokens,
    "Component gap",
  );

  if (rules.forbidArbitrarySpacing && layout.arbitrarySpacingValues && layout.arbitrarySpacingValues.length > 0) {
    for (let index = 0; index < layout.arbitrarySpacingValues.length; index += 1) {
      pushIssue(
        issues,
        {
          ruleId: "layout.spacing.arbitrary.forbidden",
          severity: "error",
          message: "Arbitrary spacing values are forbidden. Use Foundation spacing tokens.",
          path: `layout.arbitrarySpacingValues[${index}]`,
          expected: rules.allowedSpacingTokens.join(", "),
          received: layout.arbitrarySpacingValues[index],
        },
        options,
      );
    }
  }

  checkAllowedTokenList(
    issues,
    options,
    "layout.typography.token.invalid",
    "layout.typographyTokensUsed",
    layout.typographyTokensUsed,
    rules.allowedTypographyTokens,
    "Typography",
  );

  checkAllowedTokenList(
    issues,
    options,
    "layout.radius.token.invalid",
    "layout.radiusTokensUsed",
    layout.radiusTokensUsed,
    rules.allowedRadiusTokens,
    "Radius",
  );

  if (rules.allowedSurfaceColorTokens.length > 0) {
    checkAllowedTokenList(
      issues,
      options,
      "layout.surface.token.invalid",
      "layout.surfaceColorTokensUsed",
      layout.surfaceColorTokensUsed,
      rules.allowedSurfaceColorTokens,
      "Surface color",
    );
  }

  for (let index = 0; index < (layout.forbiddenTokensUsed ?? []).length; index += 1) {
    const token = layout.forbiddenTokensUsed?.[index] ?? "";
    if (rules.forbiddenTokens.includes(token)) {
      pushIssue(
        issues,
        {
          ruleId: "layout.token.forbidden",
          severity: "error",
          message: `Token '${token}' is forbidden by genome guardrails.`,
          path: `layout.forbiddenTokensUsed[${index}]`,
          received: token,
        },
        options,
      );
    }
  }

  for (let index = 0; index < (layout.deprecatedTokensUsed ?? []).length; index += 1) {
    const token = layout.deprecatedTokensUsed?.[index] ?? "";
    if (rules.deprecatedTokens.includes(token)) {
      pushIssue(
        issues,
        {
          ruleId: "layout.token.deprecated",
          severity: "warning",
          message: `Token '${token}' is deprecated in genome guardrails.`,
          path: `layout.deprecatedTokensUsed[${index}]`,
          remediation: "Replace with approved current token from the synchronized contract.",
        },
        options,
      );
    }
  }

  if (!rules.allowedBreakpoints.includes(layout.breakpointRules.collapseSidebarAt)) {
    pushIssue(
      issues,
      {
        ruleId: "layout.breakpoints.collapse.invalid",
        severity: "error",
        message: "Sidebar collapse breakpoint must use a Foundation breakpoint token.",
        path: "layout.breakpointRules.collapseSidebarAt",
        expected: rules.allowedBreakpoints.join(", "),
        received: layout.breakpointRules.collapseSidebarAt,
      },
      options,
    );
  }

  if (!rules.allowedBreakpoints.includes(layout.breakpointRules.desktopLayoutAt)) {
    pushIssue(
      issues,
      {
        ruleId: "layout.breakpoints.desktop.invalid",
        severity: "error",
        message: "Desktop layout breakpoint must use a Foundation breakpoint token.",
        path: "layout.breakpointRules.desktopLayoutAt",
        expected: rules.allowedBreakpoints.join(", "),
        received: layout.breakpointRules.desktopLayoutAt,
      },
      options,
    );
  }

  if (layout.breakpointRules.collapseSidebarAt !== rules.requiredSidebarCollapseBreakpoint) {
    pushIssue(
      issues,
      {
        ruleId: "layout.breakpoints.collapse.required",
        severity: "error",
        message: `Sidebar collapse must happen at ${rules.requiredSidebarCollapseBreakpoint}.`,
        path: "layout.breakpointRules.collapseSidebarAt",
        expected: rules.requiredSidebarCollapseBreakpoint,
        received: layout.breakpointRules.collapseSidebarAt,
      },
      options,
    );
  }

  if (layout.breakpointRules.desktopLayoutAt !== rules.requiredDesktopLayoutBreakpoint) {
    pushIssue(
      issues,
      {
        ruleId: "layout.breakpoints.desktop.required",
        severity: "error",
        message: `Desktop side-by-side layout must begin at ${rules.requiredDesktopLayoutBreakpoint}.`,
        path: "layout.breakpointRules.desktopLayoutAt",
        expected: rules.requiredDesktopLayoutBreakpoint,
        received: layout.breakpointRules.desktopLayoutAt,
      },
      options,
    );
  }

  if (layout.breakpointRules.mobileSidebarMode !== "overlay" && layout.breakpointRules.mobileSidebarMode !== "slide-over") {
    pushIssue(
      issues,
      {
        ruleId: "layout.sidebar.mobile_mode.invalid",
        severity: "error",
        message: "Mobile sidebar mode must be overlay or slide-over.",
        path: "layout.breakpointRules.mobileSidebarMode",
        expected: "overlay | slide-over",
        received: layout.breakpointRules.mobileSidebarMode,
      },
      options,
    );
  }

  if (layout.breakpointRules.desktopSidebarMode !== "sticky" && layout.breakpointRules.desktopSidebarMode !== "side-by-side") {
    pushIssue(
      issues,
      {
        ruleId: "layout.sidebar.desktop_mode.invalid",
        severity: "error",
        message: "Desktop sidebar mode must be sticky or side-by-side.",
        path: "layout.breakpointRules.desktopSidebarMode",
        expected: "sticky | side-by-side",
        received: layout.breakpointRules.desktopSidebarMode,
      },
      options,
    );
  }

  if (layout.sidebarEnabled) {
    const a11y = layout.sidebarA11y;
    if (!a11y) {
      pushIssue(
        issues,
        {
          ruleId: "layout.sidebar.a11y.required",
          severity: "error",
          message: "Sidebar accessibility state is required when sidebar is enabled.",
          path: "layout.sidebarA11y",
          expected: "SidebarA11yState",
        },
        options,
      );
    } else {
      if (!a11y.hasToggleButton) {
        pushIssue(
          issues,
          {
            ruleId: "layout.sidebar.toggle.required",
            severity: "error",
            message: "Sidebar must be controllable by a toggle button on mobile.",
            path: "layout.sidebarA11y.hasToggleButton",
            expected: "true",
            received: String(a11y.hasToggleButton),
          },
          options,
        );
      }
      if (!a11y.hasAriaExpanded) {
        pushIssue(
          issues,
          {
            ruleId: "layout.sidebar.aria_expanded.required",
            severity: "error",
            message: "Sidebar toggle button must expose aria-expanded.",
            path: "layout.sidebarA11y.hasAriaExpanded",
            expected: "true",
            received: String(a11y.hasAriaExpanded),
          },
          options,
        );
      }
      if (!a11y.hasAriaControls) {
        pushIssue(
          issues,
          {
            ruleId: "layout.sidebar.aria_controls.required",
            severity: "error",
            message: "Sidebar toggle button must expose aria-controls.",
            path: "layout.sidebarA11y.hasAriaControls",
            expected: "true",
            received: String(a11y.hasAriaControls),
          },
          options,
        );
      }
    }
  }

  if (layout.gridColumns !== undefined && !rules.allowedGridColumns.includes(layout.gridColumns)) {
    pushIssue(
      issues,
      {
        ruleId: "layout.grid.columns.invalid",
        severity: "error",
        message: `Grid column count '${layout.gridColumns}' is outside allowed layout contract.`,
        path: "layout.gridColumns",
        expected: rules.allowedGridColumns.join(", "),
        received: String(layout.gridColumns),
      },
      options,
    );
  }

  if (
    layout.maxContentWidthToken &&
    rules.allowedMaxContentWidthTokens.length > 0 &&
    !rules.allowedMaxContentWidthTokens.includes(layout.maxContentWidthToken)
  ) {
    pushIssue(
      issues,
      {
        ruleId: "layout.content_width.token.invalid",
        severity: "error",
        message: "Max content width token is not permitted by genome guardrails.",
        path: "layout.maxContentWidthToken",
        expected: rules.allowedMaxContentWidthTokens.join(", "),
        received: layout.maxContentWidthToken,
      },
      options,
    );
  }

  if (layout.layoutNestingDepth !== undefined && layout.layoutNestingDepth > rules.maxLayoutNestingDepth) {
    pushIssue(
      issues,
      {
        ruleId: "layout.nesting.depth.exceeded",
        severity: "error",
        message: "Layout nesting depth exceeds the maximum allowed by guardrails.",
        path: "layout.layoutNestingDepth",
        expected: String(rules.maxLayoutNestingDepth),
        received: String(layout.layoutNestingDepth),
      },
      options,
    );
  }

  for (let index = 0; index < layout.regions.length; index += 1) {
    const region = layout.regions[index];
    if (region.critical && region.hiddenBelow) {
      pushIssue(
        issues,
        {
          ruleId: "layout.region.critical_hidden",
          severity: "error",
          message: `Critical region '${region.id}' cannot be hidden at '${region.hiddenBelow}'.`,
          path: `layout.regions[${index}].hiddenBelow`,
          expected: "critical regions are always visible",
          received: region.hiddenBelow,
        },
        options,
      );
    }
  }

  for (let index = 0; index < layout.widgets.length; index += 1) {
    const widget = layout.widgets[index];
    if (widget.contractCompliant === false) {
      pushIssue(
        issues,
        {
          ruleId: "layout.widget.contract_violation",
          severity: "error",
          message: `Widget '${widget.id}' violates component contract requirements.`,
          path: `layout.widgets[${index}].contractCompliant`,
          expected: "true",
          received: "false",
        },
        options,
      );
    }

    if (!widget.componentId.startsWith("pf-")) {
      pushIssue(
        issues,
        {
          ruleId: "layout.widget.foundation_prefix.recommended",
          severity: "warning",
          message: `Widget '${widget.id}' uses non-Foundation component id '${widget.componentId}'.`,
          path: `layout.widgets[${index}].componentId`,
          remediation: "Prefer components using the pf-* contract prefix.",
        },
        options,
      );
    }
  }

  if (layout.workspaceDominant === false) {
    pushIssue(
      issues,
      {
        ruleId: "layout.workspace_dominant.recommended",
        severity: "warning",
        message: "Workspace should remain visually dominant in the app shell.",
        path: "layout.workspaceDominant",
        expected: "true",
        received: "false",
      },
      options,
    );
  }

  if (layout.hasCommandSurface === false) {
    pushIssue(
      issues,
      {
        ruleId: "layout.command_surface.recommended",
        severity: "warning",
        message: "Command surface is recommended to expose available actions clearly.",
        path: "layout.hasCommandSurface",
        expected: "true",
        received: "false",
      },
      options,
    );
  }

  const warnings = issues.filter((issue) => issue.severity === "warning");
  const warningEscalated = options.warningAsError
    ? warnings.map((issue) => ({ ...issue, severity: "error" as const, ruleId: `${issue.ruleId}.warning_escalated` }))
    : [];

  const errors = [...issues.filter((issue) => issue.severity === "error"), ...warningEscalated];

  if ((mode === "error" || mode === "strict") && errors.length > 0) {
    throw new LayoutGenomeValidationError("Layout genome validation failed.", errors);
  }

  return {
    ok: errors.length === 0,
    issues,
    warnings,
    errors,
    rules,
  };
}
