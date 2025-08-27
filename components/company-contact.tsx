"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import TechCorners from "./tech-corners"
import { useScrollContext } from "./scroll-provider"
import { useInView } from "framer-motion"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"

interface CompanyContactProps {
  bscaleUrl?: string
}

export default function CompanyContact({ bscaleUrl = "#" }: CompanyContactProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { scrollPosition } = useScrollContext()
  const [titleY, setTitleY] = useState(0)
  const [containerY, setContainerY] = useState(0)
  const isMobile = useMobile()

  // Update values based on scroll position using RAF for smooth animation
  useEffect(() => {
    // Skip scroll animations on mobile for better performance
    if (isMobile) return

    const updateValues = () => {
      setTitleY(-scrollPosition * 15)
      setContainerY(-scrollPosition * 10)
    }

    // Use requestAnimationFrame for smoother updates
    const rafId = requestAnimationFrame(updateValues)
    return () => cancelAnimationFrame(rafId)
  }, [scrollPosition, isMobile])

  // Check if the BSCALE_URL is valid
  const hasValidUrl = bscaleUrl !== "#"

  return (
    <section ref={ref} className="relative z-20 py-16">
      <motion.div
        className="relative mx-auto mb-10 w-fit will-change-transform"
        initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: isMobile ? 0.1 : 0.5, ease: "anticipate" }}
        style={{
          y: isMobile ? 0 : titleY,
          // Use hardware acceleration
          transform: "translateZ(0)",
        }}
      >
        {/* Enhanced section header - now "Contact Bscale" */}
        <div className="relative px-0 py-0">
          <h2 className="text-6xl font-extrabold text-white">Contact Us</h2>
          <div className="mt-2 h-1 w-full rounded bg-[hsl(var(--brand-strong))]" />
        </div>
      </motion.div>

      <motion.div
        initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: isMobile ? 0.1 : 0.5, delay: isMobile ? 0 : 0.2, ease: "anticipate" }}
        className="mx-auto max-w-4xl will-change-transform"
        style={{
          y: isMobile ? 0 : containerY,
          // Use hardware acceleration
          transform: "translateZ(0)",
        }}
      >
        <motion.a
          href={bscaleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col md:flex-row items-center justify-between overflow-hidden border border-primary/20 bg-black/30 p-8 shadow-sm transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
          whileHover={
            isMobile
              ? {}
              : {
                  scale: 1.02,
                  boxShadow: "0 25px 35px -12px rgba(0, 0, 0, 0.2), 0 15px 20px -10px rgba(0, 0, 0, 0.1)",
                  y: -8,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderColor: "hsl(var(--brand-strong) / 0.5)",
                }
          }
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            if (!hasValidUrl) {
              e.preventDefault()
              console.log("Bscale URL is not set or is invalid")
              alert("Bscale URL is not configured properly.")
            }
          }}
        >
          {/* Tech corners */}
          <TechCorners color="hsl(var(--brand-strong) / 0.8)" strokeWidth={2} animated={!isMobile} />

          <div className="flex flex-col md:flex-row items-center w-full">
            {/* Bscale Logo */}
            <div className="mb-6 md:mb-0 md:mr-8 w-48 h-auto">
              <Image src="/bscale-logo.png" alt="Bscale Logo" width={200} height={80} className="w-full h-auto" />
            </div>

            {/* Content - now with "Need tech solution for your business?" as the heading */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-medium mb-3">Need tech solutions for your business?</h3>
              <p className="text-lg font-light text-muted-foreground mb-4">
                Let's supercharge your business with modern technology. At Bscale, you'll never fall behind.
              </p>

              <motion.div
                className="flex justify-center md:justify-start items-center text-primary"
                initial={{ x: 0, opacity: 0.7 }}
                whileHover={isMobile ? {} : { x: 5, opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <span className="mr-2">Learn more</span>
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </div>
          </div>

          {/* URL status indicator */}
          {!hasValidUrl && <div className="absolute bottom-2 right-2 text-xs text-red-500">URL not configured</div>}

          {/* Animated background glow effect - disabled on mobile */}
          {!isMobile && (
            <motion.div
              className="absolute -inset-1 -z-10 bg-primary/10 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          )}
        </motion.a>
      </motion.div>
    </section>
  )
}
