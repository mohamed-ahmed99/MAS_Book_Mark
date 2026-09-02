

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  error,
}) => {

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label htmlFor={name} className="text-[12px] font-mono font-medium text-text-high uppercase tracking-widest">{label}</label>}
      
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`px-3 py-2 border rounded-sm focus:outline-none transition-colors bg-transparent text-text-high font-mono placeholder:text-text-disabled ${
          error 
            ? 'border-text-high' 
            : 'border-border hover:border-text-medium focus:border-text-high'
        }`}
      />
      {error && <span className="text-xs font-mono text-text-high mt-1">! {error}</span>}
    </div>
  );
};

export default Input;
