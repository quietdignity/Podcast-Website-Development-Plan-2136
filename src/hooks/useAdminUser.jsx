import { useState, useEffect } from 'react'
import { useAuth } from './useAuth.jsx'
import supabase from '../lib/supabase'

export const useAdminUser = () => {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminData, setAdminData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false)
        setAdminData(null)
        setLoading(false)
        return
      }

      try {
        // Check if user is support@thedailynote.net - automatically admin
        if (user.email === 'support@thedailynote.net') {
          console.log('Support email detected - granting admin access')
          setIsAdmin(true)
          setAdminData({ role: 'admin', email: user.email })
          setLoading(false)
          return
        }

        // Check admin_users table for other users
        const { data, error } = await supabase
          .from('admin_users_daily_note_2024')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error) {
          console.log('User is not in admin table:', user.email)
          setIsAdmin(false)
          setAdminData(null)
        } else {
          console.log('User found in admin table:', user.email)
          setIsAdmin(true)
          setAdminData(data)
        }
      } catch (error) {
        console.error('Error checking admin status:', error)
        setIsAdmin(false)
        setAdminData(null)
      } finally {
        setLoading(false)
      }
    }

    checkAdminStatus()
  }, [user])

  const makeUserAdmin = async (userId, role = 'admin') => {
    try {
      const { data, error } = await supabase
        .from('admin_users_daily_note_2024')
        .insert([{
          user_id: userId,
          role: role,
          permissions: ['read', 'write', 'publish', 'delete']
        }])
        .select()

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      console.error('Error making user admin:', error)
      return { success: false, error: error.message }
    }
  }

  return {
    isAdmin,
    adminData,
    loading,
    makeUserAdmin
  }
}