import { motion } from "framer-motion";


const MaskedText = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ 
          duration: 1.2, 
          delay: delay, 
          ease: [0.76, 0, 0.24, 1] 
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default MaskedText;