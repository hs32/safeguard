"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ShaderBackground } from "@/components/shader-background"
import { auth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, Activity, Settings } from "lucide-react"

interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  role: "ADMIN" | "USER"
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface AdminStats {
  totalUsers: number
  activeUsers: number
  adminUsers: number
  recentSignups: number
}

export default function AdminPanel() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    adminUsers: 0,
    recentSignups: 0,
  })

  useEffect(() => {
    // Check if user is authenticated and is admin
    if (!auth.isAuthenticated()) {
      router.push("/signin?redirect=/admin")
      return
    }

    if (!auth.isAdmin()) {
      router.push("/dashboard")
      return
    }

    loadAdminData()
  }, [router])

  const loadAdminData = async () => {
    try {
      setLoading(true)

      // In a real app, you'd have admin-specific endpoints
      // For now, we'll simulate admin data
      const currentUser = auth.getUser()
      if (currentUser) {
        // Simulate admin stats and user list
        setStats({
          totalUsers: 156,
          activeUsers: 142,
          adminUsers: 3,
          recentSignups: 12,
        })

        // Simulate user list (in real app, this would come from admin API)
        setUsers([
          {
            id: "1",
            email: "admin@example.com",
            username: "admin",
            firstName: "Admin",
            lastName: "User",
            role: "ADMIN",
            isActive: true,
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          },
          {
            id: "2",
            email: "user@example.com",
            username: "user1",
            firstName: "John",
            lastName: "Doe",
            role: "USER",
            isActive: true,
            createdAt: "2024-01-02T00:00:00Z",
            updatedAt: "2024-01-02T00:00:00Z",
          },
        ])
      }
    } catch (error) {
      console.error("Failed to load admin data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of system statistics and recent activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.activeUsers}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Admin Users</CardTitle>
            <Shield className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.adminUsers}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Recent Signups</CardTitle>
            <Settings className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.recentSignups}</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Recent Users</CardTitle>
          <CardDescription className="text-gray-400">Latest user registrations and activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white font-medium">User</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Role</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-white/10">
                    <td className="py-3 px-4">
                      <div className="text-white">
                        <div className="font-medium">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-400">@{user.username}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={user.role === "ADMIN" ? "default" : "secondary"}
                        className={user.role === "ADMIN" ? "bg-purple-600 text-white" : "bg-gray-600 text-white"}
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={user.isActive ? "default" : "destructive"}
                        className={user.isActive ? "bg-green-600 text-white" : "bg-red-600 text-white"}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-white border-white/20 hover:bg-white/10 bg-transparent"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-400 border-red-400/20 hover:bg-red-400/10 bg-transparent"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
