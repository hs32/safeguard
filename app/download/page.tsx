"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import ShaderBackground from "@/components/shader-background"
import Header from "@/components/header"
import { toast } from "@/hooks/use-toast"

interface ExtensionData {
  id: string
  buildNumber: string
  buildDescription: string
  author: string
  commitId: string
  packedExtensionUrl: string
  unpackedExtensionUrl: string
  createdAt: string
  updatedAt: string
}

export default function DownloadPage() {
  const [extensionData, setExtensionData] = useState<ExtensionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLatestExtension()
  }, [])

  const fetchLatestExtension = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://pf-backend-x6xf.onrender.com/api/v1/extensions/latest")

      if (!response.ok) {
        throw new Error("Failed to fetch extension data")
      }

      const result = await response.json()

      if (result.success && result.data) {
        setExtensionData(result.data)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (err) {
      console.error("Error fetching extension:", err)
      setError("Failed to load extension data")
      toast({
        title: "Error",
        description: "Failed to load latest extension data. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (browser: string, url: string) => {
    if (!url) {
      toast({
        title: "Download Error",
        description: "Download link not available. Please try again later.",
        variant: "destructive",
      })
      return
    }

    window.open(url, "_blank")
    toast({
      title: "Download Started",
      description: `${browser} extension download has started.`,
    })
  }

  const browsers = [
    {
      name: "Chrome",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29L1.931 5.47zm2.25 12.58A11.943 11.943 0 0 0 12 24c6.624 0 12-5.376 12-12 0-2.09-.536-4.057-1.479-5.773l-4.4 7.616a5.454 5.454 0 0 1-7.475 2.334L4.181 18.05z" />
        </svg>
      ),
      version: extensionData?.buildNumber || "Loading...",
      users: "50K+",
      available: true,
      downloadUrl: extensionData?.unpackedExtensionUrl,
      type: "unpacked",
    },
    {
      name: "Firefox",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
        </svg>
      ),
      version: extensionData?.buildNumber || "Loading...",
      users: "25K+",
      available: true,
      downloadUrl: extensionData?.unpackedExtensionUrl,
      type: "unpacked",
    },
    {
      name: "Edge",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.86 7.86c-.64-4.28-4.59-7.14-9.07-6.93C7.41 1.14 2.88 6.17 3.14 11.57c.26 5.4 5.69 9.43 11.09 8.43 2.87-.53 5.24-2.65 6.33-5.43.54-1.38.3-2.17-.7-1.57z" />
        </svg>
      ),
      version: extensionData?.buildNumber || "Loading...",
      users: "15K+",
      available: true,
      downloadUrl: extensionData?.unpackedExtensionUrl,
      type: "unpacked",
    },
    {
      name: "Vivaldi",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
        </svg>
      ),
      version: extensionData?.buildNumber || "Loading...",
      users: "5K+",
      available: true,
      downloadUrl: extensionData?.packedExtensionUrl,
      type: "packed",
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

            {extensionData && (
              <div className="mt-6 max-w-2xl mx-auto">
                <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                      <div className="flex items-center gap-2 text-white/80">
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                          Latest
                        </Badge>
                        <span>Version {extensionData.buildNumber}</span>
                      </div>
                      <div className="text-white/60 text-center sm:text-right">
                        <div>By {extensionData.author}</div>
                        <div className="text-xs">{new Date(extensionData.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    {extensionData.buildDescription && (
                      <p className="text-white/70 text-xs mt-2 text-center">{extensionData.buildDescription}</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Error Alert */}
          {error && (
            <Alert className="mb-8 bg-red-500/20 border-red-500/30 text-red-400">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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
                    {browser.available && !loading ? (
                      <Button
                        className="w-full bg-white text-black hover:bg-white/90 font-normal"
                        onClick={() => handleDownload(browser.name, browser.downloadUrl || "")}
                        disabled={!browser.downloadUrl}
                      >
                        Download Extension
                      </Button>
                    ) : loading ? (
                      <Button disabled className="w-full bg-white/20 text-white/60 cursor-not-allowed">
                        Loading...
                      </Button>
                    ) : (
                      <Button disabled className="w-full bg-white/20 text-white/60 cursor-not-allowed">
                        Unavailable
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-light text-white text-center mb-8">Installation Instructions</h2>

            {/* Vivaldi Instructions */}
            <Card className="bg-black/20 backdrop-blur-sm border-white/10 mb-6">
              <CardHeader>
                <CardTitle className="text-white text-lg font-normal flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
                  </svg>
                  Vivaldi Browser
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-blue-500/20 border-blue-500/30 text-blue-400">
                  <AlertDescription>
                    Don't have Vivaldi? Download it from{" "}
                    <a
                      href="https://vivaldi.com/download/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-300"
                    >
                      https://vivaldi.com/download/
                    </a>
                  </AlertDescription>
                </Alert>
                <div className="text-white/80 space-y-2">
                  <p className="font-medium">Installation Steps:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-white/70 ml-4">
                    <li>Download the packed extension using the button above</li>
                    <li>Extract/unzip the downloaded file to a folder</li>
                    <li>
                      Open Vivaldi and press{" "}
                      <kbd className="bg-white/10 px-2 py-1 rounded text-xs">Ctrl + Shift + E</kbd> to open extensions
                      page
                    </li>
                    <li>Drag and drop the extracted extension folder onto the extensions page</li>
                    <li>The extension will be installed automatically</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Chrome, Firefox, Edge Instructions */}
            <Card className="bg-black/20 backdrop-blur-sm border-white/10 mb-6">
              <CardHeader>
                <CardTitle className="text-white text-lg font-normal">Chrome, Firefox & Edge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-white/80 space-y-2">
                  <p className="font-medium">Installation Steps:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-white/70 ml-4">
                    <li>Download the unpacked extension using the button above</li>
                    <li>Extract/unzip the downloaded file to a folder</li>
                    <li>
                      Open your browser's extension page:
                      <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                        <li>
                          <strong>Chrome:</strong> Go to{" "}
                          <code className="bg-white/10 px-1 rounded">chrome://extensions/</code>
                        </li>
                        <li>
                          <strong>Firefox:</strong> Go to{" "}
                          <code className="bg-white/10 px-1 rounded">about:debugging#/runtime/this-firefox</code>
                        </li>
                        <li>
                          <strong>Edge:</strong> Go to{" "}
                          <code className="bg-white/10 px-1 rounded">edge://extensions/</code>
                        </li>
                      </ul>
                    </li>
                    <li>Enable "Developer mode" (Chrome/Edge) or click "Load Temporary Add-on" (Firefox)</li>
                    <li>Click "Load unpacked" and select the extracted extension folder</li>
                    <li>The extension will be installed and ready to use</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-light text-white text-center mb-8">Past Extensions & Alternative Download</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Past Extensions */}
              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg font-normal">Download Past Versions</CardTitle>
                  <CardDescription className="text-white/60">
                    Access previous extension builds and versions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm mb-4">
                    Need an older version? You can download past extension builds along with the latest version.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                    onClick={() => {
                      // This could be expanded to show a modal with past versions
                      toast({
                        title: "Coming Soon",
                        description: "Past versions archive will be available soon.",
                      })
                    }}
                  >
                    Browse Past Versions
                  </Button>
                </CardContent>
              </Card>

              {/* Telegram Fallback */}
              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg font-normal">Alternative Download</CardTitle>
                  <CardDescription className="text-white/60">
                    Having trouble downloading from this site?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm mb-4">
                    If you're experiencing issues downloading from this website, you can get the extension from our
                    Telegram channel.
                  </p>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.open("https://t.me/privacy2all/1", "_blank")}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.58 7.44c-.12.539-.432.672-.864.42l-2.388-1.764-1.152 1.116c-.128.128-.236.236-.48.236l.168-2.388L16.8 8.424c.204-.18-.048-.288-.312-.108L10.2 12.132l-2.364-.744c-.516-.156-.528-.516.108-.768L16.668 7.2c.432-.156.804.108.66.72z" />
                    </svg>
                    Download from Telegram
                  </Button>
                </CardContent>
              </Card>
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

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-light text-white mb-4">Ready to Browse Safely?</h3>
                <p className="text-white/70 mb-6">
                  Join thousands of users who trust Privacy Shield to protect their online experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-white text-black hover:bg-white/90 font-normal px-8"
                    onClick={() => {
                      const firstAvailableBrowser = browsers.find((b) => b.available && b.downloadUrl)
                      if (firstAvailableBrowser) {
                        handleDownload(firstAvailableBrowser.name, firstAvailableBrowser.downloadUrl!)
                      }
                    }}
                    disabled={loading || !browsers.some((b) => b.available && b.downloadUrl)}
                  >
                    Install Now
                  </Button>
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
