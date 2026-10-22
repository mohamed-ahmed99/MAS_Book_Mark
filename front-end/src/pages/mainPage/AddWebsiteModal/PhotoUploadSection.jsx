import React, { useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   PhotoUploadSection (Monolith System)
   
   Handles website icon/photo selection:
   1. Live auto-fetch favicon preview from domain
   2. Drag & drop or file browse for custom image
   3. Conforms to "App Icon Module" (8px radius, elevated surface)
   ───────────────────────────────────────────── */

export default function PhotoUploadSection({
  domain,
  photoFile,
  onPhotoSelect,
  onPhotoRemove,
}) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Generate preview URL if custom file is selected
  const customPreviewUrl = photoFile ? URL.createObjectURL(photoFile) : null;

  // Auto-fetch favicon URL if domain is present and no custom file
  const autoFaviconUrl =
    domain && !customPreviewUrl
      ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
      : null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgError(false);
      onPhotoSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImgError(false);
      onPhotoSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Label and status metadata */}
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-mono font-medium text-text-high uppercase tracking-widest">
          Website Icon / Photo
        </label>
        <span className="text-[10px] font-mono text-text-disabled">
          {photoFile ? 'CUSTOM IMAGE' : domain ? 'AUTO-FETCH FAVICON' : 'OPTIONAL'}
        </span>
      </div>

      <div className="flex items-center gap-4 p-3 rounded-md border border-border bg-elevated/40">
        {/* ── App Icon Module Preview (8px radius, 64x64px) ── */}
        <div
          className="
            relative w-16 h-16 shrink-0 rounded-md
            border border-border bg-elevated
            flex items-center justify-center overflow-hidden
            transition-colors duration-150
          "
        >
          {customPreviewUrl ? (
            <img
              src={customPreviewUrl}
              alt="Custom website icon preview"
              className="w-full h-full object-cover"
            />
          ) : autoFaviconUrl && !imgError ? (
            <img
              src={autoFaviconUrl}
              alt="Auto-fetched website logo"
              className="w-8 h-8 object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Fallback generic icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-disabled"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          )}
        </div>

        {/* ── Upload & Action Info ── */}
        <div className="flex-1 min-w-0">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
            id="website-photo-upload"
          />

          {photoFile ? (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-text-high truncate max-w-[180px]">
                  {photoFile.name}
                </span>
                <span className="font-mono text-[10px] text-text-disabled">
                  {(photoFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="font-mono text-[11px] text-text-high underline hover:opacity-80 cursor-pointer"
                >
                  Change
                </button>
                <span className="text-text-disabled text-xs">/</span>
                <button
                  type="button"
                  onClick={onPhotoRemove}
                  className="font-mono text-[11px] text-text-medium hover:text-text-high cursor-pointer"
                >
                  Reset to Auto-Fetch
                </button>
              </div>
            </div>
          ) : (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`
                group cursor-pointer rounded-sm border border-dashed p-2 text-center
                transition-all duration-150 select-none
                ${isDragging
                  ? 'border-text-high bg-elevated'
                  : 'border-border hover:border-border-hover hover:bg-elevated/70'
                }
              `}
            >
              <p className="font-mono text-xs text-text-high group-hover:underline">
                Upload custom icon
              </p>
              <p className="font-mono text-[10px] text-text-disabled mt-0.5">
                Drop PNG, JPG or WebP (max 5MB)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
