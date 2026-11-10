import { useState } from 'react'
import { Link } from 'react-router-dom'
import { KeyRound, ArrowRight, CheckCircle2 } from 'lucide-react'
import authApi from '../services/authApi'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      await authApi.forgotPassword({ email: email.trim() })
      setSubmitted(true)
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || err.message || 'Unable to process reset request.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-md rounded-3xl bg-[#EDE4D4] p-8 sm:p-10 shadow-xl border border-[#1E1E1C]/15 text-[#1E1E1C]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E1E1C] text-[#2F6BFF] shadow-md border border-[#2F6BFF]/30">
            <KeyRound size={30} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E1E1C] tracking-tight">
            Reset Password
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#1E1E1C]/70 font-medium">
            Enter your registered email address and we will dispatch a time-limited recovery link.
          </p>
        </div>

        {errorMessage && (
          <div className="mt-6 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs font-bold text-rose-800">
            {errorMessage}
          </div>
        )}

        {submitted ? (
          <div className="mt-6 space-y-6 animate-fade-in">
            <div className="rounded-2xl bg-[#1E1E1C] border border-[#2F6BFF]/40 p-5 text-xs text-[#D8CBB3] flex items-start gap-3">
              <CheckCircle2 size={18} className="text-[#2F6BFF] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-white mb-1">Recovery Link Dispatched</p>
                <p className="leading-relaxed text-[#D8CBB3]/80">
                  If an account exists for <strong>{email}</strong>, a secure password reset link has been dispatched. Please check your inbox and spam folder.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#2F6BFF] hover:underline"
              >
                <span>Return to Sign In</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="reset-email" className="block text-xs font-black uppercase tracking-wider text-[#1E1E1C]/70 mb-2">
                Account Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full rounded-xl border border-[#1E1E1C]/20 bg-white/90 px-4 py-3 text-sm font-medium text-[#1E1E1C] placeholder:text-[#1E1E1C]/40 outline-none transition-all focus:border-[#2F6BFF] focus:ring-2 focus:ring-[#2F6BFF]/20"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2F6BFF] hover:bg-[#1E55E6] text-white py-3 px-6 text-xs font-black uppercase tracking-wider shadow-md shadow-[#2F6BFF]/25 disabled:opacity-50 cursor-pointer transition-all"
            >
              {isSubmitting ? (
                <span>Dispatching Link...</span>
              ) : (
                <>
                  <span>Send Recovery Link</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>

            <div className="text-center">
              <Link to="/login" className="text-xs font-semibold text-[#1E1E1C]/60 hover:text-[#1E1E1C]">
                ← Remember your password? Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
