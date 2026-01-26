"use client"
import type React from "react"
import type { ComponentProps, ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "lucide-react"
import Image from "next/image"

interface FooterLink {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface FooterSection {
  label: string
  links: FooterLink[]
}

const footerLinks: FooterSection[] = [
  {
    label: "Product",
    links: [
      { title: "Features", href: "/features" },
      { title: "AI Team", href: "/ai-team" },
      { title: "ROI Calculator", href: "/roi-calculator" },
      { title: "Integration", href: "/integration" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Contact", href: "/contact" },
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Blog", href: "/blog" },
      { title: "Case Studies", href: "/case-studies" },
      { title: "Documentation", href: "/docs" },
      { title: "Support", href: "/support" },
    ],
  },
  {
    label: "Social Links",
    links: [
      { title: "Facebook", href: "#", icon: FacebookIcon },
      { title: "Instagram", href: "#", icon: InstagramIcon },
      { title: "Youtube", href: "#", icon: YoutubeIcon },
      { title: "LinkedIn", href: "#", icon: LinkedinIcon },
    ],
  },
]

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 px-6 py-8 md:py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8">
        {/* Column 1: Logo */}
        <div className="flex justify-center md:justify-start">
          <Image 
            src="/images/cag-logo.svg" 
            alt="CertainAg Logo" 
            width={156} 
            height={40} 
            className="h-10 w-auto object-contain" 
          />
        </div>

        {/* Column 2: Copyright */}
        <div className="text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} Cropwings Technologies Pvt. Ltd.</p>
          <p className="text-xs mt-1">All rights reserved.</p>
        </div>

        {/* Column 3: Social Icons */}
        <div className="flex justify-center md:justify-end gap-6">
          <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <FacebookIcon size={20} />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <InstagramIcon size={20} />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <YoutubeIcon size={20} />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <LinkedinIcon size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

type ViewAnimationProps = {
  delay?: number
  className?: ComponentProps<typeof motion.div>["className"]
  children: ReactNode
}

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return children
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
