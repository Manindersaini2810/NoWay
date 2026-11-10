import { Check, X } from 'lucide-react'

export default function PasswordStrength({ password = '' }) {
  if (!password) return null

  const checks = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter (A-Z)', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter (a-z)', met: /[a-z]/.test(password) },
    { label: 'One number (0-9)', met: /\d/.test(password) },
    { label: 'One special symbol (!@#$%^&*)', met: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) },
  ]

  const score = checks.filter((c) => c.met).length

  let strengthLabel = 'Weak'
  let barColor = 'bg-rose-500'
  let textColor = 'text-rose-600'

  if (score >= 5) {
    strengthLabel = 'Strong'
    barColor = 'bg-[#2F6BFF]'
    textColor = 'text-[#2F6BFF]'
  } else if (score >= 3) {
    strengthLabel = 'Medium'
    barColor = 'bg-amber-500'
    textColor = 'text-amber-600'
  }

  return (
    <div className="space-y-3 pt-2">
      {/* Strength Bar */}
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="text-[#1E1E1C]/60 uppercase tracking-wider text-[10px]">
          Password Strength
        </span>
        <span className={`font-black ${textColor}`}>{strengthLabel}</span>
      </div>

      <div className="grid grid-cols-5 gap-1.5 h-1.5 w-full bg-[#1E1E1C]/10 rounded-full overflow-hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`h-full rounded-full transition-all duration-300 ${
              index < score ? barColor : 'bg-transparent'
            }`}
          />
        ))}
      </div>

      {/* Requirement Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px]">
        {checks.map((req, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-1.5 ${
              req.met ? 'text-[#1E1E1C] font-semibold' : 'text-[#1E1E1C]/40'
            }`}
          >
            {req.met ? (
              <Check size={13} className="text-[#2F6BFF] flex-shrink-0" />
            ) : (
              <X size={13} className="text-[#1E1E1C]/30 flex-shrink-0" />
            )}
            <span>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
