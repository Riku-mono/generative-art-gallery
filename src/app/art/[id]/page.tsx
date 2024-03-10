import { getArticle } from '@/app/api/fs'
import ArtNavigation from '@/components/art/Navigation'
import Markdown from '@/components/markdown/Markdown'

export default async function Art({ params }: { params: { id: string } }) {
  const markdown = await getArticle(`ArtData/${params.id}/article.md`)

  return (
    <>
      <ArtNavigation parent={params.id} activeTarget="" />
      <div className="my-4">
        {(markdown === '' && (
          <div className="text-center text-xl text-neutral-600 dark:text-neutral-400">
            No info available
          </div>
        )) || <Markdown markdown={markdown} />}
      </div>
    </>
  )
}
