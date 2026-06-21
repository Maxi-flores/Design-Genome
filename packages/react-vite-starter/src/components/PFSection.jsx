export function PFSection({ title, description, children, footer, variant = 'default' }) {
  return (
    <section className="pf-section" data-variant={variant}>
      {(title || description) && (
        <div className="pf-section__header">
          <div>
            {title && <div>{title}</div>}
            {description && <div>{description}</div>}
          </div>
        </div>
      )}
      <div className="pf-section__body">{children}</div>
      {footer ? <div className="pf-section__footer">{footer}</div> : null}
    </section>
  );
}
