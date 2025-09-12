"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import ShaderBackground from "@/components/shader-background"
import Header from "@/components/header"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d")

  // Mock data - in real app this would come from API
  const stats = {
    totalSites: 1247,
    blockedThreats: 23,
    safeVisits: 1224,
    protectionRate: 98.2,
  }

  const recentActivity = [
    {
      url: "malicious-site.com",
      status: "blocked",
      threat: "Malware",
      time: "2 minutes ago",
      severity: "high",
    },
    {
      url: "shopping-site.com",
      status: "safe",
      threat: null,
      time: "5 minutes ago",
      severity: null,
    },
    {
      url: "phishing-attempt.net",
      status: "blocked",
      threat: "Phishing",
      time: "12 minutes ago",
      severity: "critical",
    },
    {
      url: "news-website.com",
      status: "safe",
      threat: null,
      time: "18 minutes ago",
      severity: null,
    },
    {
      url: "suspicious-download.org",
      status: "blocked",
      threat: "Suspicious",
      time: "25 minutes ago",
      severity: "medium",
    },
  ]

  const threatBreakdown = [
    { type: "Malware", count: 8, color: "bg-red-500" },
    { type: "Phishing", count: 6, color: "bg-orange-500" },
    { type: "Spam", count: 4, color: "bg-yellow-500" },
    { type: "Adult Content", count: 3, color: "bg-purple-500" },
    { type: "Suspicious", count: 2, color: "bg-blue-500" },
  ]

  const getStatusIcon = (status: string) => {
    if (status === "blocked") {
      return (
        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
          />
        </svg>
      )
    }
    return (
      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    )
  }

  const getSeverityColor = (severity: string | null) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      default:
        return "bg-green-500"
    }
  }

  return (
    <ShaderBackground>
      <Header />
      <div className="relative z-10 min-h-screen pt-20 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-light text-white mb-2">Privacy Dashboard</h1>
              <p className="text-white/60 text-sm sm:text-base">Monitor your browsing security and protection status</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full sm:w-auto bg-black/20 border border-white/20 text-white text-sm rounded-lg px-3 py-2 backdrop-blur-sm"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>
              <Link href="/blocked-sites" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-white text-black hover:bg-white/90 font-normal text-sm">
                  Manage Blocked Sites
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-xs sm:text-sm">Total Sites Visited</p>
                    <p className="text-xl sm:text-2xl font-light text-white">{stats.totalSites.toLocaleString()}</p>
                  </div>
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-white/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-xs sm:text-sm">Threats Blocked</p>
                    <p className="text-xl sm:text-2xl font-light text-white">{stats.blockedThreats}</p>
                  </div>
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-xs sm:text-sm">Safe Visits</p>
                    <p className="text-xl sm:text-2xl font-light text-white">{stats.safeVisits.toLocaleString()}</p>
                  </div>
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-xs sm:text-sm">Protection Rate</p>
                    <p className="text-xl sm:text-2xl font-light text-white">{stats.protectionRate}%</p>
                  </div>
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="activity" className="space-y-6">
            <div className="overflow-x-auto">
              <TabsList className="bg-black/20 backdrop-blur-sm border-white/10 w-full sm:w-auto">
                <TabsTrigger
                  value="activity"
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-xs sm:text-sm"
                >
                  Recent Activity
                </TabsTrigger>
                <TabsTrigger
                  value="threats"
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-xs sm:text-sm"
                >
                  Threat Analysis
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-xs sm:text-sm"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="activity">
              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-white font-normal text-lg sm:text-xl">Recent Browsing Activity</CardTitle>
                  <CardDescription className="text-white/60 text-sm">
                    Your latest website visits and security status
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10 gap-3 sm:gap-4"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                          {getStatusIcon(activity.status)}
                          <div className="min-w-0 flex-1">
                            <p className="text-white font-medium text-sm truncate">{activity.url}</p>
                            <p className="text-white/60 text-xs">{activity.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          {activity.threat && (
                            <Badge
                              variant="secondary"
                              className={`${getSeverityColor(activity.severity)} text-white border-0 text-xs`}
                            >
                              {activity.threat}
                            </Badge>
                          )}
                          <Badge
                            variant={activity.status === "blocked" ? "destructive" : "default"}
                            className={
                              activity.status === "blocked"
                                ? "bg-red-500/20 text-red-400 border-red-500/30 text-xs"
                                : "bg-green-500/20 text-green-400 border-green-500/30 text-xs"
                            }
                          >
                            {activity.status === "blocked" ? "Blocked" : "Safe"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="threats">
              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-white font-normal text-lg sm:text-xl">Threat Breakdown</CardTitle>
                  <CardDescription className="text-white/60 text-sm">
                    Analysis of blocked threats by category
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    {threatBreakdown.map((threat, index) => (
                      <div key={index} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className={`w-3 h-3 rounded-full ${threat.color} flex-shrink-0`} />
                          <span className="text-white text-sm truncate">{threat.type}</span>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                          <div className="w-16 sm:w-32 bg-white/10 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${threat.color}`}
                              style={{ width: `${(threat.count / 23) * 100}%` }}
                            />
                          </div>
                          <span className="text-white/60 text-sm w-6 sm:w-8 text-right">{threat.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-white font-normal text-lg sm:text-xl">Account Settings</CardTitle>
                  <CardDescription className="text-white/60 text-sm">
                    Manage your privacy preferences and account
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex-1">
                      <h3 className="text-white font-normal">Real-time Protection</h3>
                      <p className="text-white/60 text-sm">Block threats as you browse</p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent text-sm"
                    >
                      Enabled
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex-1">
                      <h3 className="text-white font-normal">Activity Logging</h3>
                      <p className="text-white/60 text-sm">Keep history of visited sites</p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent text-sm"
                    >
                      Enabled
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex-1">
                      <h3 className="text-white font-normal">Notifications</h3>
                      <p className="text-white/60 text-sm">Alert when threats are blocked</p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent text-sm"
                    >
                      Enabled
                    </Button>
                  </div>
                  <hr className="border-white/10" />
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button className="bg-white text-black hover:bg-white/90 font-normal text-sm">Save Changes</Button>
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent text-sm"
                    >
                      Export Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ShaderBackground>
  )
}
