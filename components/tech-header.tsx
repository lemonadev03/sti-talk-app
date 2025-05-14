"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { useState, useEffect } from "react"

export default function TechHeader() {
  const isMobile = useMobile()
  const [showUnderline, setShowUnderline] = useState(false)
  const [textLoaded, setTextLoaded] = useState(false)

  useEffect(() => {
    setTextLoaded(true)
  }, [])

  useEffect(() => {
    if (isMobile) {
      setShowUnderline(true)
      return
    }
    setShowUnderline(false)
  }, [isMobile])

  // Mobile variants - subtle fade and slide
  const mobileVariants = {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 1, y: 0 },
  }

  // Desktop variants - with animation
  const desktopVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative z-20 flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      {isMobile ? (
        <div className="relative max-w-5xl">
          <div
            className={`flex flex-col font-outfit text-5xl font-medium leading-tight tracking-wide text-white md:text-6xl lg:text-7xl xl:text-8xl ${textLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ willChange: 'opacity, transform' }}
          >
            <span className="mb-2">Building</span>
            <motion.span
              className="relative mb-2 inline-block font-bold text-primary"
              whileHover={{}}
            >
              SOLUTIONS
              <span
                className="absolute -bottom-2 left-0 h-[4px] w-full overflow-hidden"
              >
                <span
                  className={`block h-full bg-primary transition-transform duration-700 ease-in-out origin-left ${showUnderline ? '' : ''}`}
                  style={{
                    transform: showUnderline ? 'scaleX(1)' : 'scaleX(0)',
                    willChange: 'transform',
                  }}
                />
              </span>
            </motion.span>
            <span className="mb-2">for every</span>
            <motion.span
              className="relative inline-block font-bold text-primary"
              whileHover={{}}
            >
              STORY
              <span
                className="absolute -bottom-2 left-0 h-[4px] w-full overflow-hidden"
              >
                <span
                  className={`block h-full bg-primary transition-transform duration-700 ease-in-out origin-left ${showUnderline ? '' : ''}`}
                  style={{
                    transform: showUnderline ? 'scaleX(1)' : 'scaleX(0)',
                    willChange: 'transform',
                  }}
                />
              </span>
            </motion.span>
          </div>
        </div>
      ) : (
        <motion.div
          className="relative max-w-5xl"
          initial="initial"
          animate="animate"
          variants={desktopVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div
            className={`flex flex-col font-outfit text-5xl font-medium leading-tight tracking-wide text-white md:text-6xl lg:text-7xl xl:text-8xl ${textLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ willChange: 'opacity, transform' }}
          >
            <span className="mb-2">Building</span>
            <motion.span
              className="relative mb-2 inline-block font-bold text-primary"
              whileHover={{
                scale: 1.05,
                color: "#78a9ff",
                transition: { duration: 0.3 },
              }}
            >
              SOLUTIONS
              <motion.span
                className="absolute -bottom-2 left-0 h-[4px] w-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.span>
            <span className="mb-2">for every</span>
            <motion.span
              className="relative inline-block font-bold text-primary"
              whileHover={{
                scale: 1.05,
                color: "#78a9ff",
                transition: { duration: 0.3 },
              }}
            >
              STORY
              <motion.span
                className="absolute -bottom-2 left-0 h-[4px] w-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.3, duration: 0.8 }}
              />
            </motion.span>
          </div>
          {/* Enhanced glow effect */}
          <motion.div
            className="absolute -inset-16 -z-10 bg-primary/10 opacity-70 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      )}
    </section>
  )
}
