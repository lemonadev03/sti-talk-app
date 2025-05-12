"use client"

import { useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"

export default function OptimizedMobileView() {
  const isMobile = useMobile()

  useEffect(() => {
    if (!isMobile) return

    // Apply mobile-specific optimizations
    const style = document.createElement("style")
    style.innerHTML = `
      /* Disable animations that cause jank on mobile */
      @media (max-width: 768px) {
        /* Use transform: translate3d for hardware acceleration */
        .will-change-transform {
          transform: translate3d(0, 0, 0);
        }
        
        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        
        /* Optimize paint performance */
        .optimize-paint {
          will-change: auto;
          backface-visibility: hidden;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [isMobile])

  // This component doesn't render anything visible
  return null
}
