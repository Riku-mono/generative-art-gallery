export default function Header() {
  return (
    <header className="relative mx-auto my-4 flex w-full max-w-5xl justify-between gap-y-4 px-4 sm:px-6">
      <span className="my-2 text-xl font-bold text-neutral-900 dark:text-neutral-50">
        <a
          href="/"
          className="text-neutral-900 transition-colors duration-300 ease-in-out hover:text-neutral-600 dark:text-neutral-50 dark:hover:text-neutral-300"
        >
          Riku-Mono
        </a>
      </span>
      <nav className="text-md flex items-center gap-1 font-bold sm:gap-2">
        <a
          href="/"
          className="rounded-md px-2 py-2 text-neutral-900 underline transition-colors duration-300 ease-in-out hover:text-neutral-600 dark:text-neutral-50 dark:hover:text-neutral-300"
        >
          Home
        </a>
        <a
          href="/about"
          className="rounded-md px-2 py-2 text-neutral-900 underline transition-colors duration-300 ease-in-out hover:text-neutral-600 dark:text-neutral-50 dark:hover:text-neutral-300"
        >
          About
        </a>
      </nav>
    </header>
  )
}
