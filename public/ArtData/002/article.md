## Source Code

[source code](https://github.com/Riku-mono/generative-art-gallery/blob/main/public/ArtData/002/main.html) - リポジトリ

## Color Palettes

カラーパレットは以下の通りです。パレットからランダムに色を選んで描画しています。

| id  | Background | Foreground                                        |
| --- | ---------- | ------------------------------------------------- |
| 0   | `#022840`  | `#F23838` `#F25C69` `#FFBE53` `#03738C` `#95a2b5` |
| 1   | `#F2EAD6`  | `#F85525` `#FAA968` `#028391` `#3A794A` `#01204E` |
| 2   | `#07192c`  | `#8C0027` `#DD4111` `#F1A512` `#A1D4B1` `#2BAF90` |
| 3   | `#4DA394`  | `#D54751` `#EF9A48` `#FFFCC7` `#373430` `#59322B` |
| 4   | `#12181c`  | `#B11016` `#F37022` `#FBD0A6` `#007096` `#2ABA9E` |
| 5   | `#06394D`  | `#e03b1f` `#EAA109` `#18668C` `#71A6AE`           |

## Description

以下の手順で描画しています。なお、p5.js の関数を使用しています。

1. `grid` の数と `margin` の値から、canvas サイズに対する、セルのサイズを計算する。

```javascript
const grid = 21
const margin = 200
const step = (canvas.width - margin * 2) / grid
```

2. ランダムなパレットを選ぶ

```javascript
const palette = palettes[Math.floor(Math.random() * palettes.length)]
const bg = palette[0]
```

3. 中心を原点にランダムな傾斜(0~360)をつける

```javascript
translate(width / 2, height / 2)
rotate(random(TWO_PI))
```

4. グリッドを走査して描画関数を呼び出す

```javascript
for (let i = -grid / 2; i < grid / 2; i++) {
  for (let j = -grid / 2; j < grid / 2; j++) {
    let x = (i + 0.5) * step
    let y = (j + 0.5) * step
    let radius = step * random(0.4, 0.7)
    let rep = random(1, 6) // 円を描画する回数をランダムに設定
    drawRandomCircle(x, y, radius, colorPalette, rep)
  }
}
```

5. 円を再帰的に描画する関数

```javascript
function drawRandomCircle(x, y, radius, colorPalette, rep) {
  if (rep <= 0) return
  let color = colorPalette[1][Math.floor(random(colorPalette[1].length))]
  fill(color)
  noStroke()
  circle(x, y, radius)
  drawRandomCircle(x, y, radius * random(0.5, 0.9), colorPalette, rep - 1)
}
```
