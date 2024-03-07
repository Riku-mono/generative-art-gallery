import Image from 'next/image'
import { getDetail, getFolderPaths } from '@/app/api/fs'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () => {
  const paths = await getFolderPaths('ArtData')
  return paths.map((path) => ({ id: path }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const article = await getDetail(`ArtData/${params.id}`)

  return {
    title: `#${params.id} ${article?.title} | Generative Arts`,
    description: article?.description,
  }
}

const MultiLineText = ({ children }: { children: string }) => {
  return (
    <div className="text-neutral-600 dark:text-neutral-300">
      {children.split('\n').map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  )
}

export default async function Artlayout({
  params,
  children,
}: {
  params: { id: string }
  children: React.ReactNode
}) {
  const detail = await getDetail(`ArtData/${params.id}`)

  if (!detail) {
    notFound()
  }

  const paths = await getFolderPaths('ArtData')
  const currentIndex = paths.findIndex((path) => path === params.id)
  const prevPath = paths[currentIndex - 1]
  const nextPath = paths[currentIndex + 1]

  return (
    <>
      <main className="relative mx-auto my-8 flex w-full max-w-5xl flex-1 flex-col gap-y-4">
        <div className="px-6">
          <div className="mb-2 flex justify-between gap-2">
            <div>
              <h1 className="mb-2 text-5xl font-bold text-neutral-600 dark:text-neutral-300">
                #{params.id}
              </h1>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                {detail.title}
              </h2>
            </div>
            <Image
              src={`/ArtData/${params.id}/images/thumbnail.webp`}
              alt={`${params.id}-thumbnail`}
              width={96}
              height={96}
              className="mb-auto w-24 rounded-md border-2 border-neutral-200 bg-neutral-100 object-contain dark:border-neutral-700"
            />
          </div>
          <MultiLineText>{detail.description}</MultiLineText>
          <div className="flex flex-wrap gap-x-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>API & Libraly: </span>
            {detail.modules.map((module: string, index: string) => (
              <span key={index}>{module}</span>
            ))}
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            <span>Creator: </span>
            <span>{detail.creator}</span>
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            <span>Date: </span>
            <span>{new Date(detail.createdAt).toLocaleString()}</span>
          </p>
        </div>
        <div className="px-6">{children}</div>
        <nav className="flex justify-center gap-2 px-10">
          {(prevPath && (
            <a href={`/art/${prevPath}`} className="underline">
              Prev
            </a>
          )) || <div className="text-neutral-400">Prev</div>}
          <a href="/" className="underline">
            Home
          </a>
          {(nextPath && (
            <a href={`/art/${nextPath}`} className="underline">
              Next
            </a>
          )) || <div className="text-neutral-400 ">Next</div>}
        </nav>
      </main>
    </>
  )
}
