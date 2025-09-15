"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { ScrollProvider } from "@/components/scroll-provider"
import TechBackground from "@/components/tech-background"
import CustomCursor from "@/components/custom-cursor"
import SlideDeck from "@/components/slides/SlideDeck"
import OptimizedMobileView from "@/components/optimized-mobile-view"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
      <ScrollProvider>
        <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-background to-background/80">
          <OptimizedMobileView />
          <CustomCursor />
          <TechBackground />

          {/* Slide Deck */}
          <SlideDeck />
        </main>
      </ScrollProvider>
    </ThemeProvider>
  )
}
