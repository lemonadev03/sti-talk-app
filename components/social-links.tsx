"use client"

import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import TechCorners from "./tech-corners"
import { useScrollContext } from "./scroll-provider"
import { useInView } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

interface SocialLinksProps {
  linkedinUrl?: string
  twitterUrl?: string
  facebookUrl?: string
  instagramUrl?: string
}

export default function SocialLinks({
  linkedinUrl = "https://www.linkedin.com/in/lesmonandres/",
  twitterUrl = "https://x.com/lesmonandres",
  facebookUrl = "https://www.facebook.com/lesmonandres/",
  instagramUrl = "https://instagram.com/lesmonandres",
}: SocialLinksProps) {
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

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: linkedinUrl,
      color: "bg-[#0077B5]",
      hoverBg: "group-hover:bg-[#0077B5]",
    },
    {
      name: "Twitter/X",
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: twitterUrl,
      color: "bg-[#1DA1F2]",
      hoverBg: "group-hover:bg-[#1DA1F2]",
    },
    {
      name: "Facebook",
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: facebookUrl,
      color: "bg-[#1877F2]",
      hoverBg: "group-hover:bg-[#1877F2]",
    },
    {
      name: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
      href: instagramUrl,
      color: "bg-[#E4405F]",
      hoverBg: "group-hover:bg-[#E4405F]",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  // Simplified transition for mobile
  const mobileTransition = {
    type: "tween",
    duration: 0.15,
    ease: "easeOut",
  }

  // More complex transition for desktop
  const desktopTransition = {
    type: "spring",
    stiffness: 500,
    damping: 30,
    mass: 1,
  }

  // Choose appropriate transition based on device
  const transition = isMobile ? mobileTransition : desktopTransition

  return (
    <section ref={ref} className="relative z-20 py-16">
      <motion.div
        className="relative mx-auto mb-10 w-fit"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "anticipate" }}
        style={{
          y: isMobile ? 0 : titleY,
          // Use hardware acceleration
          transform: "translateZ(0)",
          willChange: isMobile ? "auto" : "transform",
        }}
      >
        {/* Enhanced section header - renamed to Let's Connect */}
        <div className="relative bg-black/40 px-10 py-4 backdrop-blur-md">
          <TechCorners color="rgba(66, 153, 225, 0.8)" strokeWidth={2} animated={!isMobile} />
          <h2 className="text-4xl font-semibold tracking-tight text-white">Let's Connect!</h2>
        </div>
        <div className="mx-auto mt-1 h-[2px] w-3/4 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-4"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        style={{
          y: isMobile ? 0 : containerY,
          // Use hardware acceleration
          transform: "translateZ(0)",
          willChange: isMobile ? "auto" : "transform",
        }}
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center justify-center border border-border bg-black/30 p-6 sm:p-8 shadow-sm backdrop-blur-sm"
            whileHover={
              isMobile
                ? {}
                : {
                    scale: 1.08,
                    y: -10,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(66, 153, 225, 0.5)",
                    boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.2), 0 10px 15px -5px rgba(0, 0, 0, 0.1)",
                    transition: transition,
                  }
            }
            whileTap={{
              scale: 0.95,
              transition: transition,
            }}
            // Stagger the initial load animation for smoother appearance
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: isMobile ? 0.05 * index : 0.1 + index * 0.05,
              ease: "easeOut",
            }}
          >
            {/* Tech corners for each social link - disable animation on mobile */}
            <TechCorners color="rgba(66, 153, 225, 0.8)" strokeWidth={2} animated={!isMobile} />

            <motion.div
              className={`mb-4 flex h-16 w-16 items-center justify-center bg-primary/10 text-primary ${link.hoverBg} group-hover:text-white`}
              transition={transition}
            >
              {link.icon}
            </motion.div>
            <span className="text-lg font-medium">{link.name}</span>

            {/* Animated glow effect on hover - disable on mobile */}
            {!isMobile && (
              <motion.div
                className="absolute inset-0 -z-10 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100"
                transition={transition}
              />
            )}
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}
