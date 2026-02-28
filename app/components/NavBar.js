export function NavBar({ items }) {
  return (
    <nav id="nav" aria-label="Primary">
      <div className="nav-logo">
        <svg className="nav-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <line x1="10" y1="1" x2="10" y2="8" stroke="white" strokeWidth="1.3" />
          <line x1="3" y1="8" x2="17" y2="8" stroke="white" strokeWidth="1.3" />
          <line x1="3" y1="8" x2="3" y2="19" stroke="white" strokeWidth="1.3" />
          <line x1="17" y1="8" x2="17" y2="19" stroke="white" strokeWidth="1.3" />
          <line x1="1" y1="19" x2="19" y2="19" stroke="white" strokeWidth="1.3" />
          <line x1="3" y1="12" x2="10" y2="8" stroke="white" strokeWidth="0.8" opacity="0.45" />
          <line x1="17" y1="12" x2="10" y2="8" stroke="white" strokeWidth="0.8" opacity="0.45" />
          <line x1="3" y1="16" x2="17" y2="16" stroke="white" strokeWidth="0.8" opacity="0.35" />
          <line x1="1" y1="8" x2="4" y2="8" stroke="white" strokeWidth="1.3" />
          <line x1="16" y1="8" x2="19" y2="8" stroke="white" strokeWidth="1.3" />
        </svg>
        Grid Genesis
      </div>
      <ul className="nav-links" role="list">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.target}`} data-target={item.target} data-nav-id={item.id}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
