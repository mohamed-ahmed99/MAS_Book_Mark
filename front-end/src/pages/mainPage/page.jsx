import { useState } from 'react';
import Navbar  from '../../components/Navbar/index';
import Sidebar from '../../components/Sidebar';
import Topbar  from './Topbar';
import AddWebsiteModal from './AddWebsiteModal';

/* ─────────────────────────────────────────────
   MainPage  (shell / layout)
   Composes the persistent Navbar + Sidebar and
   provides the main content area for child routes.

   Layout:
   ┌──────────── Navbar (fixed top, full-width) ─────────────┐
   │ Sidebar │                                               │
   │ (fixed  │   <main> content area                        │
   │  left)  │   ├─ <Topbar /> (page-level actions)          │
   │         │   └─ child content / bookmark grids           │
   └─────────┴───────────────────────────────────────────────┘

   Offset classes:
   - pt-14    → clears the 56px fixed Navbar
   - md:pl-16 → clears the 64px fixed Sidebar on desktop
   ───────────────────────────────────────────── */
export default function MainPage() {
  /* Sidebar open state – used only on mobile */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  /* Add website modal open state */
  const [isAddWebsiteOpen, setIsAddWebsiteOpen] = useState(false);

  const handleAddWebsite = () => {
    setIsAddWebsiteOpen(true);
  };

  const handleWebsiteAdded = (newWebsite) => {
    console.log('Website added successfully:', newWebsite);
  };

  const handleArrange = () => {
    console.log('Arrange bookmarks triggered');
  };

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
        className="md:pl-16 pl-0 pt-14 min-h-screen flex flex-col"
        id="main-content"
        aria-label="Main content"
      >
        {/* ── First component: Page Topbar ── */}
        <Topbar
          onAddWebsite={handleAddWebsite}
          onArrange={handleArrange}
        />

        {/* Page sections will go here as child components */}
        <div className="p-4 md:p-6 flex-1">
          <p className="text-text-medium font-mono text-xs tracking-widest uppercase">
            — ready
          </p>
        </div>
      </main>

      {/* ── Add Website Modal Dialog ── */}
      <AddWebsiteModal
        isOpen={isAddWebsiteOpen}
        onClose={() => setIsAddWebsiteOpen(false)}
        onSuccess={handleWebsiteAdded}
      />

    </div>
  );
}
