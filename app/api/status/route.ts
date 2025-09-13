import { NextResponse } from "next/server"

export async function GET() {
  try {
    const startTime = Date.now()

    // Check backend connectivity
    let backendStatus = "unknown"
    let backendResponseTime = 0

    try {
      const backendStart = Date.now()
      const backendResponse = await fetch("https://pf-backend-x6xf.onrender.com/health", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(5000),
      })

      backendResponseTime = Date.now() - backendStart
      backendStatus = backendResponse.ok ? "healthy" : "unhealthy"
    } catch (error) {
      backendStatus = "unreachable"
      console.error("[v0] Backend health check failed:", error)
    }

    const responseTime = Date.now() - startTime

    const status = {
      service: "safeguard-frontend",
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      responseTime: `${responseTime}ms`,
      backend: {
        status: backendStatus,
        url: "https://pf-backend-x6xf.onrender.com/health",
        responseTime: `${backendResponseTime}ms`,
      },
      checks: {
        frontend: "healthy",
        backend: backendStatus,
        overall: backendStatus === "healthy" ? "healthy" : "degraded",
      },
    }

    return NextResponse.json(status, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("[v0] Status endpoint error:", error)

    return NextResponse.json(
      {
        service: "safeguard-frontend",
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Internal server error",
        checks: {
          frontend: "unhealthy",
          backend: "unknown",
          overall: "unhealthy",
        },
      },
      { status: 500 },
    )
  }
}
