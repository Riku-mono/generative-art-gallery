'use client'

import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
]

function isNavActive(href: string, pathname: string): boolean {
  if (href === '/') {
    // ギャラリーページ (/ および /2, /3 ...) をアクティブとみなす
    return pathname === '/' || /^\/\d+$/.test(pathname)
  }
  return pathname.startsWith(href)
}

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-neutral-50/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="/"
          className="text-xl font-bold text-neutral-900 transition-colors duration-200 hover:text-neutral-600 dark:text-neutral-50 dark:hover:text-neutral-300"
        >
          Riku-Mono
        </a>

        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => {
            const active = isNavActive(href, pathname)
            return (
              <a
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                  active
                    ? 'bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 active:scale-95 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50'
                }`}
              >
                {label}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
