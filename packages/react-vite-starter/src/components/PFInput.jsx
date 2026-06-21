export function PFInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  type = 'text'
}) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <label>
      <span className="pf-input__label">{label}</span>
      <input
        id={id}
        className="pf-input"
        data-state={error ? 'error' : disabled ? 'disabled' : 'default'}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
        disabled={disabled}
        required={required}
      />
      {error ? (
        <span className="pf-input__error" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
