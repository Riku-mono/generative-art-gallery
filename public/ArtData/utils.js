let animation = true

window.addEventListener('message', (response) => {
  if (response.data.type === 'Generate') {
    animation = response.data.animation
    console.log('Generating...', 'Animation:', response.data.animation)
    generate()
  }

  if (response.data.type === 'Draw') {
    if (response.data.action === 'Play') {
      loop()
      window.parent.postMessage('Drawing Play', '*')
    } else if (response.data.action === 'Pause') {
      noLoop()
      window.parent.postMessage('Drawing Pause', '*')
    } else if (response.data.action === 'Reset') {
      reset()
      window.parent.postMessage('Drawing reset', '*')
    }
  }

  if (response.data.type === 'Download') {
    download()
  }
})

function delay(ms) {
  if (animation) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  return new Promise((resolve) => resolve())
}

function finish() {
  window.parent.postMessage('Generating completed', '*')
  window.parent.postMessage('Drawing completed', '*')
}

async function download() {
  const canvas = document.querySelector('canvas')
  const dataURL = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = dataURL
  link.download = `${new Date().getTime()}_R.png`
  link.click()
}
