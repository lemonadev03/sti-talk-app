import ProfileSection from "@/components/profile-section"
import SocialLinks from "@/components/social-links"
import CompanyContact from "@/components/company-contact"
import FloatingImages from "@/components/floating-images"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollProvider } from "@/components/scroll-provider"
import { Suspense } from "react"
import TechBackground from "@/components/tech-background"
import CustomCursor from "@/components/custom-cursor"
import TechHeader from "@/components/tech-header"
import SkillsTicker from "@/components/skills-ticker"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import OptimizedMobileView from "@/components/optimized-mobile-view"

// Tech skills list
const techSkills = [
  "Backend Engineering",
  "Infrastructure Security",
  "Data Engineering",
  "Data Science",
  "Data Analytics",
  "Cloud Engineering",
]

// Hardcoded URL variables instead of environment variables
const LINKEDIN_URL = "https://linkedin.com/in/lesmonandres"
const TWITTER_URL = "https://twitter.com/lesmonandres"
const FACEBOOK_URL = "https://facebook.com/lesmonandres"
const INSTAGRAM_URL = "https://instagram.com/lesmonandres"
const GITHUB_URL = "https://github.com/lemonadev03"
const BSCALE_URL = "https://bscale.tech"
const EMAIL_ADDRESS = "lesmon@bscale.tech"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
      <ScrollProvider>
        <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-background to-background/80">
          {/* Mobile optimizations */}
          <OptimizedMobileView />

          {/* Custom cursor - only on desktop */}
          <CustomCursor />

          {/* Background */}
          <TechBackground />

          {/* Navbar */}
          <Navbar
            linkedinUrl={LINKEDIN_URL}
            twitterUrl={TWITTER_URL}
            facebookUrl={FACEBOOK_URL}
            instagramUrl={INSTAGRAM_URL}
            githubUrl={GITHUB_URL}
            bscaleUrl={BSCALE_URL}
          />

          {/* Load floating images with suspense */}
          <Suspense fallback={null}>
            <FloatingImages />
          </Suspense>

          <div className="container relative z-10 mx-auto max-w-5xl px-4">
            {/* Hero section - full viewport height */}
            <div id="home" className="flex min-h-screen flex-col justify-center pt-16">
              {/* New tech header - now much larger */}
              <TechHeader />

              {/* Skills ticker */}
              <SkillsTicker skills={techSkills} />
            </div>

            {/* Content sections - now below the fold */}
            <div className="space-y-16 py-16">
              <div id="about">
                <ProfileSection />
              </div>
              <div id="connect">
                <SocialLinks
                  linkedinUrl={LINKEDIN_URL}
                  twitterUrl={TWITTER_URL}
                  facebookUrl={FACEBOOK_URL}
                  instagramUrl={INSTAGRAM_URL}
                  emailAddress={EMAIL_ADDRESS}
                />
              </div>
              <div id="contact">
                <CompanyContact bscaleUrl={BSCALE_URL} />
              </div>
              {/* <WipSection /> */}
            </div>
          </div>

          {/* Footer */}
          <Footer
            linkedinUrl={LINKEDIN_URL}
            twitterUrl={TWITTER_URL}
            facebookUrl={FACEBOOK_URL}
            instagramUrl={INSTAGRAM_URL}
            githubUrl={GITHUB_URL}
            bscaleUrl={BSCALE_URL}
            emailAddress={EMAIL_ADDRESS}
          />
        </main>
      </ScrollProvider>
    </ThemeProvider>
  )
}
