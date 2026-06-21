import { PFStatusBadge } from './PFStatusBadge.jsx';

export function PFTimeline({ items }) {
  return (
    <div className="pf-timeline">
      <ol className="pf-timeline__items">
        {items.map((item) => (
          <li className="pf-timeline__item" key={item.title}>
            <span className="pf-timeline__marker" aria-hidden="true" />
            <div className="pf-timeline__content">
              <strong>{item.title}</strong>
              {item.time ? <span>{item.time}</span> : null}
              {item.status ? <PFStatusBadge status={item.status} /> : null}
              {item.description ? <span>{item.description}</span> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
