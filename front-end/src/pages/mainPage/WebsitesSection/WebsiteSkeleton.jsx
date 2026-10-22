import React from 'react';

/* ─────────────────────────────────────────────
   WebsiteSkeleton Component (Monolith System - App Icon Style)
   
   Renders technical minimalist loading skeleton placeholders
   matching the mobile app-icon grid layout (icon on top, label below).
   ───────────────────────────────────────────── */

export default function WebsiteSkeleton({ count = 12 }) {
  const placeholders = Array.from({ length: count }, (_, i) => i);

  return (
    <div
      className="
        grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10
        gap-x-3 gap-y-5 sm:gap-x-4 sm:gap-y-6 justify-items-center
      "
      aria-label="Loading websites..."
      role="status"
    >
      {placeholders.map((idx) => (
        <div
          key={idx}
          className="flex flex-col items-center w-full max-w-[84px] sm:max-w-[96px] animate-pulse select-none"
        >
          {/* Skeleton Icon Module (56x56 mobile, 64x64 desktop) */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-elevated/70 border border-border/50" />

          {/* Skeleton Label bar */}
          <div className="h-2.5 bg-elevated/80 rounded-xs w-12 sm:w-14 mt-2" />
          <div className="h-2 bg-elevated/40 rounded-xs w-8 mt-1" />
        </div>
      ))}
    </div>
  );
}
