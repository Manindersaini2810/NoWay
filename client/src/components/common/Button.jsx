export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-xl gap-1.5',
    md: 'text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl gap-2',
    lg: 'text-sm font-black uppercase tracking-wider px-7 py-3 rounded-2xl gap-2.5',
  }

  const variantStyles = {
    primary:
      'bg-[#2F6BFF] hover:bg-[#1E55E6] text-white shadow-md shadow-[#2F6BFF]/25 border border-[#2F6BFF]',
    secondary:
      'bg-[#1E1E1C] hover:bg-[#2A2A27] text-[#D8CBB3] shadow-md border border-[#D8CBB3]/20',
    sand:
      'bg-[#D8CBB3] hover:bg-[#C8BA9F] text-[#1E1E1C] shadow-sm border border-[#1E1E1C]/15',
    outline:
      'bg-transparent hover:bg-[#1E1E1C]/10 text-[#1E1E1C] border border-[#1E1E1C]/25',
    ghost:
      'bg-transparent hover:bg-[#1E1E1C]/5 text-[#1E1E1C] border-transparent',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
