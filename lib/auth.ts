// Authentication utilities for JWT token management and API calls

interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  role: "ADMIN" | "USER" // Added role field for admin access control
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface AuthResponse {
  success: boolean
  message: string
  data?: {
    user: User
    token: string
  }
  error?: string
}

interface RegisterData {
  email: string
  username: string
  password: string
  firstName: string
  lastName: string
}

interface LoginData {
  email: string
  password: string
}

interface UpdateProfileData {
  email?: string
  username?: string
  firstName?: string
  lastName?: string
}

interface ChangePasswordData {
  currentPassword: string
  newPassword: string
}

interface ProfileResponse {
  success: boolean
  message: string
  data?: User
  error?: string
}

interface ApiResponse {
  success: boolean
  message: string
  data?: any
  error?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://pf-backend-x6xf.onrender.com/api/v1"

// Reusable API client for authenticated requests
const apiClient = {
  async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = auth.getToken()

    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
      return await response.json()
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Network error occurred")
    }
  },

  // Convenience methods
  async get<T = any>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" })
  },

  async post<T = any>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  async put<T = any>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  async delete<T = any>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" })
  },
}

export const auth = {
  // Register new user
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success && result.data?.token) {
        // Store token in localStorage
        localStorage.setItem("auth_token", result.data.token)
        localStorage.setItem("user", JSON.stringify(result.data.user))
      }

      return result
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  },

  // Login user
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success && result.data?.token) {
        // Store token in localStorage
        localStorage.setItem("auth_token", result.data.token)
        localStorage.setItem("user", JSON.stringify(result.data.user))
      }

      return result
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
  },

  // Get stored token
  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token")
    }
    return null
  },

  // Get stored user
  getUser(): User | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user")
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  },

  // Get user profile
  async getProfile(): Promise<ProfileResponse> {
    try {
      if (!this.getToken()) {
        return {
          success: false,
          message: "No authentication token found",
          error: "Unauthorized",
        }
      }

      const result = await apiClient.get<ProfileResponse>("/users/profile")

      if (result.success && result.data) {
        localStorage.setItem("user", JSON.stringify(result.data))
      }

      return result
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  },

  // Update user profile
  async updateProfile(data: UpdateProfileData): Promise<ProfileResponse> {
    try {
      if (!this.getToken()) {
        return {
          success: false,
          message: "No authentication token found",
          error: "Unauthorized",
        }
      }

      const result = await apiClient.put<ProfileResponse>("/users/profile", data)

      if (result.success && result.data) {
        localStorage.setItem("user", JSON.stringify(result.data))
      }

      return result
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  },

  // Change password
  async changePassword(data: ChangePasswordData): Promise<ApiResponse> {
    try {
      if (!this.getToken()) {
        return {
          success: false,
          message: "No authentication token found",
          error: "Unauthorized",
        }
      }

      return await apiClient.put<ApiResponse>("/users/change-password", data)
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  },

  // Delete user account
  async deleteAccount(): Promise<ApiResponse> {
    try {
      if (!this.getToken()) {
        return {
          success: false,
          message: "No authentication token found",
          error: "Unauthorized",
        }
      }

      const result = await apiClient.delete<ApiResponse>("/users/profile")

      if (result.success) {
        this.logout()
      }

      return result
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken()
  },

  // Check if user is admin
  isAdmin(): boolean {
    const user = this.getUser()
    return user?.role === "ADMIN"
  },
}

export { apiClient }
