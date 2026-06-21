import { PFStatusBadge } from './PFStatusBadge.jsx';

export function PFMetricCard({ label, value, delta, status, description, variant = 'default' }) {
  return (
    <article className="pf-metric-card" data-variant={variant}>
      <div className="pf-metric-card__label">{label}</div>
      <div className="pf-metric-card__value" aria-label={`${label}: ${value}`}>
        {value}
      </div>
      {delta ? <div className="pf-metric-card__delta">{delta}</div> : null}
      {status ? (
        <div className="pf-metric-card__status">
          <PFStatusBadge status={status} />
        </div>
      ) : null}
      {description ? <div className="pf-metric-card__description">{description}</div> : null}
    </article>
  );
}
