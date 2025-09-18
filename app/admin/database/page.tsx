"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Database, Clock, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function DatabasePage() {
  const [selectedTimeout, setSelectedTimeout] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [accessStatus, setAccessStatus] = useState<"idle" | "active" | "expired">("idle")
  const [remainingTime, setRemainingTime] = useState<number>(0)

  const timeoutOptions = [
    { value: "10", label: "10 minutes" },
    { value: "15", label: "15 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "60", label: "60 minutes" },
  ]

  const enableDatabaseAccess = async () => {
    if (!selectedTimeout) {
      toast({
        title: "Error",
        description: "Please select a timeout duration",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      console.log("[v0] Attempting to enable database access for", selectedTimeout, "minutes")

      const data = JSON.stringify({
        test: "event",
        timeout: Number.parseInt(selectedTimeout),
      })

      console.log("[v0] Sending request with data:", data)

      const response = await fetch("https://eota2cjmvx2mq6b.m.pipedream.net/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer grammarpro",
        },
        body: data,
      })

      console.log("[v0] Response status:", response.status)
      console.log("[v0] Response ok:", response.ok)

      if (response.status >= 200 && response.status < 300) {
        console.log("[v0] Database access enabled successfully")
        setAccessStatus("active")
        setRemainingTime(Number.parseInt(selectedTimeout))

        const timer = setInterval(() => {
          setRemainingTime((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              setAccessStatus("expired")
              return 0
            }
            return prev - 1
          })
        }, 60000) // Update every minute

        toast({
          title: "Success",
          description: `Database access enabled for ${selectedTimeout} minutes`,
        })
      } else {
        const errorText = await response.text()
        console.log("[v0] Error response:", errorText)
        throw new Error(`HTTP ${response.status}: ${errorText || "Failed to enable database access"}`)
      }
    } catch (error) {
      console.log("[v0] Caught error:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      console.error("Error enabling database access:", errorMessage)

      toast({
        title: "Error",
        description: `Failed to enable database access: ${errorMessage}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = () => {
    switch (accessStatus) {
      case "active":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Expired
          </Badge>
        )
      default:
        return <Badge variant="secondary">Inactive</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white/90">Database Management</h1>
          <p className="text-white/70 mt-1">Manage temporary database access and monitoring</p>
        </div>
        {getStatusBadge()}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Database Access Control */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white/90 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Enable Database Access
            </CardTitle>
            <CardDescription className="text-white/70">
              Grant temporary access to the database for a specified duration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Access Duration</label>
              <Select value={selectedTimeout} onValueChange={setSelectedTimeout}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select timeout duration" />
                </SelectTrigger>
                <SelectContent>
                  {timeoutOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {accessStatus === "active" && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-sm font-medium">Access Active - {remainingTime} minutes remaining</p>
              </div>
            )}

            <Button
              onClick={enableDatabaseAccess}
              disabled={isLoading || accessStatus === "active"}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Enabling Access..." : "Enable Database Access"}
            </Button>
          </CardContent>
        </Card>

        {/* Database Information */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white/90 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Database Information
            </CardTitle>
            <CardDescription className="text-white/70">Current database status and connection details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-white/80 text-sm">Database URL:</span>
                <a
                  href="https://pf-database.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 break-all"
                >
                  pf-database.onrender.com
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-white/80 text-sm">Access Status:</span>
                <span className="text-white/90 text-sm capitalize">{accessStatus}</span>
              </div>

              {accessStatus === "active" && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-white/80 text-sm">Time Remaining:</span>
                  <span className="text-green-400 text-sm font-medium">{remainingTime} minutes</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-white/60 text-xs">
                Database access is temporary and will automatically expire after the selected duration.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Access History */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white/90">Recent Access History</CardTitle>
          <CardDescription className="text-white/70">
            Track recent database access requests and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Database className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/60 text-sm">No access history available</p>
            <p className="text-white/40 text-xs mt-1">Access logs will appear here after enabling database access</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
