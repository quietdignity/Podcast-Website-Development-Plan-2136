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
        const { data, error } = await supabase
          .from('admin_users_daily_note_2024')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error) {
          console.log('User is not an admin')
          setIsAdmin(false)
          setAdminData(null)
        } else {
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