"use client"

import { useCallback, useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"

export default function ParticleBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const isDarkMode = theme === "dark"

  // Read CSS brand colors from variables
  const getBrandColors = useCallback(() => {
    const root = document.documentElement
    const styles = getComputedStyle(root)
    const brandStrong = `hsl(${styles.getPropertyValue("--brand-strong").trim()})`
    const brandSoft = `hsl(${styles.getPropertyValue("--brand-soft").trim()})`
    return { brandStrong, brandSoft }
  }, [])

  // Define particle class
  class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string

    constructor(canvas: HTMLCanvasElement) {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 1.5 // Slightly larger particles
      this.speedX = (Math.random() - 0.5) * 0.5
      this.speedY = (Math.random() - 0.5) * 0.5
      const { brandStrong, brandSoft } = getBrandColors()
      this.color = Math.random() > 0.5 ? brandStrong : brandSoft
    }

    update(canvas: HTMLCanvasElement) {
      // Update position
      this.x += this.speedX
      this.y += this.speedY

      // Wrap around edges
      if (this.x < 0) this.x = canvas.width
      if (this.x > canvas.width) this.x = 0
      if (this.y < 0) this.y = canvas.height
      if (this.y > canvas.height) this.y = 0
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Initialize particles
  const initParticles = useCallback(
    (canvas: HTMLCanvasElement) => {
      const particleCount = 60
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(canvas))
      }
    },
    [isDarkMode],
  )

  // Draw connections between particles
  const drawConnections = useCallback(
    (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
      const maxDistance = 140
      const opacity = isDarkMode ? 0.12 : 0.1

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const { brandStrong } = getBrandColors()
            ctx.strokeStyle = brandStrong
            ctx.globalAlpha = (1 - distance / maxDistance) * opacity
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
    },
    [isDarkMode],
  )

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      particle.update(canvas)
      particle.draw(ctx)
    })

    // Draw connections
    drawConnections(ctx, particlesRef.current)

    // Continue animation loop
    animationRef.current = requestAnimationFrame(animate)
  }, [drawConnections])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Set canvas size to match window size
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight

        // Reinitialize particles on resize
        initParticles(canvasRef.current)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [initParticles])

  // Initialize canvas and start animation
  useEffect(() => {
    setMounted(true)

    if (canvasRef.current) {
      // Set initial canvas size
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight

      // Initialize particles
      initParticles(canvasRef.current)

      // Start animation loop
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initParticles, animate])

  // Update particles when theme changes
  useEffect(() => {
    if (mounted && canvasRef.current) {
      initParticles(canvasRef.current)
    }
  }, [theme, initParticles, mounted])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{
        backgroundColor: "transparent",
        pointerEvents: "none",
      }}
    />
  )
}
