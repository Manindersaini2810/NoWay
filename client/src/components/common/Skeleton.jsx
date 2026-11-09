const Skeleton = ({ className = '', variant = 'rect' }) => {
  const variantStyles = {
    circle: 'rounded-full',
    text: 'h-4 rounded-md',
    rect: 'rounded-2xl',
    card: 'h-72 w-full rounded-3xl',
  }

  const selectedVariant = variantStyles[variant] || variantStyles.rect

  return (
    <div
      className={`animate-pulse bg-[#1E1E1C]/10 ${selectedVariant} ${className}`}
      aria-hidden="true"
    />
  )
}

export default Skeleton

