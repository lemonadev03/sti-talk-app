"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Slide from "@/components/slides/Slide"
import { slides } from "@/content/slides"
import { cn } from "@/lib/utils"

export default function SlideDeck() {
  const total = slides.length
  const [index, setIndex] = useState(0)
  

  // Initialize from hash
  useEffect(() => {
    const fromHash = () => {
      const raw = (typeof window !== 'undefined' && window.location.hash.replace('#', '')) || ""
      const num = parseInt(raw, 10)
      if (!isNaN(num) && num >= 1 && num <= total) {
        setIndex(num - 1)
      }
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [total])

  // Persist to hash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const desired = `#${index + 1}`
      if (window.location.hash !== desired) {
        window.location.hash = desired
      }
    }
  }, [index])

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), [])
  const goNext = useCallback(() => setIndex((i) => Math.min(total - 1, i + 1)), [total])
  const goTo = useCallback((i: number) => setIndex(() => Math.min(total - 1, Math.max(0, i))), [total])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        goNext()
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        goPrev()
      }
      if (e.key === 'Home') goTo(0)
      if (e.key === 'End') goTo(total - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev, goTo, total])

  const current = useMemo(() => slides[index], [index])


  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col px-4 pb-28 pt-12">
      {/* Slide viewport */}
      <div className={cn(
        "flex-1",
        "rounded-xl border border-border/40 bg-background/70 backdrop-blur-sm",
        "p-6 sm:p-10 md:p-14"
      )}>
        <AnimatePresence mode="wait">
          <Slide key={current.id} slide={current} />
        </AnimatePresence>
      </div>
    </div>
  )
}
