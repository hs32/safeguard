import { ShaderBackground } from "@/components/shader-background"

export default function Loading() {
  return (
    <ShaderBackground>
      <div className="relative z-10 min-h-screen pt-20 pb-12 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/80">Loading profile...</p>
        </div>
      </div>
    </ShaderBackground>
  )
}
