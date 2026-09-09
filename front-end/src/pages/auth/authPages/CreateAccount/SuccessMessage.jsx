export default function SuccessMessage({ successMessage }) {
  if (!successMessage) return null;
  return (
    <div className="mb-4 text-xs font-mono p-3 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>{successMessage} Redirecting to login...</span>
    </div>
  );
}
