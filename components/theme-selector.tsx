"use client"

import { useState, useEffect } from "react"
import { Palette } from "lucide-react"

type Theme = "default" | "professional" | "warm" | "nature" | "white" | "purple" | "pink" | "teal"

interface ThemeOption {
  id: Theme
  color: string
}

const themes: ThemeOption[] = [
  { id: "default", color: "#3B82F6" },
  { id: "professional", color: "#1E293B" },
  { id: "warm", color: "#F97316" },
  { id: "nature", color: "#22C55E" },
  { id: "white", color: "#FFFFFF" },
  { id: "purple", color: "#9333EA" },
  { id: "pink", color: "#EC4899" },
  { id: "teal", color: "#14B8A6" },
]

export function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<Theme>("default")

  useEffect(() => {
    // Load saved theme on mount
    const savedTheme = localStorage.getItem("meritcap-theme") as Theme
    if (savedTheme && themes.find((t) => t.id === savedTheme)) {
      setCurrentTheme(savedTheme)
      applyTheme(savedTheme)
    }
  }, [])

  const applyTheme = (theme: Theme) => {
    if (theme === "default") {
      document.documentElement.removeAttribute("data-theme")
    } else {
      document.documentElement.setAttribute("data-theme", theme)
    }
  }

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme)
    applyTheme(theme)
    localStorage.setItem("meritcap-theme", theme)
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        >
          <Palette className="w-5 h-5 text-white" />
        </button>
      ) : (
        <div className="bg-white/95 backdrop-blur-md border border-white/30 shadow-2xl rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Colors</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">
              ×
            </button>
          </div>

          <div className="flex flex-wrap gap-2 max-w-[120px]">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                  currentTheme === theme.id ? "border-gray-600 shadow-lg" : "border-gray-300"
                } ${theme.id === "white" ? "border-gray-400" : ""}`}
                style={{ backgroundColor: theme.color }}
                title={`Theme ${theme.id}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
