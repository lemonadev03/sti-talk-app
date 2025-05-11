"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode, useRef } from "react"

interface ScrollContextType {
  scrollPosition: number
  scrollDirection: "up" | "down" | null
  isScrolling: boolean
}

const ScrollContext = createContext<ScrollContextType>({
  scrollPosition: 0,
  scrollDirection: null,
  isScrolling: false,
})

export const useScrollContext = () => useContext(ScrollContext)

interface ScrollProviderProps {
  children: ReactNode
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const rafId = useRef<number | null>(null)
  const lastUpdateTime = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      // Throttle updates to max 30fps (approx 33ms between frames)
      const now = Date.now()
      if (now - lastUpdateTime.current < 33) {
        return
      }
      lastUpdateTime.current = now

      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }

      rafId.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
        const newScrollPosition = Math.max(0, Math.min(1, currentScrollY / Math.max(1, scrollHeight)))

        // Only update if there's a significant change to reduce re-renders
        if (Math.abs(newScrollPosition - scrollPosition) > 0.001) {
          setScrollPosition(newScrollPosition)
        }

        // Determine scroll direction
        if (currentScrollY > lastScrollY.current) {
          setScrollDirection("down")
        } else if (currentScrollY < lastScrollY.current) {
          setScrollDirection("up")
        }

        lastScrollY.current = currentScrollY

        // Handle scroll state
        setIsScrolling(true)

        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current)
        }

        scrollTimeout.current = setTimeout(() => {
          setIsScrolling(false)
        }, 150) // Adjust timeout as needed
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initialize on mount

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [scrollPosition])

  return (
    <ScrollContext.Provider value={{ scrollPosition, scrollDirection, isScrolling }}>{children}</ScrollContext.Provider>
  )
}
