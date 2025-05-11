"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface SkillsTickerProps {
  skills: string[]
}

export default function SkillsTicker({ skills }: SkillsTickerProps) {
  const tickerRef = useRef<HTMLDivElement>(null)

  // Duplicate skills to create seamless loop
  const duplicatedSkills = [...skills, ...skills]

  return (
    <div className="relative z-10 mt-8 overflow-hidden border-b border-t border-primary/30 bg-black/40 py-6 backdrop-blur-sm">
      <div className="relative flex w-full">
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
              duration: 40, // Slowed down from 20 to 40 seconds
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
                color: "rgb(66, 153, 225)",
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
      </div>
    </div>
  )
}
