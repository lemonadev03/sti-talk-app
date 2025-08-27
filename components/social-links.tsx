"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { Mail, Music, Play } from "lucide-react"

interface SocialLinksProps {
  linkedinUrl: string
  twitterUrl: string
  facebookUrl: string
  instagramUrl: string
  tiktokUrl: string
  youtubeUrl: string
  emailAddress: string
}

export default function SocialLinks({
  linkedinUrl,
  twitterUrl,
  facebookUrl,
  instagramUrl,
  tiktokUrl,
  youtubeUrl,
  emailAddress,
}: SocialLinksProps) {
  const isMobile = useMobile()

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: linkedinUrl,
      color: "bg-[hsl(var(--brand-strong))]",
      hoverBg: "group-hover:bg-[hsl(var(--brand-strong))]",
    },
    {
      name: "TikTok",
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
          <path d="M12.9 2h2.6c.2 1.2.8 2.2 1.7 3 1 .9 2.1 1.4 3.4 1.6v2.7c-1.3 0-2.6-.3-3.8-.9-.5-.2-1-.5-1.4-.8v6.6c0 3.9-3.2 7-7.1 7S2.1 18.1 2.1 14.2c0-3.7 2.7-6.7 6.2-7v2.8c-1.8.3-3.1 1.9-3.1 3.8 0 2.1 1.7 3.8 3.8 3.8s3.9-1.7 3.9-3.8V2z" />
        </svg>
      ),
      href: tiktokUrl,
      color: "bg-[hsl(var(--brand-soft))]",
      hoverBg: "group-hover:bg-[hsl(var(--brand-soft))]",
    },
    {
      name: "Facebook",
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: facebookUrl,
      color: "bg-[hsl(var(--brand-strong))]",
      hoverBg: "group-hover:bg-[hsl(var(--brand-strong))]",
    },
    {
      name: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
      href: instagramUrl,
      color: "bg-[hsl(var(--brand-deep))]",
      hoverBg: "group-hover:bg-[hsl(var(--brand-deep))]",
    },
    {
      name: "X",
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: twitterUrl,
      color: "bg-[hsl(var(--brand-soft))]",
      hoverBg: "group-hover:bg-[hsl(var(--brand-soft))]",
    },
    {
      name: "YouTube",
      icon: (
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
          <path d="M23.5 6.2c-.3-1.2-1.2-2.1-2.3-2.4C19.3 3.3 12 3.3 12 3.3s-7.3 0-9.2.5C1.7 4.1.8 5 .5 6.2 0 8.1 0 12.2 0 12.2s0 4.1.5 6c.3 1.2 1.2 2.1 2.3 2.4 1.9.5 9.2.5 9.2.5s7.3 0 9.2-.5c1.1-.3 2-1.2 2.3-2.4.5-1.9.5-6 .5-6s0-4.1-.5-6zM9.8 15.5V8.5l6.1 3.5-6.1 3.5z" />
        </svg>
      ),
      href: youtubeUrl,
      color: "bg-[hsl(var(--brand-strong))]",
      hoverBg: "group-hover:bg-[hsl(var(--brand-strong))]",
    },
    {
      name: "Email",
      icon: <Mail className="h-8 w-8" />,
      href: `mailto:${emailAddress}`,
      color: "bg-[hsl(var(--brand-strong))]",
      hoverBg: "group-hover:bg-[hsl(var(--brand-strong))]",
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

  // Mobile container variants - no animation
  const mobileContainerVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 },
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
    <section className="relative z-20 py-16">
      <motion.div
        className="relative mx-auto mb-10 w-fit"
        initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: isMobile ? 0.12 : 0.4, ease: "easeOut" }}
      >
        <div className="relative px-0 py-0">
          <h2 className="text-6xl font-extrabold text-white">Let's Connect!</h2>
          <div className="mt-2 h-1 w-full rounded bg-[hsl(var(--brand-strong))]" />
        </div>
      </motion.div>

      <div className="mx-auto w-full max-w-xl space-y-4">
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="group relative block w-full rounded-xl border border-border bg-secondary/20 px-5 py-4 text-foreground transition-colors hover:bg-secondary/30"
            whileHover={isMobile ? {} : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-primary">
              <span className="flex h-8 w-8 items-center justify-center">
                {link.icon}
              </span>
            </span>

            <span className="pointer-events-none block w-full text-center text-lg font-medium">
              {link.name}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
