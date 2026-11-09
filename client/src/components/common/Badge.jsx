const Badge = ({ variant = 'default', children, className = '' }) => {
  const variantStyles = {
    sale: 'bg-[#1E1E1C] text-[#D8CBB3] border border-[#D8CBB3]/30 shadow-xs',
    lease: 'bg-[#2F6BFF] text-white shadow-sm shadow-[#2F6BFF]/25',
    verified: 'bg-[#2F6BFF]/15 text-[#2F6BFF] border border-[#2F6BFF]/30 font-bold',
    accent: 'bg-[#EDE4D4] text-[#2F6BFF] border border-[#1E1E1C]/15',
    muted: 'bg-[#EDE4D4] text-[#1E1E1C]/70 border border-[#1E1E1C]/15',
    charcoal: 'bg-[#1E1E1C] text-[#D8CBB3] border border-[#D8CBB3]/20',
    sand: 'bg-[#D8CBB3] text-[#1E1E1C] border border-[#1E1E1C]/20',
    default: 'bg-[#EDE4D4] text-[#1E1E1C] border border-[#1E1E1C]/20',
  }

  const selectedVariant = variantStyles[variant.toLowerCase()] || variantStyles.default

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${selectedVariant} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge
