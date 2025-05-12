"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export default function TechHeader() {
  const isMobile = useMobile()

  // Mobile variants - no animation
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
      <motion.div
        className="relative max-w-5xl"
        initial={isMobile ? "initial" : "initial"}
        animate="animate"
        variants={isMobile ? mobileVariants : desktopVariants}
        transition={{ duration: isMobile ? 0.1 : 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="flex flex-col font-outfit text-5xl font-medium leading-tight tracking-wide text-white md:text-6xl lg:text-7xl xl:text-8xl"
          whileHover={
            isMobile
              ? {}
              : {
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }
          }
        >
          <span className="mb-2">Building</span>
          <motion.span
            className="relative mb-2 inline-block font-bold text-primary"
            whileHover={
              isMobile
                ? {}
                : {
                    scale: 1.05,
                    color: "#78a9ff",
                    transition: { duration: 0.3 },
                  }
            }
          >
            SOLUTIONS
            <motion.span
              className="absolute -bottom-2 left-0 h-[4px] w-full bg-primary"
              initial={isMobile ? { width: "100%" } : { width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: isMobile ? 0 : 1, duration: isMobile ? 0.1 : 0.8 }}
            />
          </motion.span>
          <span className="mb-2">for every</span>
          <motion.span
            className="relative inline-block font-bold text-primary"
            whileHover={
              isMobile
                ? {}
                : {
                    scale: 1.05,
                    color: "#78a9ff",
                    transition: { duration: 0.3 },
                  }
            }
          >
            STORY
            <motion.span
              className="absolute -bottom-2 left-0 h-[4px] w-full bg-primary"
              initial={isMobile ? { width: "100%" } : { width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: isMobile ? 0 : 1.3, duration: isMobile ? 0.1 : 0.8 }}
            />
          </motion.span>
        </motion.div>

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
    </section>
  )
}
