function hasVisibleText(children) {
  return typeof children === 'string' || typeof children === 'number';
}

export function PFButton({
  children,
  variant = 'secondary',
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  ariaLabel
}) {
  if (!hasVisibleText(children) && !ariaLabel) {
    throw new Error('PFButton requires ariaLabel when no visible text is present.');
  }

  const resolvedDisabled = disabled || loading;
  const state = loading ? 'loading' : resolvedDisabled ? 'disabled' : 'default';

  return (
    <button
      className="pf-button"
      data-variant={variant}
      data-state={state}
      type={type}
      disabled={resolvedDisabled}
      onClick={onClick}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
    >
      <span className="pf-button__label">{children}</span>
    </button>
  );
}
