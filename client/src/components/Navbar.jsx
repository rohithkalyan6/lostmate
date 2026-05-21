import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { clearAuth, getDashboardPath, getStoredUser, getToken } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();
  const user = getStoredUser();
  const dashboardPath = getDashboardPath(user?.role);
  const isAdmin = user?.role === 'admin';
  const isAuthenticated = Boolean(token && user);

  const handleLogout = () => {
    clearAuth();
    navigate('/login', { replace: true });
  };

  const publicLinks = [
    ['Home', '/'],
    ['Browse Items', '/lost'],
    ['Report Lost / Found', '/report-lost'],
    ['About Us', '/#about'],
  ];

  const privateLinks = isAdmin
    ? [['Admin', '/admin-dashboard']]
    : [
        ['Dashboard', '/dashboard'],
        ['Lost', '/lost'],
        ['Found', '/found'],
      ];

  return (
    <nav className="sticky top-0 z-20 border-b border-[var(--line)] bg-[rgba(255,255,255,0.88)] backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 flex-col justify-center gap-3 py-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <Link to={isAuthenticated ? dashboardPath : '/'} className="text-xl font-extrabold leading-none text-[var(--ink)]">LostMate</Link>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:justify-center">
            {(isAuthenticated ? privateLinks : publicLinks).map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[var(--signal-soft)] text-[var(--ink)]'
                      : 'text-[var(--muted)] hover:bg-[var(--signal-soft)] hover:text-[var(--ink)]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center md:justify-end">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="rounded-full border border-[var(--line-strong)] px-4 py-2 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--ink)] hover:bg-[var(--signal-soft)]"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-full bg-[var(--ink)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2b2b2b]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
