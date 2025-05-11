"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import TechCorners from "./tech-corners"
import Link from "next/link"
import { ArrowUp, Github, Linkedin, Twitter, Instagram, Facebook, ArrowRight } from "lucide-react"
import Image from "next/image"

interface FooterProps {
  linkedinUrl?: string
  twitterUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  githubUrl?: string
  bscaleUrl?: string
}

export default function Footer({
  linkedinUrl = "https://linkedin.com",
  twitterUrl = "https://twitter.com",
  facebookUrl = "https://facebook.com",
  instagramUrl = "https://instagram.com",
  githubUrl = "https://github.com",
  bscaleUrl = "#",
}: FooterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const currentYear = new Date().getFullYear()

  // Updated navigation links
  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "#home", icon: "home" },
        { name: "About", href: "#about", icon: "user" },
        { name: "Connect", href: "#connect", icon: "link" },
        { name: "Contact", href: "#contact", icon: "mail" },
      ],
    },
  ]

  // Updated social links with icons - now including Facebook
  const socialLinks = [
    { name: "LinkedIn", href: linkedinUrl, icon: <Linkedin className="h-4 w-4 mr-2" /> },
    { name: "Twitter", href: twitterUrl, icon: <Twitter className="h-4 w-4 mr-2" /> },
    { name: "Facebook", href: facebookUrl, icon: <Facebook className="h-4 w-4 mr-2" /> },
    { name: "Instagram", href: instagramUrl, icon: <Instagram className="h-4 w-4 mr-2" /> },
    { name: "GitHub", href: githubUrl, icon: <Github className="h-4 w-4 mr-2" /> },
  ]

  return (
    <footer ref={ref} className="relative z-20 border-t border-primary/20 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand Section - Removed social buttons */}
          <motion.div
            className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-4 flex items-center justify-center sm:justify-start">
              <div className="relative mr-3 h-10 w-10 overflow-hidden">
                <Image
                  src="/la-logo.png"
                  alt="LA Logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xl md:text-2xl font-semibold tracking-tight">Lesmon Andres</span>
            </div>
            <p className="text-center sm:text-left text-sm text-muted-foreground">
              Building innovative tech solutions and connecting people with technology that matters.
            </p>
          </motion.div>

          {/* Links Sections - Wrapped in a container for mobile */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:grid-cols-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Navigation Links */}
            <motion.div
              className="col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="mb-4 text-center sm:text-left text-lg font-medium">Navigation</h3>
              <ul className="space-y-2 text-center sm:text-left">
                {footerLinks[0].links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: 0.3 + linkIndex * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center justify-center sm:justify-start text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span className="mr-2 text-primary opacity-0 transition-opacity group-hover:opacity-100">›</span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links - Updated to have icons beside text */}
            <motion.div
              className="col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="mb-4 text-center sm:text-left text-lg font-medium">Social</h3>
              <ul className="space-y-3 text-center sm:text-left">
                {socialLinks.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: 0.4 + linkIndex * 0.05 }}
                  >
                    <motion.a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center justify-center sm:justify-start text-sm text-muted-foreground transition-all duration-200 hover:text-primary"
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center">
                        {link.icon}
                        {link.name}
                      </span>
                      <motion.span
                        className="ml-2 opacity-0 transition-opacity group-hover:opacity-100"
                        initial={{ x: 0 }}
                        whileHover={{ x: 2 }}
                      >
                        <ArrowRight className="h-3 w-3" />
                      </motion.span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Section */}
          <motion.div
            className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-4 text-center sm:text-left text-lg font-medium">Contact</h3>
            <p className="mb-4 text-center sm:text-left text-sm text-muted-foreground">
              Interested in working together? Reach out through Bscale or connect directly.
            </p>
            <div className="flex justify-center sm:justify-start">
              <motion.a
                href={bscaleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TechCorners color="rgba(66, 153, 225, 0.8)" strokeWidth={1.5} />
                <span>Contact via Bscale</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 flex flex-col items-center justify-between border-t border-primary/10 pt-6 md:flex-row">
          <motion.p
            className="mb-4 text-center text-xs sm:text-sm text-muted-foreground md:mb-0 md:text-left"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            © {currentYear} Lesmon Andres. All rights reserved.
          </motion.p>
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href="#home"
              className="group flex items-center text-xs sm:text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowUp className="mr-1 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:-translate-y-1" />
              Back to top
            </Link>
          </motion.div>
        </div>

        {/* Tech Pattern */}
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
        <div className="absolute bottom-0 left-1/4 h-8 w-[1px] bg-gradient-to-b from-primary/30 to-primary/0" />
        <div className="absolute bottom-0 right-1/4 h-12 w-[1px] bg-gradient-to-b from-primary/30 to-primary/0" />
        <div className="absolute bottom-0 left-3/4 h-4 w-[1px] bg-gradient-to-b from-primary/30 to-primary/0" />
      </div>
    </footer>
  )
}
