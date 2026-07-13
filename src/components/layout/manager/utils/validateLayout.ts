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
  | "non-pf-widget-id";

export class LayoutCompilationError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "LayoutCompilationError";
    this.code = code;
  }
}

export interface LayoutLandmarks {
  hasHeader: boolean;
  hasNavigation: boolean;
  hasMain: boolean;
  hasSkipToMainContent: boolean;
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
}

export interface ValidateLayoutOptions {
  warningAsError?: boolean;
  onWarning?: (warning: LayoutValidationWarning) => void;
}

export interface LayoutValidationWarning {
  code: LayoutWarningCode;
  message: string;
}

export interface LayoutValidationResult {
  ok: true;
  warnings: LayoutValidationWarning[];
}

const ALLOWED_SPACING_TOKENS: ReadonlySet<SpacingToken> = new Set([
  "--space-1",
  "--space-2",
  "--space-3",
  "--space-4",
  "--space-5",
  "--space-6",
  "--space-7",
  "--space-8",
  "--space-9",
]);

const ALLOWED_BREAKPOINT_TOKENS: ReadonlySet<BreakpointToken> = new Set([
  "--bp-xs",
  "--bp-sm",
  "--bp-md",
  "--bp-lg",
  "--bp-xl",
  "--bp-2xl",
]);

const ALLOWED_DENSITY_MODES: ReadonlySet<DensityMode> = new Set([
  "compact",
  "standard",
  "focus",
  "executive",
]);

const ALLOWED_ARCHITECTURAL_FAMILIES: ReadonlySet<ArchitecturalFamily> = new Set([
  "Command Tower",
  "Glass Atrium",
  "Blueprint Studio",
  "Signal Terminal",
  "Executive Gallery",
  "Horizon Workspace",
]);

function assert(condition: unknown, code: string, message: string): asserts condition {
  if (!condition) {
    throw new LayoutCompilationError(code, message);
  }
}

function buildWarning(code: LayoutWarningCode, message: string): LayoutValidationWarning {
  return { code, message };
}

export function validateLayout(
  layout: LayoutCanvasContract,
  options: ValidateLayoutOptions = {},
): LayoutValidationResult {
  const warnings: LayoutValidationWarning[] = [];

  assert(
    ALLOWED_ARCHITECTURAL_FAMILIES.has(layout.architecturalFamily),
    "layout.architectural_family.invalid",
    `Architectural family '${layout.architecturalFamily}' is not allowed by layout guardrails.`,
  );

  assert(
    layout.spatialIdentity.trim().length > 0,
    "layout.spatial_identity.required",
    "Spatial identity is required before layout generation.",
  );

  assert(
    ALLOWED_DENSITY_MODES.has(layout.densityMode),
    "layout.density_mode.invalid",
    `Density mode '${layout.densityMode}' is not allowed. Use compact, standard, focus, or executive.`,
  );

  assert(
    layout.canvasComponentId === "pf-workspace-grid",
    "layout.canvas.component.invalid",
    "Main widget injection surface must be 'pf-workspace-grid'.",
  );

  assert(layout.landmarks.hasHeader, "layout.landmarks.header.required", "App shell must include a <header> landmark.");
  assert(layout.landmarks.hasNavigation, "layout.landmarks.navigation.required", "App shell must include a <nav> landmark.");
  assert(layout.landmarks.hasMain, "layout.landmarks.main.required", "App shell must include a <main> landmark.");
  assert(
    layout.landmarks.hasSkipToMainContent,
    "layout.landmarks.skip_link.required",
    "Layout must include a skip-to-main-content link.",
  );

  for (const spacingToken of layout.spacingTokensUsed) {
    assert(
      ALLOWED_SPACING_TOKENS.has(spacingToken as SpacingToken),
      "layout.spacing.token.invalid",
      `Spacing token '${spacingToken}' is not allowed. Use only Foundation spacing tokens --space-1..--space-9.`,
    );
  }

  assert(
    ALLOWED_BREAKPOINT_TOKENS.has(layout.breakpointRules.collapseSidebarAt),
    "layout.breakpoints.collapse.invalid",
    "Sidebar collapse breakpoint must use a Foundation breakpoint token.",
  );

  assert(
    ALLOWED_BREAKPOINT_TOKENS.has(layout.breakpointRules.desktopLayoutAt),
    "layout.breakpoints.desktop.invalid",
    "Desktop layout breakpoint must use a Foundation breakpoint token.",
  );

  assert(
    layout.breakpointRules.collapseSidebarAt === "--bp-md",
    "layout.breakpoints.collapse.required_md",
    "Sidebar collapse must happen at --bp-md (768px).",
  );

  assert(
    layout.breakpointRules.desktopLayoutAt === "--bp-lg",
    "layout.breakpoints.desktop.required_lg",
    "Desktop side-by-side layout must begin at --bp-lg (1024px).",
  );

  assert(
    layout.breakpointRules.mobileSidebarMode === "overlay" ||
      layout.breakpointRules.mobileSidebarMode === "slide-over",
    "layout.sidebar.mobile_mode.invalid",
    "Mobile sidebar mode must be overlay or slide-over.",
  );

  assert(
    layout.breakpointRules.desktopSidebarMode === "sticky" ||
      layout.breakpointRules.desktopSidebarMode === "side-by-side",
    "layout.sidebar.desktop_mode.invalid",
    "Desktop sidebar mode must be sticky or side-by-side.",
  );

  if (layout.sidebarEnabled) {
    const a11y = layout.sidebarA11y;
    assert(a11y, "layout.sidebar.a11y.required", "Sidebar accessibility state is required when sidebar is enabled.");
    assert(a11y.hasToggleButton, "layout.sidebar.toggle.required", "Sidebar must be controllable by a toggle button on mobile.");
    assert(a11y.hasAriaExpanded, "layout.sidebar.aria_expanded.required", "Sidebar toggle button must expose aria-expanded.");
    assert(a11y.hasAriaControls, "layout.sidebar.aria_controls.required", "Sidebar toggle button must expose aria-controls.");
  }

  for (const region of layout.regions) {
    if (region.critical && region.hiddenBelow) {
      throw new LayoutCompilationError(
        "layout.region.critical_hidden",
        `Critical region '${region.id}' cannot be hidden at '${region.hiddenBelow}'.`,
      );
    }
  }

  for (const widget of layout.widgets) {
    if (widget.contractCompliant === false) {
      throw new LayoutCompilationError(
        "layout.widget.contract_violation",
        `Widget '${widget.id}' violates component contract requirements.`,
      );
    }

    if (!widget.componentId.startsWith("pf-")) {
      warnings.push(
        buildWarning(
          "non-pf-widget-id",
          `Widget '${widget.id}' uses non-Foundation component id '${widget.componentId}'.`,
        ),
      );
    }
  }

  if (layout.workspaceDominant === false) {
    warnings.push(
      buildWarning(
        "workspace-not-dominant",
        "Workspace should remain visually dominant in the app shell.",
      ),
    );
  }

  if (layout.hasCommandSurface === false) {
    warnings.push(
      buildWarning(
        "missing-command-surface",
        "Command surface is recommended to expose available actions clearly.",
      ),
    );
  }

  if (warnings.length > 0) {
    for (const warning of warnings) {
      options.onWarning?.(warning);
    }

    if (options.warningAsError) {
      const first = warnings[0];
      throw new LayoutCompilationError(`layout.warning.${first.code}`, first.message);
    }
  }

  return { ok: true, warnings };
}
