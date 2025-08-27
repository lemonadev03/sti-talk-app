"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

interface SkillsTickerProps {
  skills: string[]
}

export default function SkillsTicker({ skills }: SkillsTickerProps) {
  const tickerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Duplicate skills to create seamless loop
  const duplicatedSkills = [...skills, ...skills]

  // Use CSS animation for mobile instead of JS-based animation
  const mobileTickerStyle = {
    animation: "tickerMove 60s linear infinite",
  }

  return (
    <div className="relative z-10 mt-8 overflow-hidden border-b border-t border-primary/30 bg-black/40 py-6 backdrop-blur-sm">
      <style jsx global>{`
        @keyframes tickerMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className="relative flex w-full">
        {isMobile ? (
          // CSS-based animation for mobile
          <div ref={tickerRef} className="flex whitespace-nowrap" style={mobileTickerStyle}>
            {duplicatedSkills.map((skill, index) => (
              <div key={index} className="flex items-center px-6">
                <span className="text-primary">•</span>
                <span className="ml-4 text-xl font-medium tracking-wide">{skill}</span>
              </div>
            ))}
          </div>
        ) : (
          // JS-based animation for desktop
          <motion.div
            ref={tickerRef}
            className="flex whitespace-nowrap"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {duplicatedSkills.map((skill, index) => (
              <motion.div
                key={index}
                className="flex items-center px-6"
                whileHover={{
                  scale: 1.1,
                  color: "hsl(var(--brand-soft))",
                  transition: { duration: 0.2 },
                }}
              >
                <motion.span
                  className="text-primary"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: (index * 0.2) % 2,
                  }}
                >
                  •
                </motion.span>
                <motion.span className="ml-4 text-xl font-medium tracking-wide">{skill}</motion.span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
