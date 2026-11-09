const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null

  const pages = []
  const maxVisiblePages = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className="flex items-center justify-center gap-2 py-6">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="inline-flex h-10 px-3 items-center justify-center rounded-xl border border-[#1E1E1C]/20 bg-[#EDE4D4] text-xs font-bold text-[#1E1E1C] hover:bg-white hover:text-[#2F6BFF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <span className="sr-only">Previous</span>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {startPage > 1 && (
        <>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            className="h-10 w-10 rounded-xl border border-[#1E1E1C]/20 bg-[#EDE4D4] text-xs font-bold text-[#1E1E1C] hover:bg-white hover:text-[#2F6BFF] transition-colors cursor-pointer"
          >
            1
          </button>
          {startPage > 2 && <span className="px-1 text-[#1E1E1C]/50">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`h-10 min-w-10 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            currentPage === page
              ? 'bg-[#2F6BFF] text-white shadow-md shadow-[#2F6BFF]/25 border border-[#2F6BFF]'
              : 'border border-[#1E1E1C]/20 bg-[#EDE4D4] text-[#1E1E1C] hover:bg-white hover:text-[#2F6BFF]'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-1 text-[#1E1E1C]/50">...</span>}
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className="h-10 w-10 rounded-xl border border-[#1E1E1C]/20 bg-[#EDE4D4] text-xs font-bold text-[#1E1E1C] hover:bg-white hover:text-[#2F6BFF] transition-colors cursor-pointer"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="inline-flex h-10 px-3 items-center justify-center rounded-xl border border-[#1E1E1C]/20 bg-[#EDE4D4] text-xs font-bold text-[#1E1E1C] hover:bg-white hover:text-[#2F6BFF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <span className="sr-only">Next</span>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
