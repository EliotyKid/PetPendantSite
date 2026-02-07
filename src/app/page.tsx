"use client";

import ExperienceHome from "@/components/ExperienceHome";
import Preloader from "@/components/Preloader";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MaskedText from "@/components/MaskedText";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Card from "@/components/Card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [is3dReady, setIs3dReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.cursor = 'default'
      window.scrollTo(0, 0)
      setTimeout(() => setIs3dReady(true), 800) 
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <main className="h-750">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      <section className="fixed inset-0 h-screen z-0 pointer-events-none w-svw">
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 0, 8], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ExperienceHome isLoading={isLoading} />
        </Canvas>
      </section>

      {/* --- SEÇÃO HERO --- */}

      <div className="relative z-10 w-svw ">
        <section className="h-screen flex flex-col items-center justify-center relative px-6" id="hero">
          {is3dReady && (
            <div className="max-w-5xl w-full flex flex-col gap-8 items-center text-center mt-32 md:mt-0">
              
              <div className="flex flex-col gap-2 md:gap-4 items-center">
                <MaskedText delay={0}>
                   <h1 className="text-5xl md:text-[170px] font-bold leading-[1.1] font-moara text-primary">
                    ETERNAL BOND
                  </h1>
                </MaskedText>
                
                <MaskedText delay={0.2}>
                   <h1 className="text-5xl md:text-7xl font-bold text-secondary tracking-tighter leading-[1.1] font-montserrat ">
                    With Your Pet.
                  </h1>
                </MaskedText>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex flex-col items-center gap-8"
              >
                <p className="text-lg md:text-xl text-secondary max-w-lg leading-relaxed font-montserrat ">
                  Handcrafted custom jewelry from your best friend's photo. Keep them by your side forever in Gold, Silver, or Rose Gold.
                </p>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <Link href="/customize">
                    <Button size="lg" className="rounded-full px-8 text-base cursor-pointer">
                      Start Customizing
                    </Button>
                  </Link>

                  {/* --- BOTÃO MODIFICADO --- */}
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    onClick={() => handleScroll("how-works")}
                    className="rounded-full px-8 text-base  hover:text-white hover:bg-white/10 cursor-pointer"
                  >
                    How it works
                  </Button>

                </div>
              </motion.div>
            </div>
          )}

          {/* Scroll Indicator */}
          {is3dReady && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] uppercase tracking-widest text-neutral-600">Scroll</span>
              <div className="w-px h-12 bg-linear-to-b from-neutral-600 to-transparent" />
            </motion.div>
          )}
        </section>
         
      </div>

      <section className="h-[20vh]"></section>

      {/* --- SEÇÃO "HOW IT WORKS" CARDS --- */}

       <section 
          id="how-works" 
          className="min-h-screen flex flex-col items-center gap-24 py-24 px-4 bg-white/2 backdrop-blur-sm"
        >
          <Card 
            path="/images/circle.webp"
            title="1. Personalize"
            category="Select the Moment"
            description="Upload your favorite photo. Our circular design perfectly frames the face you adore."
          />
          <Card 
            invert 
            path="/images/heart.webp"
            title="2. We Craft"
            category="Etched in Time"
            description="We precision-engrave every detail, creating a tangible connection to keep close to your heart."
          />
          <Card 
            path="/images/rectangle.webp"
            title="3. You Cherish"
            category="Forever Yours"
            description="Delivered to your door. A sleek, modern tribute ready to keep your pet's spirit with you, always."
          />
        </section>

      <section className="relative bg-black text-neutral-100 py-20 md:py-32 px-4 md:px-6 overflow-hidden" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
        
        {/* Título Gigante */}
        <div className="flex flex-col">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter leading-[0.9] text-center md:text-left"
          >
            READY TO <br />
            <span className="text-neutral-600">IMMORTALIZE?</span>
          </motion.h2>
        </div>

        {/* Bloco de Ação (Botão + Texto) */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 md:gap-0">
          
          {/* Botão Principal */}
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 0.8 }}
             className="w-full md:w-auto"
          >
            <Link href="/customize" className="block w-full md:w-auto">
              <Button 
                size="lg" 
                className="w-full md:w-auto rounded-full h-16 md:h-20 px-10 md:px-14 text-lg md:text-2xl bg-white text-black hover:bg-neutral-200 hover:scale-105 transition-all duration-300 gap-4 group"
              >
                Create My Pendant
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
          
          {/* Descrição Lateral */}
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-neutral-400 max-w-xs text-center md:text-right text-sm md:text-base leading-relaxed"
          >
            Don't let the memory fade. Turn your favorite photo into a heirloom that lasts forever.
          </motion.p>
        </div>

      </div>
      
    </main>
  );
}
