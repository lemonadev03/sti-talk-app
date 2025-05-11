"use client"

import { motion } from "framer-motion"

export default function TechHeader() {
  return (
    <section className="relative z-20 flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        className="relative max-w-5xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="flex flex-col font-outfit text-5xl font-medium leading-tight tracking-wide text-white md:text-6xl lg:text-7xl xl:text-8xl"
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.3 },
          }}
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
