'use client'

import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Incoming Orders</h1>
          <p className="text-muted-foreground">
            View and manage orders from schools and families.
          </p>
        </div>

        <div className="bg-card text-card-foreground p-12 rounded-lg border border-border text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Still Under Development</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We&apos;re building the order management system for restaurant partners. 
              This page will help you track and fulfill orders from schools and families.
            </p>
          </div>
          
          <div className="bg-accent/50 rounded-lg p-6 max-w-lg mx-auto">
            <h3 className="font-semibold text-foreground mb-2">Coming Soon:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• View incoming orders from schools</li>
              <li>• Accept or decline order requests</li>
              <li>• Set order preparation times</li>
              <li>• Track order status and delivery</li>
              <li>• Generate invoices and receipts</li>
              <li>• Communicate with school administrators</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}