## Source Code

[source code](https://github.com/Riku-mono/generative-art-gallery/blob/main/public/ArtData/004/main.html) - リポジトリ

## Description

以下の手順で描画しています。なお、p5.js の関数を使用しています。

1. 円を格納する配列を作成

```javascript
let circle = []
```

2. p5.js の draw 関数を定義

- check 関数で円が重なっていないかを確認
- 重なっていない場合、重なるか150まで円の半径を増やし、その情報を circles 配列に格納
- circles 配列の長さが 2000 を超えたら描画を終了

```javascript
function draw() {
  let x, y
  let r = 2

  let i = 0
  do {
    x = random(0, width)
    y = random(0, height)

    i++
    if (i > 1000) {
      return
    }
  } while (!check(x, y, r))

  while (r < 150 && check(x, y, r)) {
    r++
  }
  r--

  circle(x, y, r * 2)
  circles.push({ x, y, r })
  if (circles.length > 2000) {
    noLoop()
    finish()
  }
}
```

3. 円が重なっていないかを確認する関数

- すべての円に対して、dist 関数で円の中心間の距離を計算
- その距離がそれぞれの円の半径の和より小さい場合、つまり重なっている場合は false を返す

```javascript
function check(x, y, r) {
  let result = true
  circles.map((c) => {
    let d = dist(x, y, c.x, c.y)
    if (d < r + c.r) {
      result = false
    }
  })
  return result
}
```
