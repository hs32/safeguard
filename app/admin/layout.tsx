"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { ShaderBackground } from "@/components/shader-background"
import { Header } from "@/components/header"
import { auth } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Check if user is authenticated and is admin
    if (!auth.isAuthenticated()) {
      router.push("/signin?redirect=" + pathname)
      return
    }

    if (!auth.isAdmin()) {
      router.push("/dashboard")
      return
    }

    setLoading(false)
  }, [router, pathname])

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <ShaderBackground>
          <Header />
          <div className="relative z-20 min-h-screen pt-20 pb-12 px-4 sm:px-6 flex items-center justify-center">
            <div className="text-white text-xl">Loading admin panel...</div>
          </div>
        </ShaderBackground>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <ShaderBackground>
        <div className="relative z-10 min-h-screen">
          <Header />

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          <div className="flex pt-20 lg:pt-24">
            {/* Sidebar */}
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main content */}
            <main className="flex-1 lg:ml-64">
              {/* Mobile menu button */}
              <div className="lg:hidden p-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              {/* Page content */}
              <div className="p-4 sm:p-6 lg:p-8 mt-4">{children}</div>
            </main>
          </div>
        </div>
      </ShaderBackground>
    </div>
  )
}
