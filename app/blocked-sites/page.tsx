"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ShaderBackground from "@/components/shader-background"
import Header from "@/components/header"

export default function BlockedSitesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [newSiteUrl, setNewSiteUrl] = useState("")

  // Mock data - in real app this would come from API
  const blockedSites = [
    {
      url: "malicious-site.com",
      category: "Malware",
      blockedDate: "2024-01-15",
      threatLevel: "Critical",
      autoBlocked: true,
      description: "Known malware distribution site",
    },
    {
      url: "phishing-bank.net",
      category: "Phishing",
      blockedDate: "2024-01-14",
      threatLevel: "High",
      autoBlocked: true,
      description: "Fake banking site attempting credential theft",
    },
    {
      url: "spam-ads.org",
      category: "Spam",
      blockedDate: "2024-01-13",
      threatLevel: "Medium",
      autoBlocked: true,
      description: "Aggressive advertising and popup spam",
    },
    {
      url: "inappropriate-content.xxx",
      category: "Adult",
      blockedDate: "2024-01-12",
      threatLevel: "Low",
      autoBlocked: false,
      description: "Manually blocked adult content site",
    },
    {
      url: "suspicious-download.com",
      category: "Suspicious",
      blockedDate: "2024-01-11",
      threatLevel: "Medium",
      autoBlocked: true,
      description: "Hosts potentially unwanted programs",
    },
  ]

  const categories = ["all", "Malware", "Phishing", "Spam", "Adult", "Suspicious"]

  const filteredSites = blockedSites.filter((site) => {
    const matchesSearch = site.url.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || site.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getThreatColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "malware":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "phishing":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "spam":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "adult":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "suspicious":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const handleAddSite = () => {
    if (newSiteUrl.trim()) {
      // In real app, this would make an API call
      console.log("Adding site to block list:", newSiteUrl)
      setNewSiteUrl("")
    }
  }

  const handleUnblockSite = (url: string) => {
    // In real app, this would make an API call
    console.log("Unblocking site:", url)
  }

  return (
    <ShaderBackground>
      <Header />
      <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-light text-white mb-2">Blocked Sites Management</h1>
              <p className="text-white/60">Manage your blocked sites and protection preferences</p>
            </div>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent w-full sm:w-auto"
              >
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-light text-white">{blockedSites.length}</p>
                <p className="text-white/60 text-sm">Total Blocked</p>
              </CardContent>
            </Card>
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-light text-white">{blockedSites.filter((s) => s.autoBlocked).length}</p>
                <p className="text-white/60 text-sm">Auto Blocked</p>
              </CardContent>
            </Card>
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-light text-white">{blockedSites.filter((s) => !s.autoBlocked).length}</p>
                <p className="text-white/60 text-sm">Manual Blocks</p>
              </CardContent>
            </Card>
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-light text-white">
                  {blockedSites.filter((s) => s.threatLevel === "Critical").length}
                </p>
                <p className="text-white/60 text-sm">Critical Threats</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="blocked-list" className="space-y-6">
            <div className="overflow-x-auto">
              <TabsList className="bg-black/20 backdrop-blur-sm border-white/10 w-full sm:w-auto">
                <TabsTrigger
                  value="blocked-list"
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-xs sm:text-sm"
                >
                  Blocked Sites
                </TabsTrigger>
                <TabsTrigger
                  value="add-site"
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-xs sm:text-sm"
                >
                  Add Site
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-xs sm:text-sm"
                >
                  Block Settings
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="blocked-list">
              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-white font-normal">Blocked Sites List</CardTitle>
                      <CardDescription className="text-white/60">View and manage all blocked websites</CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                      <Input
                        placeholder="Search sites..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40 w-full sm:w-64"
                      />
                      <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white w-full sm:w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/20">
                          {categories.map((category) => (
                            <SelectItem key={category} value={category} className="text-white">
                              {category === "all" ? "All Categories" : category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredSites.map((site, index) => (
                      <div
                        key={index}
                        className="flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                            <h3 className="text-white font-medium break-all">{site.url}</h3>
                            <Badge className={getCategoryColor(site.category)}>{site.category}</Badge>
                            <Badge className={getThreatColor(site.threatLevel)}>{site.threatLevel}</Badge>
                            {site.autoBlocked && (
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Auto</Badge>
                            )}
                          </div>
                          <p className="text-white/60 text-sm mb-1">{site.description}</p>
                          <p className="text-white/40 text-xs">Blocked on {site.blockedDate}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                          >
                            Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnblockSite(site.url)}
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                          >
                            Unblock
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add-site">
              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white font-normal">Add Site to Block List</CardTitle>
                  <CardDescription className="text-white/60">
                    Manually add websites to your personal block list
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      placeholder="Enter website URL (e.g., example.com)"
                      value={newSiteUrl}
                      onChange={(e) => setNewSiteUrl(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 flex-1"
                    />
                    <Button
                      onClick={handleAddSite}
                      className="bg-white text-black hover:bg-white/90 font-normal w-full sm:w-auto"
                    >
                      Add to Block List
                    </Button>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-white font-normal mb-2">Tips for Adding Sites:</h3>
                    <ul className="text-white/60 text-sm space-y-1">
                      <li>• Enter just the domain name (e.g., "example.com" not "https://example.com")</li>
                      <li>• Wildcards are supported (e.g., "*.ads.com" blocks all subdomains)</li>
                      <li>• Sites will be blocked immediately across all your devices</li>
                      <li>• You can always unblock sites later from the blocked sites list</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white font-normal">Blocking Preferences</CardTitle>
                  <CardDescription className="text-white/60">
                    Configure how sites are automatically blocked
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-white font-normal">Block Malware Sites</h3>
                        <p className="text-white/60 text-sm">Automatically block known malware distribution sites</p>
                      </div>
                      <Button className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 w-full sm:w-auto">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-white font-normal">Block Phishing Sites</h3>
                        <p className="text-white/60 text-sm">Block sites attempting to steal credentials</p>
                      </div>
                      <Button className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 w-full sm:w-auto">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-white font-normal">Block Spam Sites</h3>
                        <p className="text-white/60 text-sm">Block sites with excessive advertising or spam</p>
                      </div>
                      <Button className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 w-full sm:w-auto">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-white font-normal">Block Adult Content</h3>
                        <p className="text-white/60 text-sm">Block adult and inappropriate content sites</p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent w-full sm:w-auto"
                      >
                        Disabled
                      </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-white font-normal">Block Suspicious Sites</h3>
                        <p className="text-white/60 text-sm">Block potentially harmful or suspicious websites</p>
                      </div>
                      <Button className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 w-full sm:w-auto">
                        Enabled
                      </Button>
                    </div>
                  </div>
                  <hr className="border-white/10" />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-white text-black hover:bg-white/90 font-normal">Save Settings</Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                      Export Block List
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                      Import Block List
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
