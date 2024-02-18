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
          <h1 className="mb-2 text-5xl font-bold text-neutral-600 dark:text-neutral-300">
            #{params.id}
          </h1>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
            {detail.title}
          </h2>
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
        <nav className="flex justify-center px-10">
          {(prevPath && (
            <a href={`/art/${prevPath}`} className="mr-2">
              <button className="btn underline">Prev</button>
            </a>
          )) || <div className="mr-2 text-neutral-400">Prev</div>}
          <a href="/">
            <button className="btn underline">Home</button>
          </a>
          {(nextPath && (
            <a href={`/art/${nextPath}`} className="ml-2">
              <button className="btn underline">Next</button>
            </a>
          )) || <div className="ml-2 text-neutral-400 ">Next</div>}
        </nav>
      </main>
    </>
  )
}
