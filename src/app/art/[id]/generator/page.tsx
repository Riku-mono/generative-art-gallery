import { getDetail } from '@/app/api/fs'
import Generator from '@/components/art/Generator'
import ArtNavigation from '@/components/art/Navigation'

export default async function ArtGeneratorPage({ params }: { params: { id: string } }) {
  const detail = await getDetail(`ArtData/${params.id}`)
  const canvasSize = {
    width: detail.size.x,
    height: detail.size.y,
  }

  return (
    <>
      <ArtNavigation parent={params.id} activeTarget="generator" />
      <div
        className="mx-auto my-4 flex max-w-full flex-col gap-y-4 px-2"
        style={{ width: canvasSize.width }}
      >
        {detail.generate && (
          <Generator id={params.id} canvasSize={canvasSize} type={detail.generatorType} />
        )}
        {!detail.generate && (
          <>
            <div className="text-center text-xl text-neutral-600 dark:text-neutral-400">
              Generator is not available
            </div>
            <div className="text-center text-neutral-500 dark:text-neutral-300">
              Please check{' '}
              <a
                href={`https://github.com/Riku-mono/generative-art-gallery/tree/main/public/ArtData`}
                className="underline"
                target="_blank"
              >
                here
              </a>
            </div>
          </>
        )}
      </div>
    </>
  )
}
