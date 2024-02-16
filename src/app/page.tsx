import Link from 'next/link'
import { getDetail, getFolderPaths } from './api/fs'
import GalleryItem from '@/components/GalleryItem'

const itemToShow = 20

export default async function Home() {
  const paths = await getFolderPaths('ArtData')
  const pages = Array.from({ length: Math.ceil(paths.length / itemToShow) }, (_, i) =>
    (i + 1).toString()
  )
  const latestArt = paths.slice(-1)[0]
  const latestArtData = await getDetail(`ArtData/${latestArt}`)
  return (
    <>
      <main className="mx-auto my-8 min-h-full max-w-5xl flex-1 px-6">
        <h1 className="mb-6 text-5xl font-bold text-neutral-900 dark:text-neutral-50">
          <span>Generative Arts </span>
          <span className="text-4xl text-neutral-600 dark:text-neutral-300">#100</span>
        </h1>
        <p className="mb-6 text-sm text-neutral-700 dark:text-neutral-300">
          <span>新着情報: </span>
          <Link
            href={`/art/${latestArt}`}
            className="text-blue-500 underline hover:text-blue-600 hover:underline"
          >
            {latestArt} 『{latestArtData.title}』
            {new Date(latestArtData.createdAt).toLocaleString()}
          </Link>
        </p>
        {paths.length === 0 && (
          <p className="text-2xl text-neutral-700 dark:text-neutral-300">No data</p>
        )}
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paths.slice(0, itemToShow).map((path) => (
            <GalleryItem path={path} key={path} />
          ))}
        </ul>
      </main>
      <nav className="flex justify-center gap-2">
        {pages.map((page) =>
          page === '1' ? (
            <span key={page} className="rounded-md bg-neutral-700 px-3 py-2 text-white">
              {page}
            </span>
          ) : (
            <Link
              href={`/${page}`}
              className="rounded-md bg-neutral-200 px-3 py-2 transition-colors duration-200 ease-in-out hover:bg-neutral-300 hover:text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-50"
              key={page}
            >
              {page}
            </Link>
          )
        )}
      </nav>
    </>
  )
}
