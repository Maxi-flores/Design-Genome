export function PFEmptyState({ title, description, action }) {
  return (
    <div className="pf-empty-state">
      <div className="pf-empty-state__title">{title}</div>
      <div className="pf-empty-state__message">{description}</div>
      {action ? <div className="pf-empty-state__actions">{action}</div> : null}
    </div>
  );
}
