export function PFPanel({ title, actions, children, variant = 'default' }) {
  return (
    <aside className="pf-panel" data-variant={variant}>
      {(title || actions) && (
        <div className="pf-panel__header">
          <div>{title}</div>
          {actions ? <div className="pf-panel__actions">{actions}</div> : null}
        </div>
      )}
      <div className="pf-panel__body">{children}</div>
    </aside>
  );
}
