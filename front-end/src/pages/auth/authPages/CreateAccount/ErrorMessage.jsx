export default function ErrorMessage({ displayError }) {
  if (!displayError) return null;
  return (
    <div className="mb-4 text-xs font-mono p-3 rounded border border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" />
        <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" />
      </svg>
      <span>{displayError}</span>
    </div>
  );
}
