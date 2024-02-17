'use client'

import { useEffect, useState } from 'react'
import './art.css'
import Motion from './Motion'

export default function Generator({
  id,
  canvasSize,
}: {
  id: string
  canvasSize: { width: number; height: number }
}) {
  const aspectRatio = (canvasSize.height / canvasSize.width) * 100
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    function handleReceiveMessage(event: { data: string }) {
      if (event.data === 'Draw completed') {
        console.log('Draw completed')
        setIsGenerating(false)
        setIsGenerated(true)
      }
    }

    window.addEventListener('message', handleReceiveMessage)

    return () => {
      window.removeEventListener('message', handleReceiveMessage)
    }
  }, [])

  return (
    <>
      <Motion>
        <div className="frameInner border-8 border-neutral-950 dark:border-neutral-50 sm:border-[16px]">
          <div
            className="canvas_container"
            style={{
              paddingBottom: `${aspectRatio}%`,
            }}
          >
            <iframe
              src={`/ArtData/${id}/main`}
              className="absolute left-0 top-0 h-full w-full shadow-inner"
            ></iframe>
          </div>
        </div>
      </Motion>
      <div className="mx-auto flex gap-4">
        <label className="block text-neutral-900 dark:text-neutral-100" htmlFor="animation">
          <input
            type="checkbox"
            id="animation"
            name="animation"
            checked={isAnimating}
            onChange={() => setIsAnimating(!isAnimating)}
          />
          <span className="ml-2">Animation</span>
        </label>
      </div>
      <div className="mx-auto flex gap-4">
        <button
          disabled={isGenerating}
          onClick={() => {
            setIsGenerating(true)
            const iframeElm = document.querySelector('iframe')
            if (iframeElm) {
              iframeElm.contentWindow?.postMessage(
                { type: 'generate', animation: isAnimating },
                '*'
              )
            }
          }}
          className={`btn btn-primary rounded-md bg-neutral-700 px-3 py-2 text-neutral-100 transition-colors duration-200 ease-in-out ${!isGenerating ? 'hover:bg-neutral-800 hover:text-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-50' : ''}`}
        >
          {isGenerating ? 'Generating...' : 'Generate Art'}
        </button>
        {isGenerated && (
          <button
            onClick={() => {
              const iframeElm = document.querySelector('iframe')
              if (iframeElm) {
                iframeElm.contentWindow?.postMessage({ type: 'download' }, '*')
              }
            }}
            className="rounded-md bg-neutral-200 px-3 py-2 transition-colors duration-200 ease-in-out hover:bg-neutral-300 hover:text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-50"
          >
            Download
          </button>
        )}
      </div>
    </>
  )
}
