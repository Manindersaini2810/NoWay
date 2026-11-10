import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Lock, CheckCircle2, ArrowRight } from 'lucide-react'
import authApi from '../services/authApi'
import PasswordInput from '../components/auth/PasswordInput'
import PasswordStrength from '../components/auth/PasswordStrength'

export default function ResetPassword() {
  const navigate = useNavigate()
  const location = useLocation()
  const query = new URLSearchParams(location.search)

  const token = query.get('token') || ''
  const email = query.get('email') || ''

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both fields.')
      return
    }

    setIsSubmitting(true)

    try {
      await authApi.resetPassword({
        email,
        token,
        newPassword,
        confirmPassword,
      })

      setSuccessMessage('Your password has been reset successfully. Redirecting to sign in...')
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || err.message || 'Failed to reset password. Link may be expired.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!token || !email) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <div className="rounded-3xl bg-[#EDE4D4] p-8 border border-[#1E1E1C]/15 text-[#1E1E1C]">
          <h2 className="text-xl font-black">Invalid Reset Link</h2>
          <p className="mt-2 text-xs text-[#1E1E1C]/70">
            This password recovery link is missing required verification parameters.
          </p>
          <div className="mt-6">
            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#2F6BFF] hover:underline"
            >
              Request a new password reset link →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-md rounded-3xl bg-[#EDE4D4] p-8 sm:p-10 shadow-xl border border-[#1E1E1C]/15 text-[#1E1E1C]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E1E1C] text-[#2F6BFF] shadow-md border border-[#2F6BFF]/30">
            <Lock size={30} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E1E1C] tracking-tight">
            Create New Password
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#1E1E1C]/70 font-medium">
            Resetting password for: <strong>{email}</strong>
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

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#1E1E1C]/70 mb-1.5">
              New Password
            </label>
            <PasswordInput
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter at least 8 characters"
            />
            <PasswordStrength password={newPassword} />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#1E1E1C]/70 mb-1.5">
              Confirm New Password
            </label>
            <PasswordInput
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
            />
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="mt-1 text-[11px] font-bold text-rose-600">
                Passwords do not match
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !newPassword || newPassword !== confirmPassword}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2F6BFF] hover:bg-[#1E55E6] text-white py-3 px-6 text-xs font-black uppercase tracking-wider shadow-md shadow-[#2F6BFF]/25 disabled:opacity-50 cursor-pointer transition-all mt-6"
          >
            {isSubmitting ? (
              <span>Updating Password...</span>
            ) : (
              <>
                <span>Save New Password</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
