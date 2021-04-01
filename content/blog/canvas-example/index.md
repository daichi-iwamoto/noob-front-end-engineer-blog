---
title: 素のJavaScriptでCanvas入門
date: "2021-03-31"
description: 素のJavaScriptでCanvasに描画する例を紹介します。短形描画・Path描画・円とテキスト描画を順に説明し、その後それぞれのアニメーション実装方法を紹介しています。
tag:
  - JavaScript
  - Canvas
---

## 概要
素のJavaScriptでCanvasに描画する例を紹介します。  
`Canvas API`の[公式ページ](https://developer.mozilla.org/ja/docs/Web/API/Canvas_API)のドキュメントを参考に実装行っています。

## 短形描画
<iframe height="265" style="width: 100%;" scrolling="no" title="Default Canvas Rectangle" src="https://codepen.io/da10410/embed/NWbBYYj?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/da10410/pen/NWbBYYj'>Default Canvas Rectangle</a> by daichi
  (<a href='https://codepen.io/da10410'>@da10410</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

まずは短径（四角形）の描画例から見ていきましょう。  
短径の描画方法に関しては[こちら](https://developer.mozilla.org/ja/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#drawing_rectangles)を参考にしてください。

今回の例では、短径の『塗りつぶし』『枠線の描画』『消去』を行っています。

## Path描画
<iframe height="265" style="width: 100%;" scrolling="no" title="Default Canvas  Path" src="https://codepen.io/da10410/embed/MWbBGvx?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/da10410/pen/MWbBGvx'>Default Canvas  Path</a> by daichi
  (<a href='https://codepen.io/da10410'>@da10410</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

こちらは`Path`を指定した描画例になります。  
`Path`を使用した描画方法の詳細は[こちら](https://developer.mozilla.org/ja/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#drawing_paths)を参考にしてください。

三角形は`Path`の『塗りつぶし』、ギザギザの線は`Path`の『線描画』になります。  
ギザギザ線は、`Canvas`の中央座標を取得し、そこからランダムな数値を引いたり足したりして出力しています。

## 円とテキストの描画
<iframe height="265" style="width: 100%;" scrolling="no" title="Default Canvas  Arc &amp; Text" src="https://codepen.io/da10410/embed/BaQPxxx?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/da10410/pen/BaQPxxx'>Default Canvas  Arc &amp; Text</a> by daichi
  (<a href='https://codepen.io/da10410'>@da10410</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

こちらは円とテキストの描画例です。  
円の描画方法は[こちら](https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/arc)、テキスト描画は[こちら](https://developer.mozilla.org/ja/docs/Web/API/Canvas_API/Tutorial/Drawing_text)を参考にしてください。

## 短形アニメーション
<iframe height="265" style="width: 100%;" scrolling="no" title="Default Canvas Rectangle Animate" src="https://codepen.io/da10410/embed/KKNBxyr?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/da10410/pen/KKNBxyr'>Default Canvas Rectangle Animate</a> by daichi
  (<a href='https://codepen.io/da10410'>@da10410</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

こちらは先程の短径描画のアニメーションです。  
横幅を大きくしていく単純なものになっています。

## Pathアニメーション
<iframe height="265" style="width: 100%;" scrolling="no" title="Default Canvas Path Animate" src="https://codepen.io/da10410/embed/wvoxYaR?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/da10410/pen/wvoxYaR'>Default Canvas Path Animate</a> by daichi
  (<a href='https://codepen.io/da10410'>@da10410</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

こちらも先程の`Path`アニメーションの簡単なアニメーション例です。  
ランダムで出力している箇所があるので、ループで実行させるだけでそれっぽくなりますね！

## 円とテキストのアニメーション
<iframe height="265" style="width: 100%;" scrolling="no" title="Default Canvas Arc &amp; Text Animate" src="https://codepen.io/da10410/embed/YzpjJpa?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/da10410/pen/YzpjJpa'>Default Canvas Arc &amp; Text Animate</a> by daichi
  (<a href='https://codepen.io/da10410'>@da10410</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

こちらは円とテキスト描画のアニメーションです。  
ランダムなサイズと位置で円を出力しており、出力位置によって色分け等も行ってあります。

## 組み合わせたアニメーション
<iframe height="265" style="width: 100%;" scrolling="no" title="Noob FE Logo" src="https://codepen.io/da10410/embed/LYbgMvV?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/da10410/pen/LYbgMvV'>Noob FE Logo</a> by daichi
  (<a href='https://codepen.io/da10410'>@da10410</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

最後は全部を組み合わせて実装してみたアニメーション例です。

## まとめ
実際にアニメーションを作ってみると、とても楽しいのですがなかなか時間がかかる事がわかりました…  
また、試しにこのサイトにも設置してみたのですが、  
サイトの初期表示時からループされるアニメーションを設置すると、  
[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=ja)での評価がかなり落ちるので、SEO的にも考え物です。

SEOがあまり関係なく、インパクトが求めらるような制作であればお勧めですが、  
そうでない場合はアニメーションはあまり行わない方が良いのかもしれません。

`Canvas`アニメーションが悪い、というよりはJSでのループ処理が悪さをしている様子。  
何か良い方法をご存じの方、是非教えてください😵

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Article",
  "name": "素のJavaScriptでCanvas入門",
  "headline": "素のJavaScriptでCanvas入門",
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
  "description": "description: 素のJavaScriptでCanvasに描画する例を紹介します。短形描画・Path描画・円とテキスト描画を順に説明し、その後それぞれのアニメーション実装方法を紹介しています。",
  "url": "https://noob-front-end-engineer-blog.com/canvas-example/",
  "mainEntityOfPage": "https://noob-front-end-engineer-blog.com/canvas-example/",
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
  "datePublished": "2021-03-31",
  "dateModified": "2021-03-31"
}
</script>
