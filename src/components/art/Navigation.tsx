import {
  IconCode,
  IconExternalLink,
  IconImage,
  IconInfo,
  IconMagicWand,
} from '@/components/ui/Icons'

type IconComponent = React.ComponentType<{ className?: string; size?: number }>

interface Target {
  target: string
  label: string
  Icon: IconComponent
  isActive: boolean
}

let targets: Target[] = [
  {
    target: '',
    label: 'Info',
    Icon: IconInfo,
    isActive: true,
  },
  {
    target: 'examples',
    label: 'Examples',
    Icon: IconImage,
    isActive: false,
  },
  {
    target: 'generator',
    label: 'Generator',
    Icon: IconMagicWand,
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
  targets = targets.map((target) => ({
    ...target,
    isActive: target.target === activeTarget,
  }))

  const sourceCodeHref = `https://github.com/Riku-mono/generative-art-gallery/blob/main/public/ArtData/${parent}/main.html`

  return (
    <nav className="flex items-center gap-2">
      {/* Tab group — segmented control */}
      <div className="flex flex-1 overflow-x-auto rounded-xl bg-neutral-100 p-1 [&::-webkit-scrollbar]:hidden dark:bg-neutral-800">
        {targets.map((target) => {
          const { Icon } = target
          return target.isActive ? (
            <span
              key={target.label}
              aria-current="page"
              className="flex min-w-fit cursor-default items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-neutral-50"
            >
              <Icon className="shrink-0" />
              {target.label}
            </span>
          ) : (
            <a
              key={target.label}
              href={`/art/${parent}/${target.target}`}
              className="flex min-w-fit items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-neutral-500 transition hover:bg-white/70 hover:text-neutral-900 active:scale-95 dark:text-neutral-400 dark:hover:bg-neutral-700/60 dark:hover:text-neutral-50"
            >
              <Icon className="shrink-0" />
              {target.label}
            </a>
          )
        })}
      </div>

      {/* Source Code external link */}
      <a
        href={sourceCodeHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 active:scale-95 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
        aria-label="Source Code (opens in new tab)"
      >
        <IconCode className="shrink-0" />
        <span className="sr-only sm:not-sr-only">Source Code</span>
        <IconExternalLink className="shrink-0 opacity-60" />
      </a>
    </nav>
  )
}
