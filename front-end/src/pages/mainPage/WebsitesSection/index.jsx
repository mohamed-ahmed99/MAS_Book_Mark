import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useGetMethod } from '../../../hooks/useGetMethod';
import PinnedWebsitesGrid from './PinnedWebsitesGrid';
import RegularWebsitesGrid from './RegularWebsitesGrid';
import WebsiteSkeleton from './WebsiteSkeleton';
import EmptyWebsitesState from './EmptyWebsitesState';

/* ─────────────────────────────────────────────
   WebsitesSection (Monolith System)
   
   Main orchestrator for user websites dashboard:
   - Fetches from `GET /api/v1/websites/get`
   - Mobile-launcher App Icon style on all screen sizes
   - Robust loading & error handling (no infinite loops)
   - Real-time search filtering across name, domain & URL
   ───────────────────────────────────────────── */

/* Retry Icon */
const RefreshIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

export default function WebsitesSection({
  searchQuery = '',
  onAddWebsite,
  onClearSearch,
  refreshTrigger = 0,
}) {
  const { getData } = useGetMethod();

  // Local state for fetched websites & UI lifecycle
  const [pinnedWebsites, setPinnedWebsites] = useState([]);
  const [regularWebsites, setRegularWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Robust fetch function
  const fetchWebsites = useCallback(async () => {
    setLoading(true);
    setFetchError(null);

    try {
      const res = await getData('/api/v1/websites/get');
      if (res && res.success === 'success' && res.data) {
        setPinnedWebsites(res.data.pinnedWebsites || []);
        setRegularWebsites(res.data.websites || []);
      } else if (res && res.success === 'fail') {
        setFetchError(res.message || 'Failed to retrieve websites.');
      }
    } catch (err) {
      console.error('Error fetching websites:', err);
      setFetchError(err.message || 'Network error occurred while fetching websites.');
    } finally {
      setLoading(false);
    }
  }, [getData]);

  // Initial fetch on mount & re-fetch when refreshTrigger changes
  useEffect(() => {
    fetchWebsites();
  }, [fetchWebsites, refreshTrigger]);

  // Client-side search filtering helper
  const filterList = (list, query) => {
    if (!query || !query.trim()) return list;
    const q = query.trim().toLowerCase();
    return list.filter((item) => {
      const name = (item.name || '').toLowerCase();
      const domain = (item.domain || '').toLowerCase();
      const url = (item.url || '').toLowerCase();
      return name.includes(q) || domain.includes(q) || url.includes(q);
    });
  };

  // Filtered pinned and regular lists based on active search
  const filteredPinned = useMemo(
    () => filterList(pinnedWebsites, searchQuery),
    [pinnedWebsites, searchQuery]
  );

  const filteredRegular = useMemo(
    () => filterList(regularWebsites, searchQuery),
    [regularWebsites, searchQuery]
  );

  const totalRawCount = pinnedWebsites.length + regularWebsites.length;
  const totalFilteredCount = filteredPinned.length + filteredRegular.length;
  const isSearching = Boolean(searchQuery && searchQuery.trim().length > 0);

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 px-4 py-4 md:px-6 md:py-6">
      {/* ── Error Banner State ── */}
      {fetchError && !loading && (
        <div
          className="
            flex items-center justify-between gap-3 p-3.5 rounded-md
            bg-elevated border border-border text-text-high
            transition-colors duration-150
          "
          role="alert"
        >
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-mono text-xs text-text-high font-medium">
              Failed to load websites
            </span>
            <span className="font-mono text-[11px] text-text-disabled truncate">
              {fetchError}
            </span>
          </div>

          <button
            type="button"
            onClick={fetchWebsites}
            className="
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm
              border border-border text-xs font-mono text-text-high bg-canvas
              hover:border-border-hover transition-colors cursor-pointer shrink-0
            "
          >
            <RefreshIcon />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* ── Loading Skeleton State (Smartphone App-Icon Grid) ── */}
      {loading && (
        <div className="flex flex-col gap-6">
          <div className="h-4 bg-elevated/60 rounded-xs w-36 animate-pulse" />
          <WebsiteSkeleton count={12} />
        </div>
      )}

      {/* ── Empty State: Zero Bookmarks in Account ── */}
      {!loading && !fetchError && totalRawCount === 0 && (
        <EmptyWebsitesState
          isSearch={false}
          onAddWebsite={onAddWebsite}
        />
      )}

      {/* ── Empty State: Search yielded no matches ── */}
      {!loading && !fetchError && totalRawCount > 0 && totalFilteredCount === 0 && isSearching && (
        <EmptyWebsitesState
          isSearch={true}
          searchQuery={searchQuery}
          onClearSearch={onClearSearch}
        />
      )}

      {/* ── Websites Grids: Pinned & Regular (App Icon Grid) ── */}
      {!loading && !fetchError && totalFilteredCount > 0 && (
        <div className="flex flex-col gap-7 md:gap-9">
          {/* 1. Pinned Websites Grid */}
          <PinnedWebsitesGrid websites={filteredPinned} />

          {/* 2. Regular Websites Grid */}
          <RegularWebsitesGrid
            websites={filteredRegular}
            title={filteredPinned.length > 0 ? "Websites" : "All Websites"}
          />
        </div>
      )}
    </div>
  );
}
