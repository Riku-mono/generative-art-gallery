// themeSwitch.tsx
'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="rounded-md border-2 border-neutral-200 bg-white p-2 text-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
      aria-label="Theme Switch"
    >
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  )
}
