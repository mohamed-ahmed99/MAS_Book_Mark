import { useState } from 'react';
import Navbar  from '../../components/Navbar/index';
import Sidebar from '../../components/Sidebar';

/* ─────────────────────────────────────────────
   MainPage  (shell / layout)
   Composes the persistent Navbar + Sidebar and
   provides the main content area for child routes.

   Layout:
   ┌──────────── Navbar (fixed top, full-width) ─────────────┐
   │ Sidebar │                                               │
   │ (fixed  │   <main> content area                        │
   │  left)  │                                               │
   └─────────┴───────────────────────────────────────────────┘

   Offset classes:
   - pt-14   → clears the 56px fixed Navbar
   - md:pl-16 → clears the 64px fixed Sidebar on desktop
   ───────────────────────────────────────────── */
export default function MainPage() {
  /* Sidebar open state – used only on mobile */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas text-text-high">

      {/* ── Fixed top Navbar ── */}
      <Navbar
        onSidebarOpen={() => setSidebarOpen(true)}
        onSearch={(q) => console.log('search:', q)} /* wire to real search later */
      />

      {/* ── Fixed left Sidebar ── */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ── Scrollable main content area ── */}
      <main
        className="pl-16 pt-14 min-h-screen"
        id="main-content"
        aria-label="Main content"
      >
        {/* Page sections will go here as child components */}
        <div className="p-6">
          <p className="text-text-medium font-mono text-xs tracking-widest uppercase">
            — ready
          </p>
        </div>
      </main>

    </div>
  );
}
