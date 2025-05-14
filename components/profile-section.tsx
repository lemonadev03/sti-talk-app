"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import TechCorners from "./tech-corners"
import { useScrollContext } from "./scroll-provider"
import { useEffect, useState, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { Code, Cpu, Lightbulb, Users } from "lucide-react"

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
  const [nameAnimationComplete, setNameAnimationComplete] = useState(false)

  // Tech loading animation
  useEffect(() => {
    if (isMobile) {
      setCornerSize(220)
      setImageOpacity(1)
      setShowExtraImages(true)
      setNameAnimationComplete(true)
      return
    }
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

    // Set name animation complete after delay
    const nameAnimTimer = setTimeout(() => {
      setNameAnimationComplete(true)
    }, 2000)

    return () => {
      clearTimeout(cornerTimer)
      clearTimeout(imageTimer)
      clearTimeout(extraImagesTimer)
      clearTimeout(nameAnimTimer)
    }
  }, [isMobile])

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

  // Calculate main image size based on device
  const mainImageSize = isMobile ? 220 : 360
  // Calculate side image size based on device
  const sideImageSize = isMobile ? 150 : 220

  // Skill items with icons for both mobile and desktop
  const skillItems = [
    { text: "Tech Founder", icon: <Lightbulb className="h-4 w-4" />, color: "text-primary" },
    { text: "Software Developer", icon: <Code className="h-4 w-4" />, color: "text-white" },
    { text: "AI Engineer", icon: <Cpu className="h-4 w-4" />, color: "text-primary" },
    { text: "Technical Community Builder", icon: <Users className="h-4 w-4" />, color: "text-white" },
  ]

  return (
    <motion.section
      className="relative z-20 flex flex-col items-center justify-center py-24 text-left px-4 md:px-8"
      initial={isMobile ? "visible" : "hidden"}
      animate="visible"
      variants={isMobile ? mobileProfileVariants : profileVariants}
    >
      {/* Tech-inspired abstract background pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary/30 blur-[100px]" />
        <div className="absolute -right-1/4 -bottom-1/4 h-1/2 w-1/2 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute left-1/4 top-1/2 h-1/3 w-1/3 rounded-full bg-primary/15 blur-[80px]" />

        {/* Tech circuit lines */}
        <div className="absolute left-[10%] top-[20%] h-[40%] w-[1px] bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0" />
        <div className="absolute left-[10%] top-[20%] h-[1px] w-[30%] bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
        <div className="absolute right-[20%] top-[30%] h-[1px] w-[20%] bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />
        <div className="absolute right-[20%] top-[30%] h-[30%] w-[1px] bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 w-full max-w-screen-2xl mx-auto">
        {/* Image group container - includes space for side images */}
        <div
          className={`relative flex justify-center items-center self-center${isMobile ? " mt-32 mb-8" : ""}`}
          style={{ width: isMobile ? "auto" : undefined }}
        >
          {/* Profile image with square tech style */}
          <motion.div
            className="relative will-change-transform mx-auto flex items-center justify-center"
            style={{
              y: profileY,
              scale: profileScale,
              // Use hardware acceleration
              transform: "translateZ(0)",
              marginLeft: isMobile ? "0" : `${sideImageSize + 40}px`, // Offset to account for side images
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
            {/* Left side images - now positioned with fixed offsets */}
            {showExtraImages && (
              <>
                {/* Top left image - adjusted for mobile */}
                <motion.div
                  className="absolute z-0"
                  style={{
                    zIndex: -1,
                    left: isMobile ? `calc(-${sideImageSize}px - 10px)` : `-${sideImageSize + 20}px`,
                    top: isMobile ? "30px" : "-30px", // Moved up for better vertical balance
                  }}
                  initial={
                    isMobile
                      ? {
                          opacity: 0.7,
                          scale: 0.9,
                          rotate: -5,
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
                    opacity: 0.7,
                    scale: 0.9,
                    rotate: -5,
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
                          delay: 0.1,
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
                  <div
                    className="relative overflow-hidden"
                    style={{
                      height: `${sideImageSize}px`,
                      width: `${sideImageSize}px`,
                    }}
                  >
                    <TechCorners color="rgba(66, 153, 225, 0.8)" strokeWidth={1.5} animated={!isMobile} />
                    <Image
                      src="/lesmon-aws.png"
                      alt="Lesmon Andres"
                      width={sideImageSize}
                      height={sideImageSize}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Bottom left image - adjusted for mobile */}
                <motion.div
                  className="absolute z-0"
                  style={{
                    zIndex: -1,
                    left: isMobile ? "auto" : `-${sideImageSize + 40}px`,
                    right: isMobile ? `calc(-${sideImageSize}px - 10px)` : "auto",
                    top: isMobile ? "30px" : "180px", // Increased for more vertical distance
                  }}
                  initial={
                    isMobile
                      ? {
                          opacity: 0.7,
                          scale: 0.9,
                          rotate: 5,
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
                    opacity: 0.7,
                    scale: 0.9,
                    rotate: 5,
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
                          delay: 0.2,
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
                  <div
                    className="relative overflow-hidden"
                    style={{
                      height: `${sideImageSize}px`,
                      width: `${sideImageSize}px`,
                    }}
                  >
                    <TechCorners color="rgba(66, 153, 225, 0.8)" strokeWidth={1.5} animated={!isMobile} />
                    <Image
                      src="/lesmon-speaking-2.png"
                      alt="Lesmon at AWS event"
                      width={sideImageSize}
                      height={sideImageSize}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </motion.div>
              </>
            )}

            <div
              className="relative z-10 mx-auto"
              style={{
                height: `${mainImageSize}px`,
                width: `${mainImageSize}px`,
              }}
            >
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
                  src="/lesmon-speaking-1.png"
                  alt="Lesmon speaking at an event"
                  width={mainImageSize - 4}
                  height={mainImageSize - 4}
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
        </div>

        {/* New dynamic name presentation - left aligned with blur background */}
        <motion.div
          className="relative flex flex-col items-start text-left will-change-transform self-center w-full md:flex-grow md:basis-0 md:max-w-2xl"
          style={{
            y: nameY,
            // Use hardware acceleration
            transform: "translateZ(0)",
          }}
        >
          {/* Blur background for text area */}
          <div className="absolute -inset-6 -z-10 rounded-xl bg-black/30 backdrop-blur-md w-[calc(100%+3.5rem)]"></div>

          {/* Content with padding to account for blur background */}
          <div className="p-6 w-full">
            {/* Subtle introduction */}
            <motion.div
              className="mb-2 text-xl md:text-2xl text-muted-foreground font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Hi, I'm
            </motion.div>

            {/* Prominent name with highlight effect */}
            <div className="relative">
              <motion.h1
                className="text-5xl md:text-7xl font-bold tracking-tight text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                onMouseEnter={() => setIsNameHovered(true)}
                onMouseLeave={() => setIsNameHovered(false)}
              >
                Lesmon Andres
              </motion.h1>

              {/* Animated underline that appears after page load */}
              <motion.div
                className="h-[3px] bg-gradient-to-r from-primary/80 via-primary to-primary/80"
                initial={{ width: 0 }}
                animate={{ width: nameAnimationComplete ? "100%" : "0%" }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 1.2 }}
              />

              {/* Soft glow animation */}
              <motion.div
                className="absolute -inset-4 -z-10 rounded-lg bg-primary/5 opacity-0 blur-xl"
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0.9, 1.05, 0.9],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </div>

            {/* Title section with its own independent hover effect */}
            <motion.div
              className="mt-6"
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMobile ? 0 : 0.7, duration: isMobile ? 0.1 : 0.6 }}
              whileHover={
                isMobile
                  ? {}
                  : {
                      scale: 1.02,
                      transition: { duration: 0.3 },
                    }
              }
            >
              <div className="font-outfit text-xl md:text-2xl font-medium tracking-wide">
                <div className="flex flex-col items-start justify-start space-y-3">
                  {skillItems.map((skill, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center ${skill.color}`}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="mr-2">{skill.icon}</span>
                      <span>{skill.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Brief bio text */}
            <motion.p
              className="mt-6 max-w-full text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              If there should be an app for that, we're probably building it!
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
