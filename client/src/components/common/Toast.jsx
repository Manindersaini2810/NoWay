import { useEffect } from 'react'

const Toast = ({
  message,
  type = 'info',
  isOpen = true,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    if (!isOpen || !duration) return

    const timer = setTimeout(() => {
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [isOpen, duration, onClose])

  if (!isOpen || !message) return null

  const icons = {
    success: (
      <svg className="h-5 w-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="h-5 w-5 text-rose-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="h-5 w-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="h-5 w-5 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }

  const borderColors = {
    success: 'border-emerald-200 bg-white text-emerald-950',
    error: 'border-rose-200 bg-white text-rose-950',
    warning: 'border-amber-200 bg-white text-amber-950',
    info: 'border-teal-200 bg-white text-teal-950',
  }

  return (
    <aside
      aria-label="Notification"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl bg-white backdrop-blur-md transition-all duration-300 animate-bounce-short max-w-sm"
    >
      <div className={`p-1 rounded-full ${borderColors[type] || borderColors.info}`}>
        {icons[type] || icons.info}
      </div>
      <p className="text-sm font-medium text-gray-800 leading-snug">
        {message}
      </p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-auto text-gray-400 hover:text-gray-600 transition-colors p-1"
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </aside>
  )
}

export default Toast

