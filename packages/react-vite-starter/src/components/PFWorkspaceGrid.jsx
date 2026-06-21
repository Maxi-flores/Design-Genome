export function PFWorkspaceGrid({ children, density = 'standard' }) {
  return (
    <div className="pf-workspace-grid" data-density={density}>
      <div className="pf-workspace-grid__regions">{children}</div>
    </div>
  );
}
