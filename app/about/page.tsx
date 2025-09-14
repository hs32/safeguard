"use client"

import Header from "@/components/header"
import ShaderBackground from "@/components/shader-background"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Shield, Zap, Eye, Globe, Users, Activity } from "lucide-react"

export default function AboutPage() {
  return (
    <ShaderBackground>
      <Header />
      <div className="absolute top-24 right-6 z-10">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        >
          <a href="https://safeguard.cronitorstatus.com/" target="_blank" rel="noopener noreferrer">
            <Activity className="w-4 h-4 mr-2" />
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            System Status
          </a>
        </Button>
      </div>

      <div className="relative z-10 min-h-screen pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-white/10 border-white/20 text-white">
              Research Project
            </Badge>
            <h1 className="text-5xl md:text-6xl font-light text-white mb-6 text-balance tracking-tight">
              <span className="font-medium italic">About</span> SafeGuard
            </h1>
            <p className="text-xs font-light text-white/70 max-w-3xl mx-auto text-pretty leading-relaxed">
              A cutting-edge research project focused on real-time website threat detection and privacy protection
              through advanced browser extension technology.
            </p>
          </div>

          {/* Project Overview */}
          <Card className="mb-12 bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Shield className="w-6 h-6" />
                <span>Project Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>
                SafeGuard is an innovative browser extension that provides real-time protection against malicious
                websites, phishing attempts, spam content, and adult material. Our research focuses on developing
                advanced threat detection algorithms and user-friendly privacy protection mechanisms.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-4">
                  <h3 className="text-white font-semibold flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Key Features</span>
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Real-time website threat detection</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Advanced phishing protection</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Malware and spam blocking</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Adult content filtering</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Privacy-focused design</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-white font-semibold flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Research Areas</span>
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Machine Learning threat detection</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Real-time content analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Privacy-preserving algorithms</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Cross-browser compatibility</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>User experience optimization</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Development Team */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Development Team</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Developer 1 */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      SH
                    </div>
                    <div>
                      <CardTitle className="text-white">Shahriar Hasan</CardTitle>
                      <CardDescription className="text-white/60">Lead Developer & System Architect</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-white/80 space-y-2">
                    <p>
                      <strong>Education:</strong> Student, Department of ECE
                    </p>
                    <p>
                      <strong>University:</strong> Hajee Mohammad Danesh Science and Technology University
                    </p>
                    <p>
                      <strong>Specialization:</strong> Full-stack Development, System Design & Architecture
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <a href="https://shahriarhasan.vercel.app" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Portfolio
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <a href="https://github.com/hasanshahriar32" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Developer 2 */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      AR
                    </div>
                    <div>
                      <CardTitle className="text-white">Abid Hasan Rafi</CardTitle>
                      <CardDescription className="text-white/60">AI/ML Research Specialist</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-white/80 space-y-2">
                    <p>
                      <strong>Education:</strong> Student, Department of ECE
                    </p>
                    <p>
                      <strong>University:</strong> Hajee Mohammad Danesh Science and Technology University
                    </p>
                    <p>
                      <strong>Specialization:</strong> Machine Learning & Artificial Intelligence
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <a href="https://abid-hasan-rafi.web.app" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Portfolio
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <a href="https://github.com/abidhasanrafi" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Technology Stack */}
          <Card className="mb-12 bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Globe className="w-6 h-6" />
                <span>Technology Stack</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-3">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                      React
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                      Next.js
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                      TypeScript
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                      Tailwind CSS
                    </Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                      Node.js
                    </Badge>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                      Express
                    </Badge>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                      MongoDB
                    </Badge>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                      REST API
                    </Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Extension</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                      WebExtensions API
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                      Manifest V3
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                      Content Scripts
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Users className="w-6 h-6" />
                <span>Get in Touch</span>
              </CardTitle>
              <CardDescription className="text-white/60">
                Connect with us for collaboration, feedback, or support
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-white/80 mb-6">
                Join our community and stay updated with the latest developments, get support, and provide feedback.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <a href="https://t.me/privacy2all" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Telegram Community
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ShaderBackground>
  )
}
