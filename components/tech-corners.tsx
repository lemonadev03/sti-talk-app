"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface TechCornersProps {
  color?: string
  size?: number
  className?: string
  strokeWidth?: number
  animated?: boolean
}

export default function TechCorners({
  color = "hsl(var(--brand-strong) / 0.8)",
  size = 0,
  className = "",
  strokeWidth = 2,
  animated = false,
}: TechCornersProps) {
  // Calculate corner size - reduced from 20% to 12% for more subtle corners
  // Also capped at 15px maximum size (down from 20px)
  const cornerSize = size > 0 ? Math.min(20, size * 0.12) : 15

  // For animated corners
  const [animatedSize, setAnimatedSize] = useState(animated ? 0 : cornerSize)
  const [glowing, setGlowing] = useState(false)

  useEffect(() => {
    if (animated) {
      // Animate corners expanding
      const timer = setTimeout(() => {
        setAnimatedSize(cornerSize)
      }, 300)

      // Set up glowing effect
      const glowTimer = setInterval(() => {
        setGlowing((prev) => !prev)
      }, 2000)

      return () => {
        clearTimeout(timer)
        clearInterval(glowTimer)
      }
    }
  }, [animated, cornerSize])

  const actualSize = animated ? animatedSize : cornerSize
  const actualColor = glowing ? "hsl(var(--brand-strong) / 1)" : color

  if (animated) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        {/* Top Left Corner */}
        <motion.svg
          className="absolute left-0 top-0 h-auto w-auto overflow-visible"
          width={actualSize}
          height={actualSize}
          viewBox={`0 0 ${actualSize} ${actualSize}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ width: 0, height: 0 }}
          animate={{ width: actualSize, height: actualSize }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.path
            d={`M1 ${actualSize} L1 1 L${actualSize} 1`}
            stroke={actualColor}
            strokeWidth={strokeWidth}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.svg>

        {/* Top Right Corner */}
        <motion.svg
          className="absolute right-0 top-0 h-auto w-auto overflow-visible"
          width={actualSize}
          height={actualSize}
          viewBox={`0 0 ${actualSize} ${actualSize}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ width: 0, height: 0 }}
          animate={{ width: actualSize, height: actualSize }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.path
            d={`M0 1 L${actualSize - 1} 1 L${actualSize - 1} ${actualSize}`}
            stroke={actualColor}
            strokeWidth={strokeWidth}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.svg>

        {/* Bottom Left Corner */}
        <motion.svg
          className="absolute bottom-0 left-0 h-auto w-auto overflow-visible"
          width={actualSize}
          height={actualSize}
          viewBox={`0 0 ${actualSize} ${actualSize}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ width: 0, height: 0 }}
          animate={{ width: actualSize, height: actualSize }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.path
            d={`M1 0 L1 ${actualSize - 1} L${actualSize} ${actualSize - 1}`}
            stroke={actualColor}
            strokeWidth={strokeWidth}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.svg>

        {/* Bottom Right Corner */}
        <motion.svg
          className="absolute bottom-0 right-0 h-auto w-auto overflow-visible"
          width={actualSize}
          height={actualSize}
          viewBox={`0 0 ${actualSize} ${actualSize}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ width: 0, height: 0 }}
          animate={{ width: actualSize, height: actualSize }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.path
            d={`M0 ${actualSize - 1} L${actualSize - 1} ${actualSize - 1} L${actualSize - 1} 0`}
            stroke={actualColor}
            strokeWidth={strokeWidth}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </motion.svg>
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Top Left Corner */}
      <svg
        className="absolute left-0 top-0 h-auto w-auto overflow-visible"
        width={cornerSize}
        height={cornerSize}
        viewBox={`0 0 ${cornerSize} ${cornerSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={`M1 ${cornerSize} L1 1 L${cornerSize} 1`} stroke={color} strokeWidth={strokeWidth} />
      </svg>

      {/* Top Right Corner */}
      <svg
        className="absolute right-0 top-0 h-auto w-auto overflow-visible"
        width={cornerSize}
        height={cornerSize}
        viewBox={`0 0 ${cornerSize} ${cornerSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M0 1 L${cornerSize - 1} 1 L${cornerSize - 1} ${cornerSize}`}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </svg>

      {/* Bottom Left Corner */}
      <svg
        className="absolute bottom-0 left-0 h-auto w-auto overflow-visible"
        width={cornerSize}
        height={cornerSize}
        viewBox={`0 0 ${cornerSize} ${cornerSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M1 0 L1 ${cornerSize - 1} L${cornerSize} ${cornerSize - 1}`}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </svg>

      {/* Bottom Right Corner */}
      <svg
        className="absolute bottom-0 right-0 h-auto w-auto overflow-visible"
        width={cornerSize}
        height={cornerSize}
        viewBox={`0 0 ${cornerSize} ${cornerSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M0 ${cornerSize - 1} L${cornerSize - 1} ${cornerSize - 1} L${cornerSize - 1} 0`}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  )
}
