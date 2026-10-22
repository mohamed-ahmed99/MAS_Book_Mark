import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AddWebsiteForm from './AddWebsiteForm';

/* ─────────────────────────────────────────────
   AddWebsiteModal (Monolith System)
   
   High-precision modal dialog for creating a new website bookmark.
   - Smooth mechanical animation via Framer Motion
   - Responsive (bottom-sheet behavior on mobile, centered dialog on desktop)
   - Strict monochrome design tokens matching DESIGN.md
   ───────────────────────────────────────────── */

export default function AddWebsiteModal({ isOpen, onClose, onSuccess }) {
  // Dismiss on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSuccess = (website) => {
    if (onSuccess) {
      onSuccess(website);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-add-website-title"
        >
          {/* ── Backdrop Overlay ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* ── Modal Dialog Container ── */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="
              relative w-full max-w-lg z-10
              bg-canvas border border-border sm:rounded-lg rounded-t-lg
              shadow-2xl overflow-hidden flex flex-col
              max-h-[92vh] sm:max-h-[85vh]
            "
          >
            {/* ── Architectural Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-canvas">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-mono text-text-disabled tracking-widest uppercase">
                  SYS.BOOKMARK // NEW_ENTRY
                </span>
                <h2
                  id="modal-add-website-title"
                  className="text-base sm:text-lg font-semibold text-text-high tracking-tight"
                >
                  Add Website
                </h2>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="
                  w-8 h-8 rounded-sm border border-border
                  flex items-center justify-center text-text-medium
                  hover:text-text-high hover:border-border-hover hover:bg-elevated
                  active:scale-[0.96] transition-all duration-150 cursor-pointer
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── Scrollable Body with Form ── */}
            <div className="p-5 sm:p-6 overflow-y-auto modal-scrollbar">
              <AddWebsiteForm onSuccess={handleSuccess} onCancel={onClose} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
