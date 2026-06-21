export function PFCommandBar({ primaryActions, secondaryActions, filters, search, status }) {
  return (
    <div className="pf-command-bar">
      {primaryActions ? <div className="pf-command-bar__primary">{primaryActions}</div> : null}
      {secondaryActions ? <div className="pf-command-bar__secondary">{secondaryActions}</div> : null}
      {filters ? <div className="pf-command-bar__filters">{filters}</div> : null}
      {search ? <div className="pf-command-bar__search">{search}</div> : null}
      {status ? <div className="pf-command-bar__status">{status}</div> : null}
    </div>
  );
}
