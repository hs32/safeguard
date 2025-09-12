"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/auth"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = auth.isAuthenticated()
      const userData = auth.getUser()
      const adminStatus = auth.isAdmin()
      setIsAuthenticated(authenticated)
      setUser(userData)
      setIsAdmin(adminStatus)
    }

    checkAuth()
    window.addEventListener("storage", checkAuth)
    return () => window.removeEventListener("storage", checkAuth)
  }, [])

  const handleLogout = () => {
    auth.logout()
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    setIsAuthenticated(false)
    setUser(null)
    setIsAdmin(false)
    setIsMenuOpen(false)
    setIsUserDropdownOpen(false)
    router.push("/")
  }

  return (
    <header className="relative z-20 flex items-center justify-between p-6">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-8 text-white">
              <path
                d="M12 2L4 6V11C4 16.55 7.84 21.74 12 22C16.16 21.74 20 16.55 20 11V6L12 2Z"
                fill="currentColor"
                fillOpacity="0.1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">SafeGuard</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-2">
        <Link
          href="/download"
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Download
        </Link>
        {isAuthenticated && (
          <>
            <Link
              href="/dashboard"
              className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              Dashboard
            </Link>
            <Link
              href="/blocked-sites"
              className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              Blocked Sites
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200 border border-purple-500/30 bg-purple-500/10"
              >
                Admin Panel
              </Link>
            )}
          </>
        )}
        <Link
          href="#features"
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Features
        </Link>
      </nav>

      {isAuthenticated ? (
        <div className="hidden md:flex items-center relative">
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200 text-white/80 hover:text-white"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {(user?.firstName?.[0] || user?.username?.[0] || "U").toUpperCase()}
            </div>
            <span className="text-sm">{user?.firstName || user?.username}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isUserDropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isUserDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg overflow-hidden">
              <Link
                href="/profile"
                className="flex items-center px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                onClick={() => setIsUserDropdownOpen(false)}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center px-4 py-3 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transition-all duration-200"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Admin Panel
                </Link>
              )}
              <div className="border-t border-white/10"></div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          id="gooey-btn"
          className="hidden md:flex relative items-center group"
          style={{ filter: "url(#gooey-filter)" }}
        >
          <Link
            href="/signup"
            className="absolute right-0 px-2.5 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
          <Link
            href="/signin"
            className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10"
          >
            Login
          </Link>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2" aria-label="Toggle menu">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12M6 12h12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/5 backdrop-blur-xl border-t border-white/10 md:hidden z-50">
          <nav className="flex flex-col p-6 space-y-4">
            <Link
              href="/download"
              className="text-white/80 hover:text-white text-sm font-light py-2 transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Download
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/dashboard"
                  className="text-white/80 hover:text-white text-sm font-light py-2 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/blocked-sites"
                  className="text-white/80 hover:text-white text-sm font-light py-2 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blocked Sites
                </Link>
                <Link
                  href="/profile"
                  className="text-white/80 hover:text-white text-sm font-light py-2 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-purple-400 hover:text-purple-300 text-sm font-light py-2 transition-all duration-200 border-l-2 border-purple-500 pl-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
              </>
            )}
            <Link
              href="#features"
              className="text-white/80 hover:text-white text-sm font-light py-2 transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            {isAuthenticated ? (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {(user?.firstName?.[0] || user?.username?.[0] || "U").toUpperCase()}
                  </div>
                  <div className="text-white/80 text-sm">Welcome, {user?.firstName || user?.username}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-center px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-normal text-sm transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-3 pt-4 border-t border-white/10">
                <Link
                  href="/signin"
                  className="flex-1 text-center px-4 py-2 rounded-full bg-white text-black font-normal text-sm transition-all duration-300 hover:bg-white/90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="flex-1 text-center px-4 py-2 rounded-full border border-white/20 text-white font-normal text-sm transition-all duration-300 hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
export { Header }
