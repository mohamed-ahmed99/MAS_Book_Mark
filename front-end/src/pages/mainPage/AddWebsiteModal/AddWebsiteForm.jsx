import React, { useState, useId } from 'react';
import { useFormDataMethod } from '../../../hooks/useFormDataMethod';
import Button from '../../../components/Button';
import PhotoUploadSection from './PhotoUploadSection';
import PinToggle from './PinToggle';

/* ─────────────────────────────────────────────
   Extract domain helper (replicates backend extractDomain)
   ───────────────────────────────────────────── */
function getDomainFromUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  try {
    let clean = rawUrl.trim();
    if (!/^https?:\/\//i.test(clean)) {
      clean = `https://${clean}`;
    }
    const parsed = new URL(clean);
    return parsed.hostname.replace(/^www\./i, '');
  } catch {
    return '';
  }
}

/* Format capitalized fallback title from domain */
function titleFromDomain(domain) {
  if (!domain) return '';
  const base = domain.split('.')[0] || '';
  return base.charAt(0).toUpperCase() + base.slice(1);
}

/* ─────────────────────────────────────────────
   AddWebsiteForm (Monolith System)
   ───────────────────────────────────────────── */
export default function AddWebsiteForm({ onSuccess, onCancel }) {
  const nameInputId = useId();
  const urlInputId = useId();

  // Form states
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [isPinned, setIsPinned] = useState(false);

  // Field validation error states
  const [errors, setErrors] = useState({});

  // Backend form-data hook
  const { sendFormData, loading, message, status } = useFormDataMethod();

  // Derived domain for favicon preview & backend alignment
  const derivedDomain = getDomainFromUrl(url);

  // When URL changes, optionally suggest title if name is still empty
  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrl(val);

    if (errors.url) {
      setErrors((prev) => ({ ...prev, url: undefined }));
    }

    // Auto-suggest name if user hasn't typed one yet
    const domain = getDomainFromUrl(val);
    if (!name && domain) {
      setName(titleFromDomain(domain));
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  // Validate form fields prior to submission
  const validate = () => {
    const newErrors = {};
    const trimmedName = name.trim();
    const trimmedUrl = url.trim();

    if (!trimmedName) {
      newErrors.name = 'Website name is required';
    }

    if (!trimmedUrl) {
      newErrors.url = 'Website URL is required';
    } else {
      const domain = getDomainFromUrl(trimmedUrl);
      if (!domain || !domain.includes('.')) {
        newErrors.url = 'Please enter a valid website URL (e.g. github.com)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || loading) return;

    // Normalize URL to include protocol if missing
    let finalUrl = url.trim();
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    // Construct payload for /api/v1/websites/add
    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('url', finalUrl);
    formData.append('isPinned', String(isPinned));

    if (photoFile) {
      formData.append('photo', photoFile);
    }

    const res = await sendFormData('/api/v1/websites/add', formData);

    if (res && res.success === 'success') {
      if (onSuccess) {
        onSuccess(res.data?.website);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* ── Server Error Notification ── */}
      {status === 'fail' && message && (
        <div
          role="alert"
          className="
            p-3 rounded-sm border border-border
            bg-elevated text-text-high
            font-mono text-xs flex items-start gap-2
          "
        >
          <span className="font-bold select-none">!</span>
          <span>{message}</span>
        </div>
      )}

      {/* ── Website Name Field ── */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={nameInputId}
          className="text-[11px] font-mono font-medium text-text-high uppercase tracking-widest"
        >
          Website Name <span className="text-text-medium">*</span>
        </label>
        <input
          id={nameInputId}
          name="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="e.g. GitHub"
          className={`
            w-full px-3 py-2 rounded-sm text-sm
            bg-transparent text-text-high font-mono
            border transition-colors duration-150
            placeholder:text-text-disabled focus:outline-none
            ${errors.name
              ? 'border-text-high ring-1 ring-text-high'
              : 'border-border hover:border-border-hover focus:border-text-high'
            }
          `}
        />
        {errors.name && (
          <span className="text-xs font-mono text-text-high mt-0.5">
            ! {errors.name}
          </span>
        )}
      </div>

      {/* ── Website Destination URL Field ── */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor={urlInputId}
            className="text-[11px] font-mono font-medium text-text-high uppercase tracking-widest"
          >
            Destination URL <span className="text-text-medium">*</span>
          </label>
          {derivedDomain && (
            <span className="text-[10px] font-mono text-text-disabled truncate max-w-[160px]">
              {derivedDomain}
            </span>
          )}
        </div>
        <input
          id={urlInputId}
          name="url"
          type="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://example.com"
          className={`
            w-full px-3 py-2 rounded-sm text-sm
            bg-transparent text-text-high font-mono
            border transition-colors duration-150
            placeholder:text-text-disabled focus:outline-none
            ${errors.url
              ? 'border-text-high ring-1 ring-text-high'
              : 'border-border hover:border-border-hover focus:border-text-high'
            }
          `}
        />
        {errors.url && (
          <span className="text-xs font-mono text-text-high mt-0.5">
            ! {errors.url}
          </span>
        )}
      </div>

      {/* ── Icon / Photo Upload Section ── */}
      <PhotoUploadSection
        domain={derivedDomain}
        photoFile={photoFile}
        onPhotoSelect={(file) => setPhotoFile(file)}
        onPhotoRemove={() => setPhotoFile(null)}
      />

      {/* ── Pin Website Checkbox ── */}
      <PinToggle
        isPinned={isPinned}
        onChange={(checked) => setIsPinned(checked)}
      />

      {/* ── Action Buttons using shared Button component ── */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-border mt-1">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="primary"
          isLoading={loading}
          disabled={loading}
        >
          Add Website
        </Button>
      </div>
    </form>
  );
}
