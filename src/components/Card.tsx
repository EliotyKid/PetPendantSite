"use client"

import Image from "next/image"
import { motion, useMotionValue, useSpring, Variants } from "framer-motion"
import { useRef } from "react"

type CardProps = {
  invert?: boolean
  path: string
  title?: string
  category?: string
  description?: string
}

const Card = ({
  invert = false,
  path,
  title = "Project Title",
  category = "Development",
  description = "A sophisticated interaction model designed to elevate user experience through motion and depth.",
}: CardProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Ajustado para ser mais suave
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPos = e.clientX - rect.left - rect.width / 2
    const yPos = e.clientY - rect.top - rect.height / 2
    x.set(xPos)
    y.set(yPos)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  // --- CORREÇÃO DO TYPESCRIPT ---
  // Adicionamos a tipagem explicita 'Variants' e usamos 'as const' no ease
  const textVariant: Variants = {
    hidden: { y: "100%" },
    visible: { 
      y: "0%", 
      transition: { 
        duration: 0.8, 
        // 'as const' diz ao TS que isso é uma tupla imutável de 4 números, não um array genérico
        ease: [0.76, 0, 0.24, 1] as const 
      }
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`
        group relative flex flex-col gap-8 w-full max-w-6xl mx-auto py-12 px-4
        ${invert ? "md:flex-row-reverse" : "md:flex-row"}
        items-center
      `}
    >
      {/* --- COLUNA DE TEXTO --- */}
      <div className="flex-1 flex flex-col justify-center z-10 w-full">
        
        {/* Categoria */}
        <div className="overflow-hidden mb-2">
          <motion.span 
            variants={textVariant}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }} 
            className="block text-xs font-medium uppercase tracking-widest text-neutral-500"
          >
            {category}
          </motion.span>
        </div>

        {/* Título */}
        <div className="overflow-hidden mb-6">
          <motion.h3 
            variants={textVariant}
            transition={{ 
              delay: 0.4, 
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1] as const 
            }}
            className="text-4xl md:text-6xl font-bold text-primary leading-[1.1]"
          >
            {title}
          </motion.h3>
        </div>

        {/* Descrição */}
        <div className="overflow-hidden mb-8">
          <motion.p 
            variants={textVariant}
            transition={{ 
              delay: 0.6, 
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1] as const 
            }}
            className="text-black text-lg leading-relaxed max-w-md"
          >
            {description}
          </motion.p>
        </div>

        {/* Linha Decorativa */}
        <motion.div 
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.8, 
            ease: "circOut" 
          }}
          className="h-px w-full bg-secondary mb-6"
        />

        {/* Botão */}
        {/* <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="text-white text-sm uppercase tracking-wide flex items-center gap-2 hover:gap-4 transition-all duration-300 w-fit"
        >
          Read Case Study <span className="text-xl">→</span>
        </motion.button> */}
      </div>

      {/* --- COLUNA DA IMAGEM --- */}
      <div className="flex-1 w-full relative mt-8 md:mt-0">
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ clipPath: "inset(10% 10% 10% 10%)", scale: 0.9 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
          transition={{ 
            duration: 1.5,
            delay: 0.2, 
            ease: [0.25, 1, 0.5, 1] as const 
          }}
          // MOBILE FIX: 
          // 'cursor-none' apenas em telas médias (md) para cima.
          // No mobile o cursor é padrão.
          className="relative aspect-4/3 w-full overflow-hidden rounded-lg md:cursor-none"
        >
          {/* Imagem */}
          <motion.div
            // O efeito de escala no hover continua, mas no mobile será ignorado naturalmente sem mouse
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image
              src={path}
              alt={title || "Project Image"}
              fill
              // MOBILE FIX: 
              // 'grayscale-0' no mobile (sempre colorido).
              // 'md:grayscale' no desktop (cinza por padrão).
              // 'md:group-hover:grayscale-0' no desktop (fica colorido ao passar o mouse).
              className="object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 ease-in-out"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </motion.div>

          {/* Cursor Button Overlay */}
          <motion.div
            style={{
              x: mouseXSpring,
              y: mouseYSpring,
            }}
            // MOBILE FIX:
            // 'hidden' no mobile (não renderiza o botão VIEW).
            // 'md:flex' no desktop.
            className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
              <span className="text-white text-xs font-bold uppercase tracking-widest">
                View
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Card