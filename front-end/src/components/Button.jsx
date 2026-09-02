

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  isLoading = false
}) => {

  const baseStyles = "px-4 py-2 rounded-sm font-medium transition-colors focus:outline-none text-sm";

  const variants = {
    primary: "bg-text-high text-canvas hover:opacity-90",
    ghost: "border border-border text-text-high hover:bg-elevated focus:border-text-high",
    secondary: "bg-elevated text-text-high hover:bg-border",
    outline: "border border-border text-text-high hover:bg-elevated focus:border-text-high",
    danger: "bg-text-high text-canvas hover:opacity-90" // Simplified to monochrome per design specs
  };

  const currentVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} flex items-center justify-center ${currentVariant} ${(disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
