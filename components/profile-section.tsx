"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import TechCorners from "./tech-corners"
import { useScrollContext } from "./scroll-provider"
import { useEffect, useState, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"

export default function ProfileSection() {
  const { scrollPosition } = useScrollContext()
  const [profileY, setProfileY] = useState(0)
  const [profileScale, setProfileScale] = useState(1)
  const [nameY, setNameY] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [cornerSize, setCornerSize] = useState(0)
  const [imageOpacity, setImageOpacity] = useState(0)
  const [showExtraImages, setShowExtraImages] = useState(false)
  const [isNameHovered, setIsNameHovered] = useState(false)
  const imageRef = useRef(null)
  const isMobile = useMobile()

  // Tech loading animation
  useEffect(() => {
    // Start with small corners
    setCornerSize(0)

    // Animate corners expanding
    const cornerTimer = setTimeout(() => {
      setCornerSize(220)
    }, 500)

    // Fade in image after corners expand
    const imageTimer = setTimeout(() => {
      setImageOpacity(1)
    }, 1000)

    // Show extra images after main image loads
    const extraImagesTimer = setTimeout(() => {
      setShowExtraImages(true)
    }, 1500)

    return () => {
      clearTimeout(cornerTimer)
      clearTimeout(imageTimer)
      clearTimeout(extraImagesTimer)
    }
  }, [])

  // Update values based on scroll position using RAF for smooth animation
  useEffect(() => {
    // Skip scroll animations on mobile for better performance
    if (isMobile) {
      setProfileY(0)
      setProfileScale(1)
      setNameY(0)
      return
    }

    const updateValues = () => {
      setProfileY(scrollPosition * 20)
      setProfileScale(1 + scrollPosition * 0.05)
      setNameY(-scrollPosition * 30)
    }

    // Use requestAnimationFrame for smoother updates
    const rafId = requestAnimationFrame(updateValues)
    return () => cancelAnimationFrame(rafId)
  }, [scrollPosition, isMobile])

  // Desktop animation variants
  const profileVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  // Mobile animation variants - no initial animation
  const mobileProfileVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 },
  }

  // Extra images that will emerge from the main profile picture - using the new images
  const extraImages = [
    {
      src: "/lesmon-speaking-1.png",
      alt: "Lesmon speaking at an event",
      position: { x: -200, y: 0 }, // Left side
      rotation: -5,
      delay: 0.1,
      zIndex: -1, // Behind main image
    },
    {
      src: "/lesmon-speaking-2.png",
      alt: "Lesmon at AWS event",
      position: { x: 200, y: 0 }, // Right side
      rotation: 5,
      delay: 0.2,
      zIndex: -1, // Behind main image
    },
  ]

  return (
    <motion.section
      className="relative z-20 flex flex-col items-center justify-center py-24 text-center"
      initial={isMobile ? "visible" : "hidden"}
      animate="visible"
      variants={isMobile ? mobileProfileVariants : profileVariants}
    >
      {/* Profile image with square tech style */}
      <motion.div
        className="relative mb-12 will-change-transform"
        style={{
          y: profileY,
          scale: profileScale,
          // Use hardware acceleration
          transform: "translateZ(0)",
        }}
        whileHover={
          isMobile
            ? {}
            : {
                scale: 1.05,
                transition: { duration: 0.3 },
              }
        }
      >
        {/* Extra images that emerge from the main profile - now behind and balanced */}
        {showExtraImages &&
          extraImages.map((img, index) => (
            <motion.div
              key={index}
              className="absolute z-0"
              style={{ zIndex: img.zIndex }}
              initial={
                isMobile
                  ? {
                      x: img.position.x,
                      y: img.position.y,
                      scale: 0.9,
                      opacity: 0.7,
                      rotate: img.rotation,
                    }
                  : {
                      x: 0,
                      y: 0,
                      scale: 0.2,
                      opacity: 0,
                      rotate: 0,
                    }
              }
              animate={{
                x: img.position.x,
                y: img.position.y,
                scale: 0.9,
                opacity: 0.7,
                rotate: img.rotation,
              }}
              transition={
                isMobile
                  ? {
                      type: "tween",
                      duration: 0.1,
                    }
                  : {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: img.delay,
                    }
              }
              whileHover={
                isMobile
                  ? {}
                  : {
                      scale: 1,
                      opacity: 0.9,
                      zIndex: 5,
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                    }
              }
            >
              <div className="relative h-[180px] w-[180px] overflow-hidden">
                <TechCorners color="rgba(66, 153, 225, 0.8)" strokeWidth={1.5} animated={!isMobile} />
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  width={180}
                  height={180}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          ))}

        <div className="relative h-[280px] w-[280px] z-10">
          {/* Animated tech corners for profile image */}
          <motion.div
            initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TechCorners
              color="rgba(66, 153, 225, 0.8)"
              size={cornerSize}
              strokeWidth={2}
              className="absolute inset-0"
              animated={!isMobile}
            />
          </motion.div>

          {/* Square image with sharp corners - updated to new AWS image */}
          <motion.div
            className="absolute inset-[2px] overflow-hidden"
            initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: imageOpacity }}
            transition={{ duration: isMobile ? 0.1 : 0.8 }}
          >
            <Image
              ref={imageRef}
              src="/lesmon-aws.png"
              alt="Lesmon Andres"
              width={276}
              height={276}
              className="h-full w-full object-cover"
              priority
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>

          {/* Tech glitch effect on hover */}
          <motion.div
            className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* Overlay with tech pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent mix-blend-overlay" />

          {/* Tech loading indicators */}
          <motion.div
            className="absolute bottom-2 right-2 h-3 w-3 rounded-none bg-primary"
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </div>
      </motion.div>

      {/* Container for name and titles with scroll animation but NO hover effect */}
      <motion.div
        className="relative will-change-transform"
        style={{
          y: nameY,
          // Use hardware acceleration
          transform: "translateZ(0)",
        }}
      >
        {/* Name container with its own hover effect */}
        <div className="relative">
          <div className="relative mx-auto w-fit">
            {/* Interactive name container with hover state tracking */}
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setIsNameHovered(true)}
              onMouseLeave={() => setIsNameHovered(false)}
            >
              {/* Container that scales on hover */}
              <motion.div
                className="relative bg-black/40 px-12 py-6 backdrop-blur-md"
                animate={{
                  scale: isNameHovered ? 1.05 : 1,
                  backgroundColor: isNameHovered ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.4)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Tech corners that scale with the container */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: isNameHovered ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <TechCorners color="rgba(66, 153, 225, 0.8)" strokeWidth={2} animated={!isMobile} />
                </motion.div>

                <motion.h1
                  className="text-6xl font-semibold tracking-tight text-white sm:text-7xl"
                  initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: isMobile ? 0 : 0.3, duration: isMobile ? 0.1 : 0.8 }}
                >
                  Lesmon Andres
                </motion.h1>
              </motion.div>
            </div>

            {/* Horizontal line with gradient */}
            <div className="mx-auto mt-1 h-[3px] w-3/4 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          </div>

          {/* Title section with its own independent hover effect */}
          <motion.div
            className="mt-6"
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? 0 : 0.5, duration: isMobile ? 0.1 : 0.6 }}
            whileHover={
              isMobile
                ? {}
                : {
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }
            }
          >
            <div className="font-outfit text-2xl font-medium tracking-wide md:text-3xl">
              {isMobile ? (
                // Mobile version: each label on its own line with alternating colors
                <div className="flex flex-col items-center justify-center space-y-2">
                  <span className="text-primary">Tech Founder</span>
                  <span className="text-white">Software Developer</span>
                  <span className="text-primary">AI Engineer</span>
                  <span className="text-white">Technical Community Builder</span>
                </div>
              ) : (
                // Desktop version: original design
                <>
                  {/* First line: blue, white */}
                  <div className="mb-2 flex flex-wrap items-center justify-center">
                    <span className="text-primary">Tech Founder</span>
                    <span className="mx-3 text-white/50">•</span>
                    <span className="text-white">Software Developer</span>
                  </div>

                  {/* Second line: white, blue */}
                  <div className="flex flex-wrap items-center justify-center">
                    <span className="text-white">AI Engineer</span>
                    <span className="mx-3 text-white/50">•</span>
                    <span className="text-primary">Technical Community Builder</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Subtle glow effect */}
          <motion.div
            className="absolute -inset-8 -z-10 rounded-none bg-primary/5 opacity-50 blur-2xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>
      </motion.div>
    </motion.section>
  )
}
