import { getDetail } from '@/app/api/fs'
import Generator from '@/components/art/Generator'

export default async function ArtGeneratorPage({ params }: { params: { id: string } }) {
  const detail = await getDetail(`ArtData/${params.id}`)
  const canvasSize = {
    width: detail.size.x,
    height: detail.size.y,
  }

  let targets = [
    {
      target: '',
      label: 'Info',
      isActive: false,
    },
    {
      target: 'examples',
      label: 'Examples',
      isActive: false,
    },
    {
      target: 'generator',
      label: 'Generator',
      isActive: true,
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
