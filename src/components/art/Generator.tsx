'use client'

import { useEffect, useState } from 'react'
import './art.css'
import Motion from './Motion'

function GenerateBtn() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    function handleReceiveMessage(event: { data: string }) {
      if (event.data === 'Generating completed') {
        console.log('Generating completed')
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
    <div className="mx-auto flex flex-col items-center gap-4">
      <label className="text-neutral-900 dark:text-neutral-100" htmlFor="animation">
        <input
          type="checkbox"
          id="animation"
          name="animation"
          checked={isAnimating}
          onChange={() => setIsAnimating(!isAnimating)}
        />
        <span className="ml-2">Animation</span>
      </label>
      <div className="flex gap-4">
        <button
          disabled={isGenerating}
          onClick={() => {
            setIsGenerating(true)
            const iframeElm = document.querySelector('iframe')
            if (iframeElm) {
              iframeElm.contentWindow?.postMessage(
                { type: 'Generate', animation: isAnimating },
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
                iframeElm.contentWindow?.postMessage({ type: 'Download' }, '*')
              }
            }}
            className="rounded-md bg-neutral-200 px-3 py-2 transition-colors duration-200 ease-in-out hover:bg-neutral-300 hover:text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-50"
          >
            Download
          </button>
        )}
      </div>
    </div>
  )
}

function DrawBtn() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    function handleReceiveMessage(event: { data: string }) {
      if (event.data === 'Drawing completed') {
        console.log('Drawing completed')
        setIsPlaying(false)
        setIsFinished(true)
      }
    }

    window.addEventListener('message', handleReceiveMessage)

    return () => {
      window.removeEventListener('message', handleReceiveMessage)
    }
  }, [])

  const handlePlayPause = () => {
    const iframeElm = document.querySelector('iframe')
    if (iframeElm) {
      if (isPlaying) {
        setIsPaused(true)
        iframeElm.contentWindow?.postMessage({ type: 'Draw', action: 'Pause' }, '*')
      } else {
        setIsPaused(false)
        iframeElm.contentWindow?.postMessage({ type: 'Draw', action: 'Play' }, '*')
      }
    }
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setIsFinished(false)
    setIsPaused(false)
    const iframeElm = document.querySelector('iframe')
    if (iframeElm) {
      iframeElm.contentWindow?.postMessage({ type: 'Draw', action: 'Reset' }, '*')
    }
  }

  const primaryBtnClassName = `btn btn-primary rounded-md bg-neutral-700 px-3 py-2 text-neutral-100 transition-colors duration-200 ease-in-out`
  const btnClassName = `rounded-md bg-neutral-200 px-3 py-2 transition-colors duration-200 ease-in-out hover:bg-neutral-300 hover:text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-50`

  return (
    <>
      {!isFinished && (
        <>
          {!isPlaying ? (
            <button onClick={handlePlayPause} className={primaryBtnClassName}>
              Play
            </button>
          ) : (
            <button onClick={handlePlayPause} className={primaryBtnClassName}>
              Pause
            </button>
          )}
        </>
      )}
      {(isPaused || isFinished) && (
        <div className="flex gap-4">
          <button onClick={handleReset} className={btnClassName}>
            Reset
          </button>
          <button
            className={btnClassName}
            onClick={() => {
              const iframeElm = document.querySelector('iframe')
              if (iframeElm) {
                iframeElm.contentWindow?.postMessage({ type: 'Download' }, '*')
              }
            }}
          >
            Download
          </button>
        </div>
      )}
    </>
  )
}

export default function Generator({
  id,
  canvasSize,
  type,
}: {
  id: string
  canvasSize: { width: number; height: number }
  type: 'Generate' | 'Draw'
}) {
  const aspectRatio = (canvasSize.height / canvasSize.width) * 100

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
              src={`/ArtData/${id}/main${process.env.NODE_ENV === 'development' ? '.html' : ''}`}
              className="absolute left-0 top-0 h-full w-full shadow-inner"
            ></iframe>
          </div>
        </div>
      </Motion>
      <div className="mx-auto flex flex-col gap-y-4">
        {type === 'Generate' ? <GenerateBtn /> : <DrawBtn />}
      </div>
    </>
  )
}
