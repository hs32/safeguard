"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import ShaderErrorBoundary from "./shader-error-boundary"

const MeshGradient = dynamic(() => import("@paper-design/shaders-react").then((mod) => mod.MeshGradient), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-black via-purple-900/20 to-black" />
  ),
})

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const checkWebGLSupport = () => {
      try {
        if (typeof window === "undefined") return false

        const canvas = document.createElement("canvas")
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

        if (!gl) return false

        // Test if WebGL context is working
        const supported = gl.getParameter(gl.VERSION) !== null
        canvas.remove()
        return supported
      } catch (e) {
        console.warn("WebGL detection failed:", e)
        return false
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.includes("Paper Shaders") || event.reason?.message?.includes("WebGL")) {
        console.warn("WebGL shader error caught globally, using fallback")
        setWebglSupported(false)
        event.preventDefault()
      }
    }

    window.addEventListener("unhandledrejection", handleUnhandledRejection)
    setWebglSupported(checkWebGLSupport())

    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  const FallbackBackground = () => (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-black via-purple-900/20 to-black" />
  )

  const ShaderComponent = () => {
    if (!mounted || webglSupported === null) {
      return <FallbackBackground />
    }

    if (!webglSupported) {
      return <FallbackBackground />
    }

    return (
      <ShaderErrorBoundary fallback={<FallbackBackground />}>
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#000000", "#8b5cf6", "#ffffff", "#1e1b4b", "#4c1d95"]}
          speed={0.3}
          backgroundColor="#000000"
          onError={() => setWebglSupported(false)}
        />
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-60"
          colors={["#000000", "#ffffff", "#8b5cf6", "#000000"]}
          speed={0.2}
          wireframe="true"
          backgroundColor="transparent"
          onError={() => setWebglSupported(false)}
        />
      </ShaderErrorBoundary>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders with comprehensive error handling */}
      <ShaderComponent />

      {children}
    </div>
  )
}

export { ShaderBackground }
