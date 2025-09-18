"use client"

import React from "react"

interface ShaderErrorBoundaryState {
  hasError: boolean
}

interface ShaderErrorBoundaryProps {
  children: React.ReactNode
  fallback: React.ReactNode
}

class ShaderErrorBoundary extends React.Component<ShaderErrorBoundaryProps, ShaderErrorBoundaryState> {
  constructor(props: ShaderErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ShaderErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("WebGL shader error caught by boundary:", error.message)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

export default ShaderErrorBoundary
