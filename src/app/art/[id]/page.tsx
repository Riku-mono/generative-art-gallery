import { getArticle } from '@/app/api/fs'
import Markdown from '@/components/markdown/Markdown'

export default async function Art({ params }: { params: { id: string } }) {
  const markdown = await getArticle(`ArtData/${params.id}/article.md`)

  let targets = [
    {
      target: '',
      label: 'Info',
      isActive: true,
    },
    {
      target: 'examples',
      label: 'Examples',
      isActive: false,
    },
    {
      target: 'generator',
      label: 'Generator',
      isActive: false,
    },
  ]

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {targets.map((target, index) =>
          target.isActive ? (
            <div
              key={index}
              className="bg-primary-500 rounded-md bg-neutral-700 px-4 py-2 text-neutral-100 dark:bg-neutral-200 dark:text-neutral-600"
            >
              {target.label}
            </div>
          ) : (
            <a
              key={index}
              href={`/art/${params.id}/${target.target}`}
              className={`${
                target.isActive
                  ? 'bg-primary-500 text-neutral-50'
                  : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-200'
              } rounded-md px-4 py-2`}
            >
              {target.label}
            </a>
          )
        )}
      </div>
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
