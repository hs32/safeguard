"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShaderBackground } from "@/components/shader-background"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, Save, Eye, EyeOff, Lock, Settings } from "lucide-react"
import { auth } from "@/lib/auth"

interface UserProfile {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
  })

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const result = await auth.getProfile()
      if (result.success && result.data) {
        setUser(result.data)
        setProfileForm({
          email: result.data.email,
          username: result.data.username,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
        })
      } else {
        setMessage({ type: "error", text: result.error || "Failed to load profile" })
        if (result.error === "Unauthorized") {
          router.push("/signin")
        }
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load profile" })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setMessage(null)

    try {
      const result = await auth.updateProfile(profileForm)
      if (result.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" })
        if (result.data) {
          setUser(result.data)
        }
      } else {
        setMessage({ type: "error", text: result.error || "Failed to update profile" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile" })
    } finally {
      setUpdating(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setChangingPassword(true)
    setMessage(null)

    try {
      const result = await auth.changePassword(passwordForm)
      if (result.success) {
        setMessage({ type: "success", text: "Password changed successfully!" })
        setPasswordForm({ currentPassword: "", newPassword: "" })
      } else {
        setMessage({ type: "error", text: result.error || "Failed to change password" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to change password" })
    } finally {
      setChangingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return
    }

    setDeleting(true)
    setMessage(null)

    try {
      const result = await auth.deleteAccount()
      if (result.success) {
        setMessage({ type: "success", text: "Account deleted successfully" })
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } else {
        setMessage({ type: "error", text: result.error || "Failed to delete account" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete account" })
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <ShaderBackground>
        <Header />
        <div className="relative z-10 min-h-screen pt-20 pb-12 px-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white/80">Loading profile...</p>
          </div>
        </div>
      </ShaderBackground>
    )
  }

  return (
    <ShaderBackground>
      <Header />
      <div className="relative z-10 min-h-screen pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Profile Settings</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto text-pretty">
              Manage your account settings and preferences
            </p>
          </div>

          {message && (
            <Alert
              className={`mb-6 ${message.type === "success" ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}`}
            >
              <AlertDescription className={message.type === "success" ? "text-green-400" : "text-red-400"}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/5 backdrop-blur-xl border border-white/10">
              <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-white/10">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="password" className="flex items-center gap-2 data-[state=active]:bg-white/10">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Password</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-white/10">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Profile Information</CardTitle>
                  <CardDescription className="text-white/70">
                    Update your personal information and account details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-white">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={profileForm.firstName}
                          onChange={(e) => setProfileForm((prev) => ({ ...prev, firstName: e.target.value }))}
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-white">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={profileForm.lastName}
                          onChange={(e) => setProfileForm((prev) => ({ ...prev, lastName: e.target.value }))}
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-white">
                        Username
                      </Label>
                      <Input
                        id="username"
                        value={profileForm.username}
                        onChange={(e) => setProfileForm((prev) => ({ ...prev, username: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={updating}
                      className="w-full sm:w-auto bg-white text-black hover:bg-white/90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {updating ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="password">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Change Password</CardTitle>
                  <CardDescription className="text-white/70">
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-white">
                        Current Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-white">
                        New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 pr-10"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={changingPassword}
                      className="w-full sm:w-auto bg-white text-black hover:bg-white/90"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      {changingPassword ? "Changing..." : "Change Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Account Settings</CardTitle>
                  <CardDescription className="text-white/70">Manage your account preferences and data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {user && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-white/70">Account ID:</span>
                          <p className="text-white font-mono text-xs break-all">{user.id}</p>
                        </div>
                        <div>
                          <span className="text-white/70">Status:</span>
                          <p className="text-white">{user.isActive ? "Active" : "Inactive"}</p>
                        </div>
                        <div>
                          <span className="text-white/70">Created:</span>
                          <p className="text-white">{new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-white/70">Last Updated:</span>
                          <p className="text-white">{new Date(user.updatedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Danger Zone</h3>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <h4 className="text-red-400 font-medium mb-2">Delete Account</h4>
                      <p className="text-white/70 text-sm mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button
                        onClick={handleDeleteAccount}
                        disabled={deleting}
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {deleting ? "Deleting..." : "Delete Account"}
                      </Button>
                    </div>
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
