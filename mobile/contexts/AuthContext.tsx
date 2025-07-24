import React, { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  session: Session | null
  user: User | null
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('🐛 AuthContext: Initializing auth state')
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🐛 Initial session:', session ? 'Found' : 'None')
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }).catch((error) => {
      console.error('❌ Error getting initial session:', error)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🐛 Auth state changed:', event, session ? 'Session exists' : 'No session')
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    console.log('🐛 Attempting sign up for:', email)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        console.error('❌ Sign up error:', error)
      } else {
        console.log('✅ Sign up successful')
      }
      return { error }
    } catch (err) {
      console.error('❌ Sign up network error:', err)
      return { error: err }
    }
  }

  const signIn = async (email: string, password: string) => {
    console.log('🐛 Attempting sign in for:', email)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        console.error('❌ Sign in error:', error)
      } else {
        console.log('✅ Sign in successful')
      }
      return { error }
    } catch (err) {
      console.error('❌ Sign in network error:', err)
      return { error: err }
    }
  }

  const signOut = async () => {
    console.log('🐛 Attempting sign out')
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('❌ Sign out error:', error)
      } else {
        console.log('✅ Sign out successful')
      }
      return { error }
    } catch (err) {
      console.error('❌ Sign out network error:', err)
      return { error: err }
    }
  }

  const value: AuthContextType = {
    session,
    user,
    signUp,
    signIn,
    signOut,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}