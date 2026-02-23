'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function GalleryItem({ path }: { path: string }) {
  return (
    <>
      <li>
        <p className="my-2 text-2xl font-semibold text-neutral-600 dark:text-neutral-300">{path}</p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex cursor-pointer flex-col items-center"
        >
          <a
            href={`/art/${path}`}
            className="w-full border-4 border-neutral-900 bg-white p-4 transition-transform duration-300 hover:scale-105 active:scale-95 sm:border-8 sm:p-6 dark:border-neutral-50"
            style={{
              boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Image
              src={`/ArtData/${path}/images/thumbnail.webp`}
              alt="Generated Art"
              width={512}
              height={512}
              className="relative h-auto w-full bg-neutral-100"
            />
          </a>
        </motion.div>
      </li>
    </>
  )
}
