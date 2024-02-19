## Source Code

[source code](https://github.com/Riku-mono/generative-art-gallery/blob/main/public/ArtData/003/main.html) - リポジトリ

## Color

ランダムな色の生成と、グラデーション用の強度の設定

```javascript
let color1, color2
let color1Strength = 1

// ...
color1 = color(random(255), random(255), random(255))
color2 = color(random(255), random(255), random(255))
// ...
```

## Description

以下の手順で描画しています。なお、p5.js の関数を使用しています。

1. セルサイズの計算と線の設定

```javascript
const cellSize = width / 20
strokeWeight(cellSize / 5)
strokeCap(ROUND)
```

2. ランダムなパレットを選ぶ

```javascript
const palette = palettes[Math.floor(Math.random() * palettes.length)]
const bg = palette[0]
```

3. セルを走査して、描画関数を呼び出す

列ごとに、色の強度をリセットし、行ごとに線を描画します。線の色は、2つのランダムな色の間で補間されます。

```javascript
for (let x = 0; x < width; x += cellSize) {
  color1Strength = 1
  for (let y = 0; y < height; y += cellSize) {
    stroke(lerpColor(color1, color2, color1Strength))
    drawLine(x, y, cellSize)
    color1Strength *= 0.9 * random(0.9, 1.1)
  }
}
```

4. 線を描画する関数

各セルで、2つのランダムな方向のいずれかに線を描画します。

```javascript
function drawLine(x, y, size) {
  const r = random(1)
  if (r < 0.5) {
    line(x, y, x + size, y + size)
  } else {
    line(x, y + size, x + size, y)
  }
}
```
