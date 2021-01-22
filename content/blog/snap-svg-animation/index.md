---
title: Snap.svgの基本的な使い方
date: "2019-05-30"
description: SVGをアニメーションする際に便利なJSライブラリの、Snap.svgを使ってアニメーションを実装する方法を紹介します。
tag:
  - animation
---

## 動機

画像のフレームなどをもっと自由に動かしてみたいと思い SVG に手を出しました。
[Snap.svg](http://snapsvg.io/)などのライブラリを使えば比較的簡単にアニメーションを実装することができました。

## 完成品

まずはじめに、今回説明する内容の完成品です。

### コード

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="css" data-user="da10410" data-slug-hash="LqXvJy" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="SnapFrame01">
  <span>See the Pen <a href="https://codepen.io/da10410/pen/LqXvJy/">
  SnapFrame01</a> by daichi (<a href="https://codepen.io/da10410">@da10410</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### プレビュー

<p class="codepen" data-height="400" data-theme-id="0" data-default-tab="result" data-user="da10410" data-slug-hash="LqXvJy" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="SnapFrame01">
  <span>See the Pen <a href="https://codepen.io/da10410/pen/LqXvJy/">
  SnapFrame01</a> by daichi (<a href="https://codepen.io/da10410">@da10410</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## SVG を作成する

まずはフレームとして使用する SVG を作成します。
illustrator などがあれば理想ですが、無ければ代替となる何かを使用しましょう。
私の場合は『 [Vector](https://vectr.com/) 』というオンライン上で SVG を
作成することができるツールを使用して作成しました。

動く前の SVG と、動いた後の SVG の 2 種類作成してください。また、
動く前と後のアンカーポイントの数は、同一にしておくと後々複雑な SVG を扱う際などに楽になります。

今回作成した SVG のイメージは下記の様なものを右上用と左下用のそれぞれ作成したので
計４枚になります。

#### Before

![beforeSVG.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/185788/614cd683-bb3f-4552-e85d-c4f80eff33d2.png)

#### After

![afterSVG.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/185788/97bbbd69-baad-8d72-48a2-3927de624a57.png)

ベジェ曲線の描き方などは、使用するツールによって異なるので今回は省略させていただきます。

## HTML

CodePen の例では Pug を使用していますが、分かりやすくするために HTML にコンパイルしたもので解説を行います。
また、例は CodePen の JS の設定で下記 CDN を読み込んでいます。実際に実装する場合には任意の個所で
下記の CDN を読み込むようにしてください。

```html:Jquery
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
```

```html:Snap.svg
<script src="https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js"></script>
```

```html:index.html
<div class="btn">BTN</div>
<div class="img-section">
  <div class="header">Test</div>
  <div class="img-box">
    <div class="img-ttl">dummy image</div>
    <div class="img-dummy"></div>
    <div class="img-frame">
      <svg
        class="frame"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="none"
        viewBox="0 0 640 640"
      >
        <defs>
          <path
            class="bottom-wave"
            id="cBBFTBwXK"
            d="M340 264.74C233.33 158.07 120 69.82 0 0L0 640L640 640C546.67 496.49 446.67 371.4 340 264.74Z"
          ></path>
          <path
            class="top-wave"
            id="abb2YnZoD"
            d="M300 340C406.67 446.67 520 546.67 640 640L640 0L0 0C93.33 120 193.33 233.33 300 340Z"
          ></path>
        </defs>
        <g>
          <g>
            <g>
              <use
                xlink:href="#cBBFTBwXK"
                opacity="1"
                fill="#dfe6e9"
                fill-opacity="1"
              ></use>
            </g>
            <g>
              <use
                xlink:href="#abb2YnZoD"
                opacity="1"
                fill="#dfe6e9"
                fill-opacity="1"
              ></use>
            </g>
          </g>
        </g>
      </svg>
    </div>
  </div>
</div>
```

作成した SVG ファイルを「 sublimeText 」や「 Visual Stadio Code 」などの
テキストエディタで開きましょう。すると、下記の様な html 文で表示されるかと思います。

```html:svg.html
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  preserveAspectRatio="xMidYMid meet"
  viewBox="0 0 640 640"
  width="640"
  height="640"
>
  <defs>
    <path
      d="M167.52 45.18L283.83 45.18L283.83 145.89L167.52 145.89L167.52 45.18Z"
      id="i25ErMfTfi"
    ></path>
  </defs>
  <g>
    <g>
      <g>
        <use
          xlink:href="#i25ErMfTfi"
          opacity="1"
          fill="#c1ecad"
          fill-opacity="1"
        ></use>
      </g>
    </g>
  </g>
</svg>
```

この`<svg>`タグ内を見やすいようインデントを揃えコピーしたものを index.html の
`<div class="img-frame">`内に貼り付けています。

また SVG を同一 svg タグ内で 2 枚使用する場合、
2 枚目の`<def>`タグ内、`<path>`タグをコピーして 1 枚目で作成した html 文の`<def>`タグ内に
貼り付けるだけで使用可能です。今回の index.html でも同様にクラス名「bottom-wave」と「top-wave」で
同一 svg タグ内に 2 枚分の SVG を出力するようにしています。

## CSS

今回は割愛します。

## JS

続いて js の説明です。

```javascript:index.js
const $topw = Snap(".top-wave")
const $btmw = Snap(".bottom-wave")

let states = "close"

$(".btn").on("click", function () {
  if (states === "close") {
    $btmw.animate(
      {
        d:
          "M40 600C20 580 6.67 553.33 0 520L0 640L120 640C86.67 633.33 60 620 40 600Z",
      },
      350,
      mina.easein
    )
    $topw.animate(
      {
        d:
          "M600 40C620 60 633.33 86.67 640 120L640 0L520 0C553.33 6.67 580 20 600 40Z",
      },
      350,
      mina.easein
    )
    states = "open"
  } else {
    $btmw.animate(
      {
        d:
          "M340 264.74C233.33 158.07 120 69.82 0 0L0 640L640 640C546.67 496.49 446.67 371.4 340 264.74Z",
      },
      350,
      mina.easein
    )
    $topw.animate(
      {
        d:
          "M300 340C406.67 446.67 520 546.67 640 640L640 0L0 0C93.33 120 193.33 233.33 300 340Z",
      },
      350,
      mina.easein
    )
    states = "close"
  }
})
```

### path の指定

まず、操作する`<path>`タグを指定します。
今回はそれぞれのパスにクラスを付けていたのでクラス名で指定します。
`Snap`という関数の様なもので指定します。指定の仕方は Jquery と
似ているので、比較的使いやすいかと思われます。

```javascript:pathの指定
const $topw = Snap(".top-wave")
const $btmw = Snap(".bottom-wave")
```

### アニメーション実行

ボタンをクリックした際にアニメーションが実行されるようにします。
現在、SVG がどのような状態になっているかを`states`という変数で管理し
閉じていたら開いている SVG のパスに、開いていたら閉じている SVG のパスにアニメーションが
実行されるようにしています。

アニメーションは、先ほど取得したパスに`animate`という関数を実行することで
実行する事ができます。
HTML 部分の説明で行ったように、<font color="Red">アニメーション後</font>の SVG をテキストエディタで開き、
`<path`タグ内の`d="~~~~"`をコピーして`=`を`:`に変更したものを
関数の第１引数として指定します。第２引数に何秒間かけてアニメーションを行うか、第３引数にイージングを指定します。

```
(変更するパス).animate({(d:"~~~~")},アニメーション秒数, イージング);
```

これで SVG のアニメーションを実行する事ができます。

## まとめ

Snap.svg を使用すると SVG のアニメーションを Jquery と同じような感覚で簡単に実装する事ができます。
ループで実行することもできるので、フレームをずっとうねうねさせることも可能です。
CSS のみでは出来ない複雑なうごきも SVG を作成する事が得意であれば簡単に実装できるので
デザインの幅が広がると感じました。

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Article",
  "name": "Snap.svgの基本的な使い方",
  "headline": "Snap.svgの基本的な使い方",
  "author": {
    "@type": "Person",
    "name": "Daichi Iwamoto"
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://placehold.jp/1200x600.png",
    "height": 600,
    "width": 1200
  },
  "description": "SVGをアニメーションする際に便利なJSライブラリの、Snap.svgを使ってアニメーションを実装する方法を紹介します。",
  "url": "https://noob-front-end-engineer-blog.com/snap-svg-animation/",
  "mainEntityOfPage": "https://noob-front-end-engineer-blog.com/snap-svg-animation/",
  "publisher": {
    "@type": "Organization",
    "name": "Noob Front End Engineer Blog",
    "logo": {
      "@type": "ImageObject",
      "url": "https://noob-front-end-engineer-blog.com/favicon-32x32.png",
      "width": 32,
      "height": 32
    }
  },
  "datePublished": "2019-05-30",
  "dateModified": "2021-01-22"
}
</script>
