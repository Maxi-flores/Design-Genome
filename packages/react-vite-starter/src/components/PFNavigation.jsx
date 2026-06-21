export function PFNavigation({ items, label }) {
  return (
    <nav className="pf-navigation" aria-label={label}>
      <ul className="pf-navigation__list">
        {items.map((item) => (
          <li key={item.href}>
            <a className="pf-navigation__item" href={item.href} aria-current={item.active ? 'page' : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
