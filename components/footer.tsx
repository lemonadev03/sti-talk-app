"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import TechCorners from "./tech-corners"
import Link from "next/link"
import { ArrowUp, Github, Linkedin, Twitter, Instagram } from "lucide-react"
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

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Connect", href: "#connect" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Social",
      links: [
        { name: "LinkedIn", href: linkedinUrl },
        { name: "Twitter", href: twitterUrl },
        { name: "GitHub", href: githubUrl },
        { name: "Facebook", href: facebookUrl },
        { name: "Instagram", href: instagramUrl },
      ],
    },
  ]

  const socialIcons = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      href: linkedinUrl,
      color: "hover:bg-[#0077B5]",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      href: twitterUrl,
      color: "hover:bg-[#1DA1F2]",
    },
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      href: githubUrl,
      color: "hover:bg-[#333]",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      href: instagramUrl,
      color: "hover:bg-[#E4405F]",
    },
  ]

  return (
    <footer ref={ref} className="relative z-20 border-t border-primary/20 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand Section */}
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
            <p className="mb-6 text-center sm:text-left text-sm text-muted-foreground">
              Building innovative tech solutions and connecting people with technology that matters.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3">
              {socialIcons.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-9 w-9 items-center justify-center bg-primary/10 text-primary transition-all duration-300 ${social.color} hover:text-white`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections - Wrapped in a container for mobile */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {footerLinks.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                className="col-span-1"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 + sectionIndex * 0.1 }}
              >
                <h3 className="mb-4 text-center sm:text-left text-lg font-medium">{section.title}</h3>
                <ul className="space-y-2 text-center sm:text-left">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, delay: 0.2 + sectionIndex * 0.1 + linkIndex * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="group flex items-center justify-center sm:justify-start text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        <span className="mr-2 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          ›
                        </span>
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
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
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            © {currentYear} Lesmon Andres. All rights reserved.
          </motion.p>
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
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
