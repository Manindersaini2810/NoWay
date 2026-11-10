import { useRef, useEffect } from 'react'

export default function OTPInput({ value = '', onChange, length = 6, disabled = false }) {
  const inputsRef = useRef([])

  const digits = value.padEnd(length, ' ').slice(0, length).split('')

  useEffect(() => {
    // Focus first input automatically on mount
    if (inputsRef.current[0] && !disabled) {
      inputsRef.current[0].focus()
    }
  }, [disabled])

  const handleInputChange = (e, index) => {
    const val = e.target.value
    // Take only the last character entered
    const char = val.slice(-1)

    if (!/^\d*$/.test(char)) return

    const newDigits = [...digits]
    newDigits[index] = char || ''
    const combined = newDigits.join('').trim()
    onChange(combined)

    // Advance focus if a digit was typed
    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!digits[index] || digits[index] === ' ') {
        if (index > 0) {
          inputsRef.current[index - 1]?.focus()
        }
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    if (/^\d+$/.test(pastedData)) {
      const sliced = pastedData.slice(0, length)
      onChange(sliced)
      const nextIndex = Math.min(sliced.length, length - 1)
      inputsRef.current[nextIndex]?.focus()
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => {
        const val = digits[index] && digits[index] !== ' ' ? digits[index] : ''
        return (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={val}
            disabled={disabled}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl border-2 border-[#1E1E1C]/20 bg-white text-center text-xl sm:text-2xl font-black text-[#1E1E1C] outline-none transition-all focus:border-[#2F6BFF] focus:ring-4 focus:ring-[#2F6BFF]/20 disabled:opacity-50"
            aria-label={`Digit ${index + 1}`}
          />
        )
      })}
    </div>
  )
}
