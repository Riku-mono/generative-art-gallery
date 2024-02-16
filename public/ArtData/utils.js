let animation = true

window.addEventListener('message', (response) => {
  if (response.data.type === 'generate') {
    animation = response.data.animation
    console.log('Generating...', 'Animation:', response.data.animation)
    generate()
  } else if (response.data.type === 'download') {
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
  window.parent.postMessage('Draw completed', '*')
}

async function download() {
  const canvas = document.querySelector('canvas')
  const dataURL = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = dataURL
  link.download = `${new Date().getTime()}_R.png`
  link.click()
}
