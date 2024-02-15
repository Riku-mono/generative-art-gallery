'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()
  return (
    <AnimatePresence mode="wait" key={`${pathName}_All`}>
      <motion.div
        key={`${pathName}_All`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-1 flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
