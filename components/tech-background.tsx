"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function TechBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isDarkMode = theme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Pull brand colors from CSS variables for consistency
  const styles = typeof window !== 'undefined' ? getComputedStyle(document.documentElement) : null
  const brandStrong = styles ? `hsl(${styles.getPropertyValue('--brand-strong').trim()})` : 'rgba(69, 137, 255, 0.15)'
  const brandSoft = styles ? `hsl(${styles.getPropertyValue('--brand-soft').trim()})` : 'rgba(120, 169, 255, 0.1)'
  const primaryColor = isDarkMode ? `${brandStrong.replace('hsl(', 'hsla(').replace(')', ', 0.15)')}` : `${brandStrong.replace('hsl(', 'hsla(').replace(')', ', 0.1)')}`
  const secondaryColor = isDarkMode ? `${brandSoft.replace('hsl(', 'hsla(').replace(')', ', 0.1)')}` : `${brandSoft.replace('hsl(', 'hsla(').replace(')', ', 0.05)')}`

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Static grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          /* Use CSS variables directly to avoid hydration/string issues */
          backgroundImage: `
            linear-gradient(to right, hsl(var(--brand-strong) / 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--brand-strong) / 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 1,
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute -left-[20%] -top-[20%] h-[70%] w-[70%] rounded-full bg-primary/6 blur-[120px]" />
      <div className="absolute -right-[20%] -bottom-[20%] h-[70%] w-[70%] rounded-full bg-primary/6 blur-[120px]" />
      <div className="absolute left-[30%] top-[60%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[100px]" />

      {/* Tech circuit lines */}
      <div className="absolute left-[5%] top-[10%] h-[30%] w-[1px] bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0" />
      <div className="absolute left-[5%] top-[10%] h-[1px] w-[20%] bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />

      <div className="absolute right-[10%] top-[20%] h-[1px] w-[15%] bg-gradient-to-r from-primary/0 via-primary/15 to-primary/0" />
      <div className="absolute right-[10%] top-[20%] h-[25%] w-[1px] bg-gradient-to-b from-primary/0 via-primary/15 to-primary/0" />

      <div className="absolute bottom-[15%] left-[20%] h-[1px] w-[25%] bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />
      <div className="absolute bottom-[15%] right-[25%] h-[20%] w-[1px] bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0" />
    </div>
  )
}
