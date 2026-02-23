import Image from 'next/image'

interface Target {
  target: string
  label: string
  icon: string
  isActive: boolean
}

let targets: Target[] = [
  {
    target: '',
    label: 'Info',
    icon: 'info-circle.svg',
    isActive: true,
  },
  {
    target: 'examples',
    label: 'Examples',
    icon: 'image-03.svg',
    isActive: false,
  },
  {
    target: 'generator',
    label: 'Generator',
    icon: 'magic-wand-01.svg',
    isActive: false,
  },
]

export default function ArtNavigation({
  parent,
  activeTarget,
}: {
  parent: string
  activeTarget: string
}) {
  targets = targets.map((target) => {
    if (target.target === activeTarget) {
      return { ...target, isActive: true }
    } else {
      return { ...target, isActive: false }
    }
  })

  let links = [
    // { label: 'Share', icon: 'share-04.svg', href: '/' },
    {
      label: 'Source Code',
      icon: 'code-02.svg',
      href: `https://github.com/Riku-mono/generative-art-gallery/blob/main/public/ArtData/${parent}/main.html`,
    },
  ]

  return (
    <ul className="flex flex-wrap gap-2">
      {targets.map((target) =>
        target.isActive ? (
          <li
            key={target.label}
            className="flex cursor-default gap-2 rounded-lg border-2 border-neutral-500 bg-neutral-100 px-3 py-2 dark:border-neutral-500 dark:bg-neutral-800"
            aria-current="page"
          >
            <Image
              src={`/ui/${target.icon}`}
              alt={target.label}
              width={16}
              height={16}
              className="svg-filter select-none"
            />
            <span>{target.label}</span>
          </li>
        ) : (
          <li key={target.label}>
            <a
              className="flex gap-2 rounded-lg border-2 border-neutral-300 bg-neutral-50 px-3 py-2 transition hover:bg-neutral-100 active:scale-95 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              href={`/art/${parent}/${target.target}`}
            >
              <Image
                src={`/ui/${target.icon}`}
                alt={target.label}
                width={16}
                height={16}
                className="svg-filter select-none"
              />
              <span>{target.label}</span>
            </a>
          </li>
        )
      )}
      {links.map((link) => (
        <li key={link.label}>
          <a
            className="flex gap-2 rounded-lg border-2 border-neutral-300 bg-neutral-50 px-3 py-2 transition hover:bg-neutral-100 active:scale-95 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            href={link.href}
            target="_blank"
          >
            <Image
              src={`/ui/${link.icon}`}
              alt={link.label}
              width={16}
              height={16}
              className="svg-filter select-none"
            />
            <span className="sr-only sm:not-sr-only">{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
