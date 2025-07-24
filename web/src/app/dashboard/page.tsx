'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
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

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Vitameals Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Welcome, {user.user_metadata?.display_name || user.email}</span>
            <button
              onClick={handleSignOut}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your children&apos;s school meals, view upcoming orders, and track nutrition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card text-card-foreground p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Upcoming Meals</h3>
            <p className="text-muted-foreground">View and manage scheduled meals for this week.</p>
            <button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg font-medium transition-colors">
              View Meals
            </button>
          </div>

          <div className="bg-card text-card-foreground p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Order History</h3>
            <p className="text-muted-foreground">Check your previous meal orders and receipts.</p>
            <button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg font-medium transition-colors">
              View History
            </button>
          </div>

          <div className="bg-card text-card-foreground p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">Nutrition Tracking</h3>
            <p className="text-muted-foreground">Monitor nutritional intake and dietary preferences.</p>
            <button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg font-medium transition-colors">
              View Nutrition
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}