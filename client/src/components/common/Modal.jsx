import { useEffect } from 'react'

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-[#1E1E1C]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative w-full ${maxWidth} rounded-3xl bg-[#EDE4D4] p-6 sm:p-8 shadow-2xl border border-[#1E1E1C]/15 z-10 transition-all transform duration-300 scale-100 max-h-[90vh] overflow-y-auto text-[#1E1E1C]`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#1E1E1C]/15">
          {title && (
            <h3 className="text-xl font-bold text-[#1E1E1C] tracking-tight">
              {title}
            </h3>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full text-[#1E1E1C]/60 hover:text-[#1E1E1C] hover:bg-[#1E1E1C]/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

export default Modal

