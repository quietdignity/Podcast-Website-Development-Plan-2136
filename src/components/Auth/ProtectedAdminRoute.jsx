import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'
import { useAdminUser } from '../../hooks/useAdminUser.jsx'

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth()
  const { isAdmin, loading: adminLoading } = useAdminUser()

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/door" replace />
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">You don't have permission to access the admin area.</p>
          <Navigate to="/" replace />
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedAdminRoute