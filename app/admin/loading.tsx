import { ShaderBackground } from "@/components/shader-background"
import { Header } from "@/components/header"

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-black">
      <ShaderBackground />
      <Header />
      <div className="relative z-10 min-h-screen pt-20 pb-12 px-4 sm:px-6">
        <div className="flex h-full">
          {/* Sidebar skeleton */}
          <div className="hidden lg:block w-64 mr-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 h-full">
              <div className="space-y-4">
                <div className="h-8 bg-white/10 rounded animate-pulse"></div>
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-10 bg-white/5 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="flex-1">
            <div className="space-y-6">
              {/* Header skeleton */}
              <div className="flex items-center justify-between">
                <div className="h-8 w-48 bg-white/10 rounded animate-pulse"></div>
                <div className="h-10 w-32 bg-white/10 rounded animate-pulse"></div>
              </div>

              {/* Stats cards skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                    <div className="space-y-3">
                      <div className="h-4 w-20 bg-white/10 rounded animate-pulse"></div>
                      <div className="h-8 w-16 bg-white/10 rounded animate-pulse"></div>
                      <div className="h-3 w-24 bg-white/10 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Content area skeleton */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="h-6 w-32 bg-white/10 rounded animate-pulse"></div>
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex space-x-4">
                        <div className="h-4 w-full bg-white/5 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-white/5 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-white/5 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Loading spinner overlay */}
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-white/40 rounded-full animate-spin animation-delay-150"></div>
                </div>
                <div className="text-white/90 font-medium">Loading Admin Panel</div>
                <div className="text-white/60 text-sm">Preparing your dashboard...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
