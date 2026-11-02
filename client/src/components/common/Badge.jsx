const Badge = ({ variant = 'default', children, className = '' }) => {
  const variantStyles = {
    sale: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    lease: 'bg-sky-50 text-sky-700 border border-sky-200/80',
    verified: 'bg-teal-50 text-teal-700 border border-teal-200/80 font-medium',
    accent: 'bg-amber-50 text-amber-700 border border-amber-200/80',
    muted: 'bg-gray-100 text-gray-600 border border-gray-200',
    default: 'bg-slate-100 text-slate-800 border border-slate-200',
  }

  const selectedVariant = variantStyles[variant.toLowerCase()] || variantStyles.default

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${selectedVariant} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge

