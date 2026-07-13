import { useState, useId } from 'react';

/**
 * LayoutManager — Core structural shell for Sentient OS AI project screens.
 *
 * Implements the Foundation App Shell contract:
 *   sticky Header · collapsible Navigation Sidebar · dynamic Canvas Grid
 *
 * Architectural declaration is passed through data attributes so that
 * personality and project DNA CSS layers can apply correctly.
 *
 * Props
 * ─────────────────────────────────────────────────────────────────────────
 * @param {React.ReactNode}  children                  - Canvas widgets (injected by AI skills or the app)
 * @param {React.ReactNode}  [header]                  - Global header content (logo, breadcrumb, user menu)
 * @param {React.ReactNode}  [sidebar]                 - Navigation rail content; omit to render without a sidebar
 * @param {React.ReactNode}  [commandBar]              - Operational command surface rendered below the header
 * @param {string}           [architecturalFamily]     - Declared architectural family (e.g. "command-tower")
 * @param {string}           [spatialIdentity]         - Declared spatial identity (e.g. "operations-deck")
 * @param {'compact'|'standard'|'focus'|'executive'} [densityMode='standard'] - Foundation density mode
 * @param {boolean}          [defaultSidebarCollapsed] - Initial collapsed state of the sidebar
 * @param {string}           [sidebarLabel]            - Accessible label for the <nav> landmark
 */
export function LayoutManager({
  children,
  header,
  sidebar,
  commandBar,
  architecturalFamily,
  spatialIdentity,
  densityMode = 'standard',
  defaultSidebarCollapsed = false,
  sidebarLabel = 'Site Navigation',
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultSidebarCollapsed);

  const navId = useId();
  const mainId = useId();

  function toggleSidebar() {
    setSidebarCollapsed((prev) => !prev);
  }

  const hasSidebar = sidebar !== undefined;

  return (
    <div
      className="pf-layout-manager"
      data-architectural-family={architecturalFamily}
      data-spatial-identity={spatialIdentity}
      data-density-mode={densityMode}
      data-sidebar-collapsed={sidebarCollapsed ? 'true' : 'false'}
    >
      {/* Skip navigation link — keyboard and screen-reader accessibility */}
      <a className="pf-layout-manager__skip-link" href={`#${mainId}`}>
        Skip to main content
      </a>

      {/* Global Header — role="banner" landmark */}
      <header className="pf-layout-manager__header" role="banner">
        <div className="pf-layout-manager__header-start">
          {hasSidebar && (
            <button
              className="pf-layout-manager__sidebar-toggle"
              type="button"
              aria-expanded={!sidebarCollapsed}
              aria-controls={navId}
              aria-label={sidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'}
              onClick={toggleSidebar}
            >
              {/* Menu icon — hidden from assistive technology; label is on the button */}
              <svg
                aria-hidden="true"
                focusable="false"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="2" y1="4" x2="14" y2="4" />
                <line x1="2" y1="8" x2="14" y2="8" />
                <line x1="2" y1="12" x2="14" y2="12" />
              </svg>
            </button>
          )}
        </div>

        <div className="pf-layout-manager__header-content">{header}</div>
      </header>

      {/* Command Bar — operational control surface (optional) */}
      {commandBar !== undefined && (
        <div className="pf-layout-manager__command-bar" role="toolbar" aria-label="Command bar">
          {commandBar}
        </div>
      )}

      {/* App Shell — sidebar + main canvas */}
      <div className="pf-layout-manager__shell">
        {/* Navigation Sidebar — role="navigation" landmark */}
        {hasSidebar && (
          <nav
            id={navId}
            className="pf-layout-manager__sidebar"
            aria-label={sidebarLabel}
            aria-hidden={sidebarCollapsed ? true : undefined}
          >
            <div className="pf-layout-manager__sidebar-inner">{sidebar}</div>
          </nav>
        )}

        {/* Main Content Canvas — role="main" landmark; AI widgets injected here */}
        <main
          id={mainId}
          className="pf-layout-manager__canvas"
          tabIndex={-1}
        >
          <div className="pf-layout-manager__canvas-grid">{children}</div>
        </main>
      </div>
    </div>
  );
}
