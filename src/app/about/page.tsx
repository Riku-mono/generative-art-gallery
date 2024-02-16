import Markdown from '@/components/markdown/Markdown'
import { getArticle } from '@/app/api/fs'

export default async function AboutPage() {
  const markdown = await getArticle('about.md')
  return (
    <>
      <main className="mx-auto my-8 min-h-full max-w-5xl flex-1 px-0 sm:px-6">
        <h1
          className="mb-6 px-4 text-5xl font-bold text-neutral-900 dark:text-neutral-50"
          id="about-me"
        >
          <span className="tracking-tight">Generative Arts</span>
          <span className="hidden sm:inline"> - </span>
          <br className="inline sm:hidden" />
          <span className="text-3xl tracking-tight text-neutral-600 dark:text-neutral-300">
            About Site
          </span>
        </h1>
        <Markdown markdown={markdown} />
      </main>
    </>
  )
}
