"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ShaderBackground from "@/components/shader-background"
import Header from "@/components/header"

export default function DownloadPage() {
  const browsers = [
    {
      name: "Chrome",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29L1.931 5.47zm2.25 12.58A11.943 11.943 0 0 0 12 24c6.624 0 12-5.376 12-12 0-2.09-.536-4.057-1.479-5.773l-4.4 7.616a5.454 5.454 0 0 1-7.475 2.334L4.181 18.05z" />
        </svg>
      ),
      version: "v2.1.0",
      users: "50K+",
      available: true,
    },
    {
      name: "Firefox",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
        </svg>
      ),
      version: "v2.0.8",
      users: "25K+",
      available: true,
    },
    {
      name: "Edge",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.86 7.86c-.64-4.28-4.59-7.14-9.07-6.93C7.41 1.14 2.88 6.17 3.14 11.57c.26 5.4 5.69 9.43 11.09 8.43 2.87-.53 5.24-2.65 6.33-5.43.54-1.38.3-2.17-.7-1.57z" />
        </svg>
      ),
      version: "v2.1.0",
      users: "15K+",
      available: true,
    },
    {
      name: "Safari",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      ),
      version: "Coming Soon",
      users: "—",
      available: false,
    },
  ]

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Real-time Protection",
      description: "Instant threat detection and blocking before you visit malicious sites",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Lightning Fast",
      description: "Zero impact on browsing speed with optimized threat analysis",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Privacy First",
      description: "Your browsing data stays private - we only analyze URLs, not content",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: "Detailed Analytics",
      description: "Track blocked threats and view your browsing security insights",
    },
  ]

  return (
    <ShaderBackground>
      <Header />
      <div className="min-h-screen pt-20 pb-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6">Download Privacy Shield</h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Protect yourself from malicious websites, phishing attacks, and online threats with our advanced browser
              extension.
            </p>
            <div className="flex items-center justify-center gap-4 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                100% Free
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Instant Setup
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                90K+ Users
              </div>
            </div>
          </div>

          {/* Browser Downloads */}
          <div className="mb-16">
            <h2 className="text-2xl font-light text-white text-center mb-8">Choose Your Browser</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {browsers.map((browser) => (
                <Card
                  key={browser.name}
                  className="bg-black/20 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <CardHeader className="text-center">
                    <div className="flex justify-center text-white mb-4">{browser.icon}</div>
                    <CardTitle className="text-white text-lg font-normal">{browser.name}</CardTitle>
                    <CardDescription className="text-white/60">
                      {browser.version} • {browser.users} users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {browser.available ? (
                      <Button className="w-full bg-white text-black hover:bg-white/90 font-normal">
                        Install Extension
                      </Button>
                    ) : (
                      <Button disabled className="w-full bg-white/20 text-white/60 cursor-not-allowed">
                        Coming Soon
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-light text-white text-center mb-8">Why Choose Privacy Shield?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-black/20 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-white/80 mt-1">{feature.icon}</div>
                      <div>
                        <h3 className="text-white font-normal text-lg mb-2">{feature.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Installation Steps */}
          <div className="mb-16">
            <h2 className="text-2xl font-light text-white text-center mb-8">Quick Installation</h2>
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white font-normal text-lg mb-4 mx-auto">
                    1
                  </div>
                  <h3 className="text-white font-normal mb-2">Click Install</h3>
                  <p className="text-white/60 text-sm">Choose your browser and click the install button above</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white font-normal text-lg mb-4 mx-auto">
                    2
                  </div>
                  <h3 className="text-white font-normal mb-2">Add Extension</h3>
                  <p className="text-white/60 text-sm">Confirm the installation in your browser's extension store</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white font-normal text-lg mb-4 mx-auto">
                    3
                  </div>
                  <h3 className="text-white font-normal mb-2">Stay Protected</h3>
                  <p className="text-white/60 text-sm">Browse safely with automatic threat detection and blocking</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-light text-white mb-4">Ready to Browse Safely?</h3>
                <p className="text-white/70 mb-6">
                  Join thousands of users who trust Privacy Shield to protect their online experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-black hover:bg-white/90 font-normal px-8">Install Now</Button>
                  <Link href="/register">
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 font-normal px-8 bg-transparent"
                    >
                      Create Account
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ShaderBackground>
  )
}
