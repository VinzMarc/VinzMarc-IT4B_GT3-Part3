import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="site-shell">
      <nav className="site-nav">
        <div className="site-nav__inner">
          <Link to="/" className="brand-lockup">
            <span className="brand-mark" aria-hidden="true">↗</span>
            <span><strong>Found / Lost</strong><small>Campus exchange desk</small></span>
          </Link>
          <div className="site-nav__links">
            <Link to="/items">Browse items</Link>
            <Link to="/about">How it works</Link>
          </div>
          <div className="nav-status"><span className="status-dot" />Live campus board</div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
