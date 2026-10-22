import { useState } from 'react';
import Navbar  from '../../components/Navbar/index';
import Sidebar from '../../components/Sidebar';
import Topbar  from './Topbar';
import AddWebsiteModal from './AddWebsiteModal';
import WebsitesSection from './WebsitesSection';

/* ─────────────────────────────────────────────
   MainPage  (shell / layout)
   Composes the persistent Navbar + Sidebar and
   provides the main content area for child routes.

   Layout:
   ┌──────────── Navbar (fixed top, full-width) ─────────────┐
   │ Sidebar │                                               │
   │ (fixed  │   <main> content area                        │
   │  left)  │   ├─ <Topbar /> (page-level actions)          │
   │         │   └─ <WebsitesSection /> (pinned & all sites) │
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
  /* Real-time search query from Navbar */
  const [searchQuery, setSearchQuery] = useState('');
  /* Counter to trigger re-fetch when new website is added */
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddWebsite = () => {
    setIsAddWebsiteOpen(true);
  };

  const handleWebsiteAdded = (newWebsite) => {
    console.log('Website added successfully:', newWebsite);
    // Trigger re-fetch of website list in WebsitesSection
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleArrange = () => {
    console.log('Arrange bookmarks triggered');
  };

  return (
    <div className="min-h-screen bg-canvas text-text-high">

      {/* ── Fixed top Navbar ── */}
      <Navbar
        onSidebarOpen={() => setSidebarOpen(true)}
        onSearch={(q) => setSearchQuery(q)}
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

        {/* ── Websites Section (Pinned & Regular Grid) ── */}
        <WebsitesSection
          searchQuery={searchQuery}
          onAddWebsite={handleAddWebsite}
          onClearSearch={() => setSearchQuery('')}
          refreshTrigger={refreshTrigger}
        />
        
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

