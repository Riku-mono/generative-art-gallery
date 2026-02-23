'use client'

import { useEffect, useState } from 'react'
import './art.css'
import Motion from './Motion'
import Image from 'next/image'

const PrimaryBtnClassName = `flex items-center gap-2 rounded-md border-2 border-neutral-500 bg-neutral-700 px-4 py-2 text-neutral-50 transition dark:bg-neutral-800`
const BtnClassName = `flex items-center gap-2 rounded-md border-2 border-neutral-300 bg-neutral-50 px-4 py-2 transition hover:bg-neutral-100 active:scale-95 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800`

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
      <div className="flex flex-wrap justify-center gap-4">
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
          className={`${PrimaryBtnClassName} min-h-[44px] min-w-[120px] justify-center ${
            isGenerating
              ? ''
              : 'hover:bg-neutral-800 active:scale-95 dark:hover:bg-neutral-900 dark:hover:text-neutral-50'
          }`}
        >
          {(isGenerating && (
            <>
              <Image
                src="/ui/loading-01.svg"
                alt="loading"
                width={16}
                height={16}
                className="animate-spin"
                style={{
                  filter:
                    'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
                }}
              />
              <span>Generating...</span>
            </>
          )) || (
            <>
              <Image
                src="/ui/brush-01.svg"
                alt="generate"
                width={16}
                height={16}
                style={{
                  filter:
                    'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
                }}
              />
              <span>Generate Art</span>
            </>
          )}
        </button>
        {isGenerated && (
          <button
            onClick={() => {
              const iframeElm = document.querySelector('iframe')
              if (iframeElm) {
                iframeElm.contentWindow?.postMessage({ type: 'Download' }, '*')
              }
            }}
            className="flex items-center gap-2 rounded-md border-2 border-neutral-300 bg-neutral-50 px-3 py-1 transition hover:bg-neutral-100 active:scale-95 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          >
            <Image
              src="/ui/download-03.svg"
              alt="download"
              width={16}
              height={16}
              className="svg-filter select-none"
            />
            <span>Download</span>
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

  return (
    <>
      {!isFinished && (
        <>
          <button
            onClick={handlePlayPause}
            className={`${PrimaryBtnClassName} mx-auto hover:bg-neutral-800 active:scale-95 dark:hover:bg-neutral-900 dark:hover:text-neutral-50`}
          >
            {!isPlaying ? (
              <>
                <Image
                  src="/ui/play.svg"
                  alt="play"
                  width={16}
                  height={16}
                  style={{
                    filter:
                      'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
                  }}
                />
                <span>Play</span>
              </>
            ) : (
              <>
                <Image
                  src="/ui/pause-circle.svg"
                  alt="pause"
                  width={16}
                  height={16}
                  style={{
                    filter:
                      'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
                  }}
                />
                <span>Pause</span>
              </>
            )}
          </button>
        </>
      )}
      {(isPaused || isFinished) && (
        <div className="flex gap-4">
          <button onClick={handleReset} className={BtnClassName}>
            <Image
              src="/ui/refresh-ccw-01.svg"
              alt="reset"
              width={16}
              height={16}
              className="svg-filter select-none"
            />
            <span>Reset</span>
          </button>
          <button
            className={BtnClassName}
            onClick={() => {
              const iframeElm = document.querySelector('iframe')
              if (iframeElm) {
                iframeElm.contentWindow?.postMessage({ type: 'Download' }, '*')
              }
            }}
          >
            <Image
              src="/ui/download-03.svg"
              alt="download"
              width={16}
              height={16}
              className="svg-filter select-none"
            />
            <span>Download</span>
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
