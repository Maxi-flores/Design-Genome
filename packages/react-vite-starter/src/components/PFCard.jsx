export function PFCard({ title, description, children, footer, variant = 'default' }) {
  return (
    <article className="pf-card" data-variant={variant}>
      {(title || description) && (
        <div className="pf-card__header">
          <div>
            {title && <div>{title}</div>}
            {description && <div className="pf-card__description">{description}</div>}
          </div>
        </div>
      )}
      <div className="pf-card__body">{children}</div>
      {footer ? <div className="pf-card__footer">{footer}</div> : null}
    </article>
  );
}
