'use client'

import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Business Analytics</h1>
          <p className="text-muted-foreground">
            Track sales performance and customer insights for your restaurant.
          </p>
        </div>

        <div className="bg-card text-card-foreground p-12 rounded-lg border border-border text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Still Under Development</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We&apos;re creating comprehensive analytics tools for restaurant partners. 
              This dashboard will provide insights into your business performance and customer trends.
            </p>
          </div>
          
          <div className="bg-accent/50 rounded-lg p-6 max-w-lg mx-auto">
            <h3 className="font-semibold text-foreground mb-2">Coming Soon:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• Revenue and sales tracking</li>
              <li>• Popular menu item analytics</li>
              <li>• Customer demographics insights</li>
              <li>• Order volume trends and forecasting</li>
              <li>• Peak hours and scheduling analytics</li>
              <li>• Performance comparison with other partners</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}