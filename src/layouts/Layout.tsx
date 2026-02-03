import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon, Home, User, Share2, BookOpen, PenTool, LayoutDashboard, Briefcase, Award, StickyNote } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const navItems = [
  { name: '首页', path: '/', icon: Home },
  { name: '简历', path: '/resume', icon: User },
  { name: '社交', path: '/social', icon: Share2 },
  { name: '知识', path: '/knowledge', icon: BookOpen },
  { name: '博客', path: '/blog', icon: PenTool },
  { name: '洞察', path: '/insights', icon: LayoutDashboard },
  { name: '工具', path: '/tools', icon: Briefcase },
  { name: '笔记', path: '/notes', icon: StickyNote },
  { name: '成就', path: '/achievements', icon: Award },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Chandler Song</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.path ? "text-primary underline underline-offset-4" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-md hover:bg-muted"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
             <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-md hover:bg-muted"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-b bg-background p-4 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium",
                    location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="container mx-auto py-10 px-4 animate-in fade-in duration-500">
        {children}
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with React & Vite. © 2026 Personal Brand.
          </p>
        </div>
      </footer>
    </div>
  )
}
