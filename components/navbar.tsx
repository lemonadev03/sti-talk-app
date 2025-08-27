"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useScrollContext } from "./scroll-provider"
import Image from "next/image"

interface NavbarProps {
  linkedinUrl?: string
  twitterUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  githubUrl?: string
  bscaleUrl?: string
}

export default function Navbar({
  linkedinUrl,
  twitterUrl,
  facebookUrl,
  instagramUrl,
  githubUrl,
  bscaleUrl,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollPosition } = useScrollContext()

  // Update navbar background based on scroll position
  useEffect(() => {
    setScrolled(scrollPosition > 0.02)
  }, [scrollPosition])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Connect", href: "#connect" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <motion.nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/70 backdrop-blur-md" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo/Name */}
          <motion.div
            className="relative flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="#home" className="flex items-center">
              <div className="relative mr-2 h-8 w-8 overflow-hidden">
                <Image
                  src="/la-logo.png"
                  alt="LA Logo"
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xl font-semibold tracking-tight">Lesmon Andres</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 md:flex">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative px-1"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link href={item.href} className="group relative flex items-center px-3 py-2 text-sm font-medium">
                  <span>{item.name}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <motion.button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-black/90 backdrop-blur-md md:hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-16 items-center justify-end px-4">
              <motion.button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-background/80 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center space-y-8 p-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="w-full"
                >
                  <Link
                    href={item.href}
                    className="group flex w-full items-center justify-between border-b border-primary/20 pb-2 text-2xl font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="h-5 w-5 text-primary" />
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center p-8">
              <div className="relative h-12 w-12 overflow-hidden">
                <Image
                  src="/la-logo.png"
                  alt="LA Logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
