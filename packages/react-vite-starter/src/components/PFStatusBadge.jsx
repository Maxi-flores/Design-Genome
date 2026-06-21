const STATUS_LABELS = {
  active: 'Active',
  running: 'Running',
  completed: 'Completed',
  paused: 'Paused',
  blocked: 'Blocked',
  warning: 'Warning',
  error: 'Error',
  draft: 'Draft',
  archived: 'Archived'
};

export function PFStatusBadge({ status, children }) {
  const label = children ?? STATUS_LABELS[status] ?? status;

  return (
    <span className="pf-status-badge" data-status={status}>
      <span className="pf-status-badge__label">{label}</span>
    </span>
  );
}
