'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
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

  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="flex items-center justify-center min-h-screen px-6 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
              Partner with{" "}
              <span className="text-primary">Vitameals</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our platform to provide healthy, nutritious meals to schools and families. 
              Expand your restaurant&apos;s reach and impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/auth/register"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block"
              >
                Become a Partner
              </Link>
              
              <Link 
                href="/auth/login"
                className="border border-border text-foreground hover:bg-accent px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block"
              >
                Partner Login
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
