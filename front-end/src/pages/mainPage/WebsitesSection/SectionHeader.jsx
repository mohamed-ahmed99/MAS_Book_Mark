import React from 'react';

/* ─────────────────────────────────────────────
   SectionHeader Component (Monolith System)
   
   A technical minimalist section header for bookmark groups.
   Conforms to DESIGN.md specifications:
   - Typography: JetBrains Mono 12px (label-md), uppercase, 0.05em letter spacing
   - Surface & Borders: Subtle border divider, monochrome value contrast
   - Responsive: Clean flex alignment across mobile & desktop
   ───────────────────────────────────────────── */

export default function SectionHeader({
  title,
  count = 0,
  icon: Icon,
  badgeText = null,
  action = null,
}) {
  return (
    <div
      className="
        flex items-center justify-between gap-3
        pb-2.5 mb-3 border-b border-border/70
        select-none transition-colors duration-150
      "
      role="heading"
      aria-level={2}
    >
      {/* ── Left side: Icon, Title & Counter ── */}
      <div className="flex items-center gap-2.5 min-w-0">
        {Icon && (
          <span className="shrink-0 text-text-medium" aria-hidden="true">
            <Icon className="w-3.5 h-3.5" />
          </span>
        )}

        {/* Monospace section title */}
        <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-text-high truncate">
          {title}
        </h2>

        {/* Technical count badge */}
        <span
          className="
            inline-flex items-center justify-center
            h-4.5 px-1.5 rounded-sm
            bg-elevated border border-border
            font-mono text-[10px] text-text-disabled font-medium
            transition-colors duration-150
          "
          aria-label={`${count} items`}
        >
          {count}
        </span>

        {badgeText && (
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-widest text-text-disabled">
            • {badgeText}
          </span>
        )}
      </div>

      {/* ── Right side: Optional action slot ── */}
      {action && (
        <div className="shrink-0 flex items-center">
          {action}
        </div>
      )}
    </div>
  );
}
