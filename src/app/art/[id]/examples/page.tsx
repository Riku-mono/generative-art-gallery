import { getFilePaths } from '@/app/api/fs'
import ArtNavigation from '@/components/art/Navigation'
import Image from 'next/image'

export default async function ArtExamplesPage({ params }: { params: { id: string } }) {
  const images = await getFilePaths(`ArtData/${params.id}/images`)
  const thumbnailIndex = images.findIndex((image) => image.includes('thumbnail'))
  if (thumbnailIndex !== -1) {
    const thumbnail = images[thumbnailIndex]
    images.splice(thumbnailIndex, 1)
    images.unshift(thumbnail)
  }

  return (
    <>
      <ArtNavigation parent={params.id} activeTarget="examples" />
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
