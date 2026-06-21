export function PFSelect({
  id,
  label,
  value,
  onChange,
  options,
  error,
  disabled = false,
  required = false
}) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <label>
      <span className="pf-select__label">{label}</span>
      <select
        id={id}
        className="pf-select"
        data-state={error ? 'error' : disabled ? 'disabled' : 'default'}
        value={value}
        onChange={onChange}
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
        disabled={disabled}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <span className="pf-select__error" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
