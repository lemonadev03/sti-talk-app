"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useScrollContext } from "./scroll-provider"
import { useMobile } from "@/hooks/use-mobile"

export default function FloatingImages() {
  // Use optimized scroll context instead of direct scroll hook
  const { scrollPosition, isScrolling } = useScrollContext()
  const containerRef = useRef<HTMLDivElement>(null)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [imagesReady, setImagesReady] = useState(0)
  const totalImages = 7
  const transformsRef = useRef([])
  const animationFrameRef = useRef(null)

  const isMobile = useMobile()

  // Preload images to avoid stutter
  useEffect(() => {
    const imageUrls = [
      "/floating-image-1.png",
      "/floating-image-2.png",
      "/floating-image-3.png",
      "/floating-image-4.png",
      "/floating-image-5.png",
      "/floating-image-6.png",
      "/floating-image-7.png",
    ]

    imageUrls.forEach((src) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImagesReady((prev) => {
          const newCount = prev + 1
          if (newCount === totalImages) {
            setIsLoaded(true)
          }
          return newCount
        })
      }
      img.onerror = () => {
        setImagesReady((prev) => {
          const newCount = prev + 1
          if (newCount === totalImages) {
            setIsLoaded(true)
          }
          return newCount
        })
      }
    })

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Initialize transform values for each image
  useEffect(() => {
    // Initialize with default values
    transformsRef.current = Array(7)
      .fill(0)
      .map((_, index) => ({
        y: 0,
        rotate: 0,
        x: 0,
        targetY: 0,
        targetRotate: 0,
        targetX: 0,
      }))

    // Animation loop for smooth transitions
    const animate = () => {
      let needsUpdate = false

      // Update each transform with smooth interpolation
      transformsRef.current = transformsRef.current.map((transform, index) => {
        const { targetY, targetRotate, targetX, y, rotate, x } = transform

        // Calculate new values with smooth interpolation
        const newY = y + (targetY - y) * 0.05
        const newRotate = rotate + (targetRotate - rotate) * 0.05
        const newX = x + (targetX - x) * 0.05

        // Check if we need to continue animating
        if (
          Math.abs(newY - targetY) > 0.01 ||
          Math.abs(newRotate - targetRotate) > 0.01 ||
          Math.abs(newX - targetX) > 0.01
        ) {
          needsUpdate = true
        }

        return {
          y: newY,
          rotate: newRotate,
          x: newX,
          targetY,
          targetRotate,
          targetX,
        }
      })

      // Force re-render if needed
      if (needsUpdate) {
        setForceUpdate((prev) => prev + 1)
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        animationFrameRef.current = null
      }
    }

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Update target values based on scroll position
  useEffect(() => {
    // Skip all parallax effects on mobile for better performance
    if (isMobile) return

    // Don't update during active scrolling to prevent jank
    if (isScrolling && transformsRef.current.length) return

    // Update target values with parallax effect (slower scroll rate)
    // Parallax factor: 0.6 means images scroll at 60% the speed of normal content
    const parallaxFactor = 0.6
    const parallaxScrollPosition = scrollPosition * parallaxFactor

    // Update target values
    transformsRef.current = transformsRef.current.map((transform, index) => {
      // Use parallax scroll position for Y movement
      const baseY = parallaxScrollPosition * (40 + index * 10)
      const baseRotate = Math.sin(scrollPosition * Math.PI) * (index % 2 === 0 ? -3 : 3)
      const baseX = Math.sin(scrollPosition * Math.PI * 2) * (5 + index * 2) * (index % 2 === 0 ? 1 : -1)

      return {
        ...transform,
        targetY: baseY,
        targetRotate: baseRotate,
        targetX: baseX,
      }
    })

    // Start animation if not already running
    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(function animate() {
        let needsUpdate = false

        // Update each transform with smooth interpolation
        transformsRef.current = transformsRef.current.map((transform) => {
          const { targetY, targetRotate, targetX, y, rotate, x } = transform

          // Calculate new values with smooth interpolation
          const newY = y + (targetY - y) * 0.05
          const newRotate = rotate + (targetRotate - rotate) * 0.05
          const newX = x + (targetX - x) * 0.05

          // Check if we need to continue animating
          if (
            Math.abs(newY - targetY) > 0.01 ||
            Math.abs(newRotate - targetRotate) > 0.01 ||
            Math.abs(newX - targetX) > 0.01
          ) {
            needsUpdate = true
          }

          return {
            y: newY,
            rotate: newRotate,
            x: newX,
            targetY,
            targetRotate,
            targetX,
          }
        })

        // Force re-render if needed
        if (needsUpdate) {
          setForceUpdate((prev) => prev + 1)
          animationFrameRef.current = requestAnimationFrame(animate)
        } else {
          animationFrameRef.current = null
        }
      })
    }
  }, [scrollPosition, isScrolling, isMobile])

  // Force re-render when transforms update
  const [forceUpdate, setForceUpdate] = useState(0)

  // Standardized image sizes - slightly varied for visual interest
  const standardSizes = [
    { width: 280, height: 280 }, // Standard
    { width: 260, height: 260 }, // Slightly smaller
    { width: 240, height: 240 }, // Even smaller
    { width: 220, height: 220 }, // Smallest
  ]

  // Images configuration - alternating left-right pattern with responsive positioning
  // Added more spacing between images
  const images = [
    {
      src: "/floating-image-1.png",
      alt: "Tech image 1",
      initialX: "12%", // Left side - adjusted for spacing
      initialY: "8%", // Higher up - adjusted for spacing
      size: standardSizes[0],
      mobilePosition: { x: "8%", y: "6%" },
    },
    {
      src: "/floating-image-2.png",
      alt: "Tech image 2",
      initialX: "70%", // Right side - adjusted for spacing
      initialY: "12%", // Higher up - adjusted for spacing
      size: standardSizes[0],
      mobilePosition: { x: "65%", y: "10%" },
    },
    {
      src: "/floating-image-3.png",
      alt: "Tech image 3",
      initialX: "5%", // Further left - adjusted for spacing
      initialY: "45%", // Middle - adjusted for spacing
      size: standardSizes[1],
      mobilePosition: { x: "3%", y: "40%" },
    },
    {
      src: "/floating-image-4.png",
      alt: "Tech image 4",
      initialX: "78%", // Further right - adjusted for spacing
      initialY: "50%", // Middle - adjusted for spacing
      size: standardSizes[1],
      mobilePosition: { x: "70%", y: "45%" },
    },
    {
      src: "/floating-image-5.png", // New image
      alt: "Tech image 5",
      initialX: "42%", // Center - adjusted for spacing
      initialY: "3%", // Very top - adjusted for spacing
      size: standardSizes[2],
      mobilePosition: { x: "38%", y: "3%" },
    },
    {
      src: "/floating-image-6.png", // New image
      alt: "Tech image 6",
      initialX: "22%", // Left-center - adjusted for spacing
      initialY: "28%", // Upper middle - adjusted for spacing
      size: standardSizes[3],
      mobilePosition: { x: "18%", y: "25%" },
    },
    {
      src: "/floating-image-7.png", // New image
      alt: "Tech image 7",
      initialX: "60%", // Right-center - adjusted for spacing
      initialY: "33%", // Upper middle - adjusted for spacing
      size: standardSizes[3],
      mobilePosition: { x: "55%", y: "30%" },
    },
  ]

  // If images aren't loaded yet, don't render anything to avoid layout shifts
  if (!isLoaded) return null

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {images.map((image, index) => {
        // Use mobile positions on small screens
        const positionX = isMobile ? image.mobilePosition.x : image.initialX
        const positionY = isMobile ? image.mobilePosition.y : image.initialY

        // Adjust size for mobile
        const imageSize = isMobile
          ? {
              width: image.size.width * 0.7,
              height: image.size.height * 0.7,
            }
          : image.size

        // Calculate depth factor (0-1) based on index for varying effects
        const depthFactor = index / (images.length - 1)
        // More distant images are more blurred and less opaque
        const blurAmount = 2 + Math.floor(depthFactor * 6)
        const opacityValue = 0.4 - depthFactor * 0.15

        // Get current transform values
        const transforms = transformsRef.current[index] || { y: 0, rotate: 0, x: 0 }

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: positionX,
              top: positionY,
              width: imageSize.width,
              height: imageSize.height,
              // Only apply transforms on desktop
              ...(isMobile
                ? {}
                : {
                    y: transforms.y,
                    rotate: transforms.rotate,
                    x: transforms.x,
                  }),
              // Add z-index to control stacking on mobile
              zIndex: isMobile ? images.length - index : 0,
              // Use hardware acceleration only on desktop
              transform: isMobile ? "none" : "translateZ(0)",
              willChange: isMobile ? "auto" : "transform",
            }}
            // Disable initial animation on mobile
            initial={{ opacity: isMobile ? opacityValue : 0 }}
            animate={{
              opacity: opacityValue,
              transition: {
                opacity: { duration: isMobile ? 0.1 : 0.8, delay: isMobile ? 0 : index * 0.05 },
              },
            }}
          >
            {/* Keep bobbing animation for both mobile and desktop */}
            <motion.div
              className="relative h-full w-full overflow-hidden rounded-xl shadow-xl"
              animate={{
                y: [-(5 + index * 2), 5 + index * 2, -(5 + index * 2)],
              }}
              transition={{
                y: {
                  duration: 4 + index * 0.5, // Different duration for each image
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
            >
              {/* Glow effect behind the image - less intense */}
              <div className={`absolute -inset-2 bg-primary/${Math.max(5, 20 - index * 3)} blur-xl`} />

              {/* Image with blur overlay - using object-cover to maintain aspect ratio */}
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <div className="relative h-full w-full">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    style={{
                      filter: `brightness(0.85) contrast(1.05) opacity(${opacityValue}) blur(${blurAmount / 4}px)`, // Varying blur based on depth
                    }}
                  />
                </div>

                {/* Overlay with blur and reduced intensity */}
                <div className={`absolute inset-0 bg-primary/5 mix-blend-overlay backdrop-blur-${blurAmount}`} />

                {/* Rounded border */}
                <div className="absolute inset-0 rounded-xl border border-white/10" />
              </div>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
