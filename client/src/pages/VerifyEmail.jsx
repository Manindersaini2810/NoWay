import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/useAuth'
import OTPInput from '../components/auth/OTPInput'

export default function VerifyEmail() {
  const navigate = useNavigate()
  const location = useLocation()
  const { verifyEmail, resendOTP, pendingChallenge } = useAuth()

  const email = location.state?.email || pendingChallenge?.email || ''
  const [otp, setOtp] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [cooldown, setCooldown] = useState(60)

  useEffect(() => {
    if (!email) {
      navigate('/register')
    }
  }, [email, navigate])

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return
    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [cooldown])

  const handleVerify = async (e) => {
    e.preventDefault()
    if (otp.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await verifyEmail(email, otp)
      setSuccessMessage('Email verified successfully! Redirecting to marketplace...')
      setTimeout(() => {
        navigate('/')
      }, 1200)
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || err.message || 'Verification failed. Please check the code.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = async () => {
    if (cooldown > 0) return
    setErrorMessage('')
    try {
      await resendOTP('email_verify', email)
      setSuccessMessage('A new verification code has been dispatched to your email.')
      setCooldown(60)
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || err.message || 'Failed to resend verification code.'
      )
    }
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-md rounded-3xl bg-[#EDE4D4] p-8 sm:p-10 shadow-xl border border-[#1E1E1C]/15 text-[#1E1E1C]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E1E1C] text-[#2F6BFF] shadow-md border border-[#2F6BFF]/30">
            <Mail size={30} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E1E1C] tracking-tight">
            Verify Your Email
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#1E1E1C]/70 font-medium">
            We sent a 6-digit verification code to:
          </p>
          <p className="font-black text-sm text-[#1E1E1C] mt-0.5 break-all">
            {email}
          </p>
        </div>

        {errorMessage && (
          <div className="mt-6 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs font-bold text-rose-800">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mt-6 rounded-2xl bg-[#1E1E1C] border border-[#2F6BFF]/40 p-3.5 text-xs font-bold text-[#D8CBB3] flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#2F6BFF]" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleVerify} className="mt-8 space-y-6">
          <div>
            <label className="block text-center text-xs font-black uppercase tracking-wider text-[#1E1E1C]/60 mb-3">
              Enter 6-Digit Code
            </label>
            <OTPInput value={otp} onChange={setOtp} disabled={isSubmitting} />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || otp.length !== 6}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2F6BFF] hover:bg-[#1E55E6] text-white py-3 px-6 text-xs font-black uppercase tracking-wider shadow-md shadow-[#2F6BFF]/25 disabled:opacity-50 cursor-pointer transition-all"
          >
            {isSubmitting ? (
              <span>Verifying...</span>
            ) : (
              <>
                <span>Activate Account</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[#1E1E1C]/15 text-center">
          <p className="text-xs text-[#1E1E1C]/70">
            Didn&apos;t receive the code?{' '}
            {cooldown > 0 ? (
              <span className="font-bold text-[#1E1E1C]/50">
                Resend in {cooldown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="font-black text-[#2F6BFF] hover:underline cursor-pointer"
              >
                Resend Code
              </button>
            )}
          </p>
          <div className="mt-3">
            <Link to="/register" className="text-xs font-semibold text-[#1E1E1C]/60 hover:text-[#1E1E1C]">
              ← Back to registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
