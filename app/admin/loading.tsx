import { ShaderBackground } from "@/components/shader-background"
import { Header } from "@/components/header"

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-black">
      <ShaderBackground />
      <Header />
      <div className="relative z-10 min-h-screen pt-20 pb-12 px-4 sm:px-6 flex items-center justify-center">
        <div className="text-white text-xl">Loading admin panel...</div>
      </div>
    </div>
  )
}
