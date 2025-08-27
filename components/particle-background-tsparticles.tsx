"use client"

import { useCallback, useEffect, useState, useRef } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import { useTheme } from "next-themes"
import { useScrollContext } from "./scroll-provider"

// This is the original tsParticles implementation, kept as a backup
export default function ParticleBackgroundTsParticles() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { scrollPosition, isScrolling } = useScrollContext()
  const [particleSpeed, setParticleSpeed] = useState(0.5)
  const particlesRef = useRef(null)
  const targetSpeedRef = useRef(0.5)
  const animationFrameRef = useRef(null)

  // Smooth transition for particle speed instead of direct binding to scroll
  useEffect(() => {
    // Set target speed based on scroll, but with much less intensity
    targetSpeedRef.current = 0.5 + Math.min(0.3, scrollPosition * 0.3)

    // Only start animation if not already running
    if (!animationFrameRef.current) {
      const animateSpeed = () => {
        // Smooth interpolation towards target speed
        setParticleSpeed((prev) => {
          const diff = targetSpeedRef.current - prev
          // Small increment for smooth transition
          return Math.abs(diff) < 0.01 ? targetSpeedRef.current : prev + diff * 0.05
        })

        animationFrameRef.current = requestAnimationFrame(animateSpeed)
      }

      animationFrameRef.current = requestAnimationFrame(animateSpeed)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [scrollPosition])

  // Pause particles during active scrolling to improve performance
  useEffect(() => {
    if (!particlesRef.current) return

    // Optional: Freeze particles during active scrolling for better performance
    // if (isScrolling) {
    //   particlesRef.current?.pause()
    // } else {
    //   particlesRef.current?.play()
    // }
  }, [isScrolling])

  useEffect(() => {
    setMounted(true)
  }, [])

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback((container) => {
    particlesRef.current = container
  }, [])

  if (!mounted) return null

  const isDarkMode = theme === "dark"
  // Read brand colors from CSS variables
  const getBrandColors = () => {
    const styles = getComputedStyle(document.documentElement)
    const brandStrong = `hsl(${styles.getPropertyValue("--brand-strong").trim()})`
    const brandSoft = `hsl(${styles.getPropertyValue("--brand-soft").trim()})`
    return { brandStrong, brandSoft }
  }
  const { brandStrong: primaryColor, brandSoft: secondaryColor } = getBrandColors()

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      className="absolute inset-0"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 30, // Lower FPS limit for better performance
        particles: {
          color: {
            value: [primaryColor, secondaryColor],
          },
          links: {
            color: primaryColor,
            distance: 140,
            enable: true,
            opacity: isDarkMode ? 0.1 : 0.07,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: particleSpeed, // Use the smoothly animated state value
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 50, // Reduced particle count for better performance
          },
          opacity: {
            value: isDarkMode ? 0.18 : 0.14,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  )
}
