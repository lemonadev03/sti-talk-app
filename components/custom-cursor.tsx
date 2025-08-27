"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Track hover state over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [])

  // Hide the cursor on mobile devices
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  if (isMobile) return null

  // Immediate transition for precise cursor movement
  const cursorTransition = {
    type: "tween",
    duration: 0,
    ease: "linear",
  }

  return (
    <>
      {/* Custom cursor - hide the default cursor */}
      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, [role="button"], .interactive {
          cursor: none;
        }
      `}</style>

      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-4 w-4 rounded-full bg-primary"
        style={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.7 : 1,
        }}
        transition={cursorTransition}
      />

      {/* Cursor ring */}
      <motion.div
        className="pointer-events-none fixed z-[9998] h-10 w-10 rounded-full border-2 border-primary/50 bg-transparent"
        style={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isClicking ? 1.2 : isHovering ? 1.5 : 1,
          borderColor: isHovering ? "hsl(var(--brand-strong) / 0.8)" : "hsl(var(--brand-strong) / 0.5)",
        }}
        transition={cursorTransition}
      />
    </>
  )
}
