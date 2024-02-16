import { getFilePaths } from '@/app/api/fs'
import Image from 'next/image'

export default async function ArtExamplesPage({ params }: { params: { id: string } }) {
  const images = await getFilePaths(`ArtData/${params.id}/images`)
  const thumbnailIndex = images.findIndex((image) => image.includes('thumbnail'))
  if (thumbnailIndex !== -1) {
    const thumbnail = images[thumbnailIndex]
    images.splice(thumbnailIndex, 1)
    images.unshift(thumbnail)
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
      isActive: true,
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
      <div className="scrollbar-hide my-4 grid w-full grid-cols-1 gap-2 overflow-x-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.length === 0 && <div>No examples available</div>}
        {images.map((image, index) => (
          <Image
            key={index}
            src={`/ArtData/${params.id}/images/${image}`}
            alt={image}
            className="h-full w-full object-cover"
            width={128}
            height={128}
          />
        ))}
      </div>
    </>
  )
}
