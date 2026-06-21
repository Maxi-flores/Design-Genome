import { PFButton } from './PFButton.jsx';

export function PFDrawer({ open, title, children, actions, onClose, position = 'end' }) {
  if (!open) {
    return null;
  }

  return (
    <aside className="pf-drawer" data-state="open" data-position={position} role="dialog" aria-modal="true" aria-label={title}>
      <PFButton ariaLabel="Close drawer" variant="ghost" onClick={onClose}>
        Close
      </PFButton>
      <div className="pf-drawer__header">{title}</div>
      <div className="pf-drawer__body">{children}</div>
      {actions ? <div className="pf-drawer__footer">{actions}</div> : null}
    </aside>
  );
}
