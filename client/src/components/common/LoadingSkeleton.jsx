import Skeleton from './Skeleton'

export default function LoadingSkeleton({ count = 6, variant = 'card' }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-[#1E1E1C]/10 bg-[#EDE4D4]/60 p-4 space-y-4 shadow-sm"
        >
          <Skeleton variant={variant} className="w-full h-52 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton variant="text" className="w-3/4 h-5" />
            <Skeleton variant="text" className="w-1/2 h-4" />
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[#1E1E1C]/10">
            <Skeleton variant="text" className="w-1/3 h-6" />
            <Skeleton variant="text" className="w-1/4 h-4" />
          </div>
        </div>
      ))}
    </div>
  )
}
