'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.user_metadata?.display_name || 'Partner'}!
          </h1>
          <p className="text-muted-foreground">
            Your restaurant partner dashboard for managing school meal programs.
          </p>
        </div>

        <div className="bg-card text-card-foreground p-12 rounded-lg border border-border text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Restaurant Partner Dashboard Coming Soon</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We&apos;re building a comprehensive dashboard for restaurant partners. This will be your central hub for managing school meal programs and growing your business.
            </p>
          </div>
          
          <div className="bg-accent/50 rounded-lg p-6 max-w-lg mx-auto">
            <h3 className="font-semibold text-foreground mb-2">Coming Soon:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• Real-time order notifications and management</li>
              <li>• Revenue tracking and business analytics</li>
              <li>• Menu item performance insights</li>
              <li>• School partnership management</li>
              <li>• Automated invoicing and payments</li>
              <li>• Customer feedback and ratings</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}