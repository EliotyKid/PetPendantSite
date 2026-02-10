"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowUpRight, ArrowUp, Plus } from "lucide-react"

// --- COMPONENTE AUXILIAR: ACORDEÃO MOBILE ---
const MobileAccordion = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-neutral-800 last:border-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-sm font-medium uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className="w-4 h-4 text-neutral-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 flex flex-col gap-4 pl-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Footer = () => {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Links comuns para reuso
  const sitemapLinks = ["Home", "Customize", "Our Story", "Reviews"]
  const socialLinks = ["Instagram", "Twitter", "LinkedIn", "Pinterest"]

  return (
    <footer className="relative bg-black text-neutral-100 pt-16 md:pt-24 pb-8 px-4 md:px-6 overflow-hidden w-svw">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-20">

        {/* Separador Desktop */}
        <div className="hidden md:block w-full h-1px bg-neutral-800" />

        {/* 2. LAYOUT DESKTOP (GRID) */}
        <div className="hidden md:grid grid-cols-4 gap-4">
          {/* ... (Mesmo código desktop anterior) ... */}
           {/* Coluna 1: Brand */}
           <div className="flex flex-col gap-4">
            <h4 className="text-xl font-bold">Timeless.</h4>
            <span className="text-neutral-500 text-sm">© 2024 Timeless Inc.</span>
          </div>

          {/* Coluna 2: Sitemap */}
          <div className="flex flex-col gap-4">
            <h5 className="text-neutral-500 text-xs uppercase tracking-widest mb-2">Sitemap</h5>
            {sitemapLinks.map((item) => (
              <Link key={item} href="#" className="w-fit text-lg hover:text-neutral-400 transition-colors">
                {item}
              </Link>
            ))}
          </div>

          {/* Coluna 3: Socials */}
          <div className="flex flex-col gap-4">
            <h5 className="text-neutral-500 text-xs uppercase tracking-widest mb-2">Socials</h5>
            {socialLinks.map((item) => (
              <Link key={item} href="#" className="w-fit flex items-center gap-2 group">
                <span className="text-lg text-neutral-300 group-hover:text-white">{item}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </Link>
            ))}
          </div>

          {/* Coluna 4: Time */}
          <div className="flex flex-col justify-between">
            <p className="text-lg font-mono text-neutral-300">{time}</p>
          </div>
        </div>

        {/* 3. LAYOUT MOBILE (ACCORDIONS) */}
        <div className="md:hidden flex flex-col border-t border-neutral-800">
          
          <MobileAccordion title="Sitemap">
            {sitemapLinks.map((item) => (
              <Link key={item} href="#" className="text-lg text-neutral-300 hover:text-white">
                {item}
              </Link>
            ))}
          </MobileAccordion>

          <MobileAccordion title="Socials">
            {socialLinks.map((item) => (
              <Link key={item} href="#" className="flex items-center gap-2 text-lg text-neutral-300 hover:text-white">
                {item} <ArrowUpRight className="w-4 h-4" />
              </Link>
            ))}
          </MobileAccordion>
          
          <MobileAccordion title="Info">
             <p className="text-neutral-400">São Paulo, Brazil</p>
             <p className="font-mono text-neutral-400">{time}</p>
             <p className="text-neutral-500 text-sm mt-2">© 2024 Timeless Inc.</p>
          </MobileAccordion>

        </div>

        {/* 4. RODAPÉ INFERIOR */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:pt-8">
            <p className="text-[10px] md:text-xs text-neutral-600 uppercase tracking-widest">
                Privacy Policy • Terms
            </p>

            <button 
                onClick={scrollToTop}
                className="w-full md:w-auto py-4 md:py-0 border md:border-none border-neutral-800 rounded-full md:rounded-none group flex items-center justify-center gap-2 text-xs uppercase tracking-widest hover:text-white transition-colors"
            >
                Back to top
                <div className="w-8 h-8 rounded-full md:border border-neutral-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <ArrowUp className="w-4 h-4" />
                </div>
            </button>
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>
    </footer>
  )
}

export default Footer