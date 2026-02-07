'use client'

import { useEffect, useState } from 'react'
import { motion, type Variants } from 'framer-motion'

const words = [
  'Hello',
  'Bonjour',
  'Ciao',
  'Olá',
  'やあ',
  'Hallå',
  'Guten Tag',
  'Hallo',
]

const easeOut = [0.76, 0, 0.24, 1] as const

export default function Preloader() {
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  useEffect(() => {
    if (index === words.length - 1) return

    const t = setTimeout(
      () => setIndex(index + 1),
      index === 0 ? 1000 : 150
    )

    return () => clearTimeout(t)
  }, [index])

  /* ================= VARIANTS ================= */

  const slideUp: Variants = {
    initial: { y: 0 },
    exit: {
      y: '-100vh',
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay: 0.2,
      },
    },
  }

  const opacity: Variants = {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: 0.2,
      },
    },
  }

  const initialPath = `
    M0 0 
    L${dimension.width} 0 
    L${dimension.width} ${dimension.height}
    Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}
    L0 0
  `

  const targetPath = `
    M0 0 
    L${dimension.width} 0 
    L${dimension.width} ${dimension.height}
    Q${dimension.width / 2} ${dimension.height + 120} 0 ${dimension.height}
    L0 0
  `

  const curve: Variants = {
    initial: {
      d: initialPath,
      transition: {
        duration: 0.7,
        ease: easeOut,
      },
    },
    exit: {
      d: targetPath,
      transition: {
        duration: 0.7,
        ease: easeOut,
        delay: 0.3,
      },
    },
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary text-white overflow-hidden"
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            className="absolute z-10 text-4xl font-semibold"
          >
            {words[index]}
          </motion.p>

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${dimension.width} ${dimension.height}`}
            preserveAspectRatio="none"
          >
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              fill="#3E2F63"
            />
          </svg>
        </>
      )}
    </motion.div>
  )
}
