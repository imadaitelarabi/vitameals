'use client'

import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Restaurant Profile</h1>
          <p className="text-muted-foreground">
            Manage your restaurant partner profile and business settings.
          </p>
        </div>

        <div className="bg-card text-card-foreground p-12 rounded-lg border border-border text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Still Under Development</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We&apos;re building comprehensive profile management tools for restaurant partners. 
              This section will allow you to manage your business information and settings.
            </p>
          </div>
          
          <div className="bg-accent/50 rounded-lg p-6 max-w-lg mx-auto">
            <h3 className="font-semibold text-foreground mb-2">Coming Soon:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• Restaurant information and branding</li>
              <li>• Business hours and availability settings</li>
              <li>• Contact and delivery preferences</li>
              <li>• Payment and banking information</li>
              <li>• Food safety certifications</li>
              <li>• Notification and communication preferences</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}