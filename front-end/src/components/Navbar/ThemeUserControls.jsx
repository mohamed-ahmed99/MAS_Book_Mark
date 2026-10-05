/* ─────────────────────────────────────────────
   ThemeUserControls
   Right-side cluster in the Navbar:
     1. Dark / light mode toggle button
     2. User avatar circle (initials or icon)

   Props:
     isDark   – current theme state (boolean)
     onToggle – called when the toggle is clicked
     userName – display name used for initials (string, optional)
   ───────────────────────────────────────────── */

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/* Derive up-to-2-character initials from a name string */
const getInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

export default function ThemeUserControls({ isDark, onToggle, userName = '' }) {
  const initials = getInitials(userName);

  return (
    <div className="flex items-center gap-2">

      {/* ── Theme toggle ── */}
      <button
        onClick={onToggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
        className="
          w-8 h-8 flex items-center justify-center rounded
          border border-border text-text-medium
          hover:border-border-hover hover:text-text-high
          transition-colors duration-150
        "
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* ── User avatar circle ── */}
      <button
        aria-label="User account"
        title={userName || 'Account'}
        className="
          w-8 h-8 flex items-center justify-center rounded-full
          bg-elevated border border-border
          text-text-high font-mono text-[11px] tracking-widest font-medium
          hover:border-border-hover
          transition-colors duration-150 cursor-pointer select-none
        "
      >
        {initials || (
          /* fallback: generic user icon */
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
      </button>

    </div>
  );
}
