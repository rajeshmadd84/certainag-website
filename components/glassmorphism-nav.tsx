"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const navigation = [
  { name: "Problem", href: "#problem" },
  { name: "CertainAg AI", href: "#ai-team" },
  { name: "Contact", href: "#contact" },
]

export function GlassmorphismNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true)
    }, 100)

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY

        console.log("[v0] Scroll event - currentScrollY:", currentScrollY, "lastScrollY:", lastScrollY.current)

        // Always show navbar
        setIsVisible(true)

        lastScrollY.current = currentScrollY
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar, { passive: true })
      console.log("[v0] Scroll listener added")

      return () => {
        window.removeEventListener("scroll", controlNavbar)
        clearTimeout(timer)
        console.log("[v0] Scroll listener removed")
      }
    }

    return () => clearTimeout(timer)
  }, []) // Removed lastScrollY dependency to prevent infinite re-renders

  const scrollToTop = () => {
    console.log("[v0] Scrolling to top")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) {
      return
    }

    console.log("[v0] Attempting to scroll to:", href)
    const element = document.querySelector(href)
    if (element) {
      console.log("[v0] Found element:", element)

      const rect = element.getBoundingClientRect()
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
      const elementAbsoluteTop = rect.top + currentScrollY
      const navbarHeight = 100
      const targetPosition = Math.max(0, elementAbsoluteTop - navbarHeight)

      console.log("[v0] Element rect.top:", rect.top)
      console.log("[v0] Current scroll position:", currentScrollY)
      console.log("[v0] Element absolute top:", elementAbsoluteTop)
      console.log("[v0] Target scroll position:", targetPosition)

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    } else {
      console.log("[v0] Element not found for:", href)
    }
    setIsOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 transition-all duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 md:-translate-y-24 opacity-0"
        } ${hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{
          transition: hasLoaded ? "all 0.5s ease-out" : "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        {/* Logo Block */}
        <div className="bg-white border border-white/20 rounded-full px-6 py-2 shadow-lg flex items-center h-12 md:h-16">
          <Link
            href="/"
            className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            <Image
              src="/images/cag-logo.svg"
              alt="CertainAg"
              width={156}
              height={36}
              className="h-8 md:h-9 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation Block */}
        <div className="hidden md:flex bg-white border border-white/20 rounded-full px-8 py-2 shadow-lg items-center h-16">
          <div className="flex items-center space-x-8">
            {navigation.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-900/80 hover:text-slate-900 hover:scale-105 transition-all duration-200 font-bold text-lg cursor-pointer whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-slate-900/80 hover:text-slate-900 hover:scale-105 transition-all duration-200 font-bold text-lg cursor-pointer whitespace-nowrap"
                >
                  {item.name}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Mobile Menu Trigger Block */}
        <div className="md:hidden bg-white border border-white/20 rounded-full px-4 py-2 shadow-lg flex items-center h-12">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-900 hover:scale-110 transition-transform duration-200 cursor-pointer"
          >
            <div className="relative w-6 h-6">
              <Menu
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown - Positioned absolutely below the trigger */}
        <div className="md:hidden absolute top-full left-0 right-0 mt-2">
          <div
            className={`w-[90vw] max-w-xs mx-auto transition-all duration-500 ease-out transform-gpu ${
              isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
            }`}
          >
            <div className="bg-white border border-white/20 rounded-2xl p-4 shadow-2xl">
              <div className="flex flex-col space-y-1">
                {navigation.map((item, index) =>
                  item.href.startsWith("/") ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-slate-900/80 hover:text-slate-900 hover:bg-black/5 rounded-lg px-3 py-3 text-left transition-all duration-300 font-bold text-lg cursor-pointer transform hover:scale-[1.02] hover:translate-x-1 ${
                        isOpen ? "animate-mobile-menu-item" : ""
                      }`}
                      style={{
                        animationDelay: isOpen ? `${index * 80 + 100}ms` : "0ms",
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={`text-slate-900/80 hover:text-slate-900 hover:bg-black/5 rounded-lg px-3 py-3 text-left transition-all duration-300 font-bold text-lg cursor-pointer transform hover:scale-[1.02] hover:translate-x-1 ${
                        isOpen ? "animate-mobile-menu-item" : ""
                      }`}
                      style={{
                        animationDelay: isOpen ? `${index * 80 + 100}ms` : "0ms",
                      }}
                    >
                      {item.name}
                    </button>
                  ),
                )}
                <div className="h-px bg-black/10 my-2" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Backdrop - Moved outside the nav flex container to cover full screen correctly */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
    </>
  )
}
