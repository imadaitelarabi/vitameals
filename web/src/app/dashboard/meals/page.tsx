'use client'

import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function MenuItemsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Menu Items</h1>
          <p className="text-muted-foreground">
            Manage your restaurant&apos;s menu items and availability for school programs.
          </p>
        </div>

        <div className="bg-card text-card-foreground p-12 rounded-lg border border-border text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Still Under Development</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We&apos;re working hard to bring you the menu management features. 
              This page will allow you to add, edit, and manage your restaurant&apos;s menu items for school meal programs.
            </p>
          </div>
          
          <div className="bg-accent/50 rounded-lg p-6 max-w-lg mx-auto">
            <h3 className="font-semibold text-foreground mb-2">Coming Soon:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• Add and edit menu items</li>
              <li>• Set nutritional information</li>
              <li>• Manage pricing and availability</li>
              <li>• Upload food photos</li>
              <li>• Track ingredient inventory</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}