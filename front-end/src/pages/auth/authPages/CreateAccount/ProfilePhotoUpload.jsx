export default function ProfilePhotoUpload({ previewUrl, handleFileChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-text-medium font-mono">Profile Photo (Optional)</label>
      <div className="flex items-center gap-3">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="w-12 h-12 rounded-full object-cover border border-border shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-canvas border border-border flex items-center justify-center text-text-disabled shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}

        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleFileChange}
          className="text-xs text-text-high file:mr-3 file:py-1.5 file:px-3 file:rounded-sm file:border file:border-border file:text-xs file:font-mono file:bg-canvas file:text-text-high hover:file:border-text-medium cursor-pointer"
        />
      </div>
    </div>
  );
}
