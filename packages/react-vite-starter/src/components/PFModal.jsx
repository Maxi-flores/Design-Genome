import { PFButton } from './PFButton.jsx';

export function PFModal({ open, title, children, actions, onClose }) {
  if (!open) {
    return null;
  }

  const titleId = `pf-modal-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="pf-modal" data-state="open" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <PFButton ariaLabel="Close modal" variant="ghost" onClick={onClose}>
        Close
      </PFButton>
      <div className="pf-modal__header" id={titleId}>
        {title}
      </div>
      <div className="pf-modal__body">{children}</div>
      {actions ? <div className="pf-modal__footer">{actions}</div> : null}
    </div>
  );
}
