import { NavLink, useNavigate } from 'react-router-dom';

/* ─────────────────────────────────────────────
   Sidebar
   Design: Monolith System

   Desktop (md+):
   - Slim, always-visible, icon-only (w-16)
   - Tooltip slides in on hover

   Mobile (<md):
   - Hidden by default, slides in when isOpen=true
   - Wide panel (w-56) with icon + label side by side

   Props:
     isOpen  – controls mobile slide-in
     onClose – closes the sidebar (backdrop / nav click)
   ───────────────────────────────────────────── */

/* ── Inline SVG icons ── */

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    <polyline points="9 21 9 12 15 12 15 21" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

/* ── Nav link item ──────────────────────────────
   Mobile:  icon + label text side by side, full width
   Desktop: icon centered, tooltip on hover
   ─────────────────────────────────────────────── */
const SidebarLink = ({ to, icon: Icon, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    aria-label={label}
    className={({ isActive }) =>
      [
        /* shared base */
        'group relative flex items-center gap-3 rounded transition-colors duration-150',
        /* mobile: full-width row with padding */
        'w-full px-3 py-2.5 md:w-10 md:h-10 md:p-0 md:justify-center',
        /* active vs idle */
        isActive
          ? 'bg-canvas border border-border-hover text-text-high'
          : 'text-text-medium border border-transparent hover:bg-canvas hover:text-text-high hover:border-border',
      ].join(' ')
    }
  >
    {/* Icon – always shown */}
    <span className="shrink-0 flex items-center justify-center w-5 h-5">
      <Icon />
    </span>

    {/* Label – visible only on mobile (hidden on desktop) */}
    <span className="md:hidden font-geist text-sm font-medium">
      {label}
    </span>

    {/* Tooltip – desktop only, slides in on hover */}
    <span className="
      pointer-events-none absolute left-full ml-3 z-50
      hidden md:block
      whitespace-nowrap rounded bg-elevated border border-border
      px-2 py-1 font-mono text-[10px] tracking-widest uppercase
      text-text-medium opacity-0 translate-x-1
      transition-all duration-150
      group-hover:opacity-100 group-hover:translate-x-0
    ">
      {label}
    </span>
  </NavLink>
);

/* ── Sidebar ── */
export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  /* Replace with real auth logout logic when ready */
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-canvas/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        aria-label="Main navigation"
        className={[
          /* positioning – full height, above everything */
          'fixed top-0 left-0 z-40 h-full',
          /* mobile: wide (w-56) | desktop: slim (w-16) */
          'w-56 md:w-16',
          /* layout: items left-aligned on mobile, centered on desktop */
          'flex flex-col items-start md:items-center py-4 px-3 md:px-0 gap-1',
          /* Monolith Level-1 surface */
          'bg-elevated border-r border-border',
          /* slide-in on mobile / always visible on desktop */
          'transition-transform duration-200 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0',
        ].join(' ')}
      >
        {/* ── Mobile header: site name inside the drawer ── */}
        <div className="md:hidden w-full pb-3 mb-1 border-b border-border">
          <span className="font-geist font-semibold text-[15px] tracking-tight text-text-high">
            MAS_<span className="text-text-medium font-normal">Bookmark</span>
          </span>
        </div>

        {/* ── Top nav links ── */}
        <nav className="flex flex-col w-full md:items-center gap-1 flex-1 md:pt-2">
          <SidebarLink to="/"         icon={HomeIcon}     label="Home"     onClick={onClose} />
          <SidebarLink to="/settings" icon={SettingsIcon} label="Settings" onClick={onClose} />
        </nav>

        {/* ── Bottom: logout ── */}
        <div className="w-full md:w-auto pb-1">
          <button
            onClick={handleLogout}
            aria-label="Log out"
            className="
              group relative flex items-center gap-3 w-full rounded
              px-3 py-2.5 md:w-10 md:h-10 md:p-0 md:justify-center
              text-text-medium border border-transparent
              hover:bg-canvas hover:text-text-high hover:border-border
              transition-colors duration-150
            "
          >
            {/* Icon */}
            <span className="shrink-0 flex items-center justify-center w-5 h-5">
              <LogoutIcon />
            </span>

            {/* Mobile label */}
            <span className="md:hidden font-geist text-sm font-medium">
              Log out
            </span>

            {/* Desktop tooltip */}
            <span className="
              pointer-events-none absolute left-full ml-3 z-50
              hidden md:block
              whitespace-nowrap rounded bg-elevated border border-border
              px-2 py-1 font-mono text-[10px] tracking-widest uppercase
              text-text-medium opacity-0 translate-x-1
              transition-all duration-150
              group-hover:opacity-100 group-hover:translate-x-0
            ">
              Log out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
