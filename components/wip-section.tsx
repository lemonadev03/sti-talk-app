"use client"

import { motion } from "framer-motion"
import { Construction, Code, Sparkles } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import TechCorners from "./tech-corners"
import { useScrollContext } from "./scroll-provider"
import { useInView } from "framer-motion"

export default function WipSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { scrollPosition } = useScrollContext()
  const [titleY, setTitleY] = useState(0)
  const [containerY, setContainerY] = useState(0)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Update values based on scroll position using RAF for smooth animation
  useEffect(() => {
    const updateValues = () => {
      setTitleY(-scrollPosition * 15)
      setContainerY(-scrollPosition * 10)
    }

    // Use requestAnimationFrame for smoother updates
    const rafId = requestAnimationFrame(updateValues)
    return () => cancelAnimationFrame(rafId)
  }, [scrollPosition])

  const containerVariants = isMobile
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      }

  const itemVariants = isMobile
    ? { hidden: { y: 0, opacity: 1 }, visible: { y: 0, opacity: 1 } }
    : {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }

  return (
    <section ref={ref} className="relative z-20 py-16">
      <motion.div
        className="relative mx-auto mb-10 w-fit will-change-transform"
        initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={isMobile ? { opacity: 1, y: 0 } : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: isMobile ? 0.1 : 0.5, ease: "anticipate" }}
        style={{
          y: isMobile ? 0 : titleY,
          // Use hardware acceleration
          transform: "translateZ(0)",
        }}
      >
        {/* Enhanced section header */}
        <div className="relative bg-black/40 px-10 py-4 backdrop-blur-md">
          <TechCorners color="hsl(var(--brand-strong) / 0.8)" strokeWidth={2} animated={true} />
          <h2 className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-4xl font-semibold tracking-tight text-transparent">
            Coming Soon
          </h2>
        </div>
        <div className="mx-auto mt-1 h-[2px] w-3/4 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
      </motion.div>

      <motion.div
        className="relative mx-auto max-w-3xl overflow-hidden border border-primary/20 bg-black/30 p-10 backdrop-blur-md will-change-transform"
        variants={containerVariants}
        initial="hidden"
        animate={isMobile ? "visible" : isInView ? "visible" : "hidden"}
        style={{
          y: isMobile ? 0 : containerY,
          // Use hardware acceleration
          transform: "translateZ(0)",
        }}
        whileHover={
          isMobile
            ? {}
            : {
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                borderColor: "hsl(var(--brand-strong) / 0.4)",
              }
        }
      >
        {/* Tech corners */}
        <TechCorners color="hsl(var(--brand-strong) / 0.8)" strokeWidth={2} animated={true} />

        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-none bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-none bg-primary/10 blur-3xl" />

        <motion.div className="relative z-10 flex flex-col items-center text-center" variants={itemVariants}>
          <motion.div
            className="mb-6 flex h-20 w-20 items-center justify-center bg-primary/20"
            animate={{
              rotate: [0, 5, -5, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <Construction className="h-10 w-10 text-primary" />
          </motion.div>
          <h3 className="mb-3 text-3xl font-medium">Work in Progress</h3>
          <p className="mb-8 text-xl text-muted-foreground">
            Exciting new content and features are being developed. Stay tuned for updates!
          </p>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
            <motion.div
              className="relative flex items-center border border-border bg-black/50 p-6"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -8,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderColor: "hsl(var(--brand-strong) / 0.5)",
              }}
            >
              {/* Tech corners for card */}
              <TechCorners color="hsl(var(--brand-strong) / 0.6)" strokeWidth={1.5} animated={true} />

              <motion.div
                className="mr-4 flex h-14 w-14 items-center justify-center bg-primary/10"
                whileHover={{
                  rotate: 360,
                  backgroundColor: "hsl(var(--brand-strong) / 0.3)",
                }}
                transition={{ duration: 0.7 }}
              >
                <Code className="h-7 w-7 text-primary" />
              </motion.div>
              <div className="text-left">
                <h4 className="text-xl font-medium">Technical Blog</h4>
                <p className="text-base font-light text-muted-foreground">Sharing insights and expertise</p>
              </div>
            </motion.div>

            <motion.div
              className="relative flex items-center border border-border bg-black/50 p-6"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -8,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderColor: "hsl(var(--brand-strong) / 0.5)",
              }}
            >
              {/* Tech corners for card */}
              <TechCorners color="hsl(var(--brand-strong) / 0.6)" strokeWidth={1.5} animated={true} />

              <motion.div
                className="mr-4 flex h-14 w-14 items-center justify-center bg-primary/10"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Sparkles className="h-7 w-7 text-primary" />
              </motion.div>
              <div className="text-left">
                <h4 className="text-xl font-medium">Project Showcase</h4>
                <p className="text-base font-light text-muted-foreground">Highlighting recent work</p>
              </div>

              {/* Animated particles */}
              <motion.div className="absolute -inset-1 -z-10 opacity-0" whileHover={{ opacity: 1 }}>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-primary"
                    initial={{
                      x: "50%",
                      y: "50%",
                      opacity: 0,
                    }}
                    animate={{
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
