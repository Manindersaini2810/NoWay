import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { ShieldAlert } from 'lucide-react'

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2F6BFF] border-t-transparent" />
          <p className="text-xs font-bold text-[#1E1E1C]/60">Verifying session...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E1E1C] text-[#2F6BFF]">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-2xl font-black text-[#1E1E1C]">Access Restricted</h2>
        <p className="mt-2 text-sm text-[#1E1E1C]/70">
          Your current account role (<strong>{user.role}</strong>) does not have permission to access this resource.
        </p>
      </div>
    )
  }

  return children
}
