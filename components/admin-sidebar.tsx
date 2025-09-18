"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Users, Shield, Settings, BarChart3, FileText, Database, X } from "lucide-react"

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Roles & Permissions", href: "/admin/roles", icon: Shield },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Database", href: "/admin/database", icon: Database },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-64 lg:flex-col lg:pt-16">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/20 backdrop-blur-md border-r border-white/10 px-6 pb-4 mt-5">
          <div className="flex h-16 shrink-0 items-center">
            <h2 className="text-xl font-semibold text-white">Admin Panel</h2>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            isActive ? "bg-white/10 text-white" : "text-gray-300 hover:text-white hover:bg-white/5",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors",
                          )}
                        >
                          <item.icon
                            className={cn(
                              isActive ? "text-white" : "text-gray-400 group-hover:text-white",
                              "h-6 w-6 shrink-0",
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex w-64 flex-col transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/90 backdrop-blur-md border-r border-white/10 px-6 pb-4 pt-16">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Admin Panel</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            isActive ? "bg-white/10 text-white" : "text-gray-300 hover:text-white hover:bg-white/5",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors",
                          )}
                        >
                          <item.icon
                            className={cn(
                              isActive ? "text-white" : "text-gray-400 group-hover:text-white",
                              "h-6 w-6 shrink-0",
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
