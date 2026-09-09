export default function GenderSelect({ value, onChange }) {
  return (
    <div className="flex flex-col">
      <select
        name="gender"
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 text-sm border border-border hover:border-text-medium focus:border-text-high rounded-sm bg-transparent text-text-high focus:outline-none transition-colors"
      >
        <option value="" className="bg-canvas text-text-high">Gender (Optional)</option>
        <option value="Male" className="bg-canvas text-text-high">Male</option>
        <option value="Female" className="bg-canvas text-text-high">Female</option>
      </select>
    </div>
  );
}
