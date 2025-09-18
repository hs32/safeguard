"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter } from "lucide-react"

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

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      // Simulate loading users - in real app, this would be an API call
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
        {
          id: "3",
          email: "jane@example.com",
          username: "jane_doe",
          firstName: "Jane",
          lastName: "Smith",
          role: "USER",
          isActive: false,
          createdAt: "2024-01-03T00:00:00Z",
          updatedAt: "2024-01-03T00:00:00Z",
        },
      ])
    } catch (error) {
      console.error("Failed to load users:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Users</h1>
          <p className="text-gray-400">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Users</h1>
          <p className="text-gray-400">Manage user accounts and permissions</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Button
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10 bg-transparent w-full sm:w-auto"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">All Users ({filteredUsers.length})</CardTitle>
          <CardDescription className="text-gray-400">Manage user accounts, roles, and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white font-medium">User</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Role</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Created</th>
                  <th className="text-left py-3 px-4 text-white font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
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
                    <td className="py-3 px-4 text-gray-300">{new Date(user.createdAt).toLocaleDateString()}</td>
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

          <div className="lg:hidden space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white truncate">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-gray-400">@{user.username}</div>
                      <div className="text-sm text-gray-300 mt-1 truncate">{user.email}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Created: {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Badge
                        variant={user.role === "ADMIN" ? "default" : "secondary"}
                        className={user.role === "ADMIN" ? "bg-purple-600 text-white" : "bg-gray-600 text-white"}
                      >
                        {user.role}
                      </Badge>
                      <Badge
                        variant={user.isActive ? "default" : "destructive"}
                        className={user.isActive ? "bg-green-600 text-white" : "bg-red-600 text-white"}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-white border-white/20 hover:bg-white/10 bg-transparent flex-1"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-400 border-red-400/20 hover:bg-red-400/10 bg-transparent flex-1"
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
