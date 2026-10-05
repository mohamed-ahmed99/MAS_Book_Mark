import { useState, useEffect } from 'react';
import Logo              from './Logo';
import SearchInput       from './SearchInput';
import ThemeUserControls from './ThemeUserControls';

/* ─────────────────────────────────────────────
   Navbar  (assembles all sub-components)

   Desktop layout (md+) — sidebar visible, navbar starts after it:
   ┌─────────┬──────────────────────────────────────────────────┐
   │ sidebar │  [Logo + Name]  [── Search ── ×]  [🌙] [👤]     │
   └─────────┴──────────────────────────────────────────────────┘

   Mobile layout (<md) — sidebar hidden, navbar is full-width:
   ┌──────────────────────────────────────────────────────────┐
   │ [Logo]  [──────── Search ──────── ×]        [☰ sidebar] │
   └──────────────────────────────────────────────────────────┘

   Props:
     onSidebarOpen – callback to open the Sidebar on mobile
     onSearch      – forwarded to SearchInput
     userName      – forwarded to ThemeUserControls
   ───────────────────────────────────────────── */

/* Hamburger icon for the mobile sidebar trigger */
const HamburgerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="3" y1="6"  x2="21" y2="6"  />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default function Navbar({ onSidebarOpen, onSearch, userName = '' }) {

  /* ── Theme state (persisted in localStorage) ── */
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <header
      className="
        fixed top-0 left-0 md:left-16 right-0 z-30
        h-14 flex items-center gap-3
        px-4 md:px-6
        bg-canvas border-b border-border md:border-l md:border-border
      "
      role="banner"
    >
      {/* ── Left: Logo ── */}
      <Logo isDark={isDark} />

      {/* ── Center: Search – visible on all screen sizes ── */}
      <div className="flex flex-1 min-w-0 mx-1 md:mx-3 max-w-sm">
        <SearchInput onSearch={onSearch} />
      </div>

      {/* ── Right: controls (desktop) / hamburger (mobile) ── */}
      <div className="flex items-center gap-2 ml-auto">

        {/* Desktop: theme toggle + user avatar */}
        <div className="hidden md:flex">
          <ThemeUserControls
            isDark={isDark}
            onToggle={toggleTheme}
            userName={userName}
          />
        </div>

        {/* Mobile: sidebar open button */}
        <button
          onClick={onSidebarOpen}
          aria-label="Open navigation"
          title="Open navigation"
          className="
            md:hidden
            w-8 h-8 flex items-center justify-center rounded
            border border-border text-text-medium
            hover:border-border-hover hover:text-text-high
            transition-colors duration-150
          "
        >
          <HamburgerIcon />
        </button>

      </div>
    </header>
  );
}
