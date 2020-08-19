---
title: Snap.svg のアニメーション例
date: "2019-05-30"
description: SVGをアニメーションする際に便利なJSライブラリの、Snap.svgを使ってアニメーションを実装する方法を紹介します。
---

## 動機
画像のフレームなどをもっと自由に動かしてみたいと思いSVGに手を出しました。
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

## SVGを作成する
まずはフレームとして使用するSVGを作成します。
illustratorなどがあれば理想ですが、無ければ代替となる何かを使用しましょう。
私の場合は『 [Vector](https://vectr.com/) 』というオンライン上でSVGを
作成することができるツールを使用して作成しました。

動く前のSVGと、動いた後のSVGの2種類作成してください。また、
動く前と後のアンカーポイントの数は、同一にしておくと後々複雑なSVGを扱う際などに楽になります。

今回作成したSVGのイメージは下記の様なものを右上用と左下用のそれぞれ作成したので
計４枚になります。

#### Before
![beforeSVG.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/185788/614cd683-bb3f-4552-e85d-c4f80eff33d2.png)

#### After
![afterSVG.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/185788/97bbbd69-baad-8d72-48a2-3927de624a57.png)

ベジェ曲線の描き方などは、使用するツールによって異なるので今回は省略させていただきます。

## HTML
CodePenの例ではPugを使用していますが、分かりやすくするためにHTMLにコンパイルしたもので解説を行います。
また、例はCodePenのJSの設定で下記CDNを読み込んでいます。実際に実装する場合には任意の個所で
下記のCDNを読み込むようにしてください。

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
      <svg class="frame" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" viewBox="0 0 640 640">
        <defs>
          <path class="bottom-wave" id="cBBFTBwXK" d="M340 264.74C233.33 158.07 120 69.82 0 0L0 640L640 640C546.67 496.49 446.67 371.4 340 264.74Z"></path>
          <path class="top-wave" id="abb2YnZoD" d="M300 340C406.67 446.67 520 546.67 640 640L640 0L0 0C93.33 120 193.33 233.33 300 340Z"></path>
        </defs>
        <g>
          <g>
            <g>
              <use xlink:href="#cBBFTBwXK" opacity="1" fill="#dfe6e9" fill-opacity="1"></use>
            </g>
            <g>
              <use xlink:href="#abb2YnZoD" opacity="1" fill="#dfe6e9" fill-opacity="1"></use>
            </g>
          </g>
        </g>
      </svg>
    </div>
  </div>
</div>
```

作成したSVGファイルを「 sublimeText 」や「 Visual Stadio Code 」などの
テキストエディタで開きましょう。すると、下記の様なhtml文で表示されるかと思います。

```html:svg.html
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="640" height="640"><defs><path d="M167.52 45.18L283.83 45.18L283.83 145.89L167.52 145.89L167.52 45.18Z" id="i25ErMfTfi"></path></defs><g><g><g><use xlink:href="#i25ErMfTfi" opacity="1" fill="#c1ecad" fill-opacity="1"></use></g></g></g></svg>
```

この```<svg>```タグ内を見やすいようインデントを揃えコピーしたものをindex.htmlの
```<div class="img-frame">```内に貼り付けています。

またSVGを同一svgタグ内で2枚使用する場合、
2枚目の```<def>```タグ内、```<path>```タグをコピーして1枚目で作成したhtml文の```<def>```タグ内に
貼り付けるだけで使用可能です。今回のindex.htmlでも同様にクラス名「bottom-wave」と「top-wave」で
同一svgタグ内に2枚分のSVGを出力するようにしています。

## CSS
今回は割愛します。

## JS
続いてjsの説明です。

```javascript:index.js
const $topw = Snap(".top-wave");
const $btmw = Snap(".bottom-wave");

let states = "close";

$('.btn').on('click', function(){
  if(states === "close"){
    $btmw.animate({d:"M40 600C20 580 6.67 553.33 0 520L0 640L120 640C86.67 633.33 60 620 40 600Z"},350, mina.easein);
    $topw.animate({d:"M600 40C620 60 633.33 86.67 640 120L640 0L520 0C553.33 6.67 580 20 600 40Z"},350, mina.easein);
    states = "open";
  }else{
    $btmw.animate({d:"M340 264.74C233.33 158.07 120 69.82 0 0L0 640L640 640C546.67 496.49 446.67 371.4 340 264.74Z"},350, mina.easein);
    $topw.animate({d:"M300 340C406.67 446.67 520 546.67 640 640L640 0L0 0C93.33 120 193.33 233.33 300 340Z"},350, mina.easein);
    states = "close";
  }
});
```

### pathの指定
まず、操作する```<path>```タグを指定します。
今回はそれぞれのパスにクラスを付けていたのでクラス名で指定します。
```Snap```という関数の様なもので指定します。指定の仕方はJqueryと
似ているので、比較的使いやすいかと思われます。

```javascript:pathの指定
const $topw = Snap(".top-wave");
const $btmw = Snap(".bottom-wave");
```

### アニメーション実行
ボタンをクリックした際にアニメーションが実行されるようにします。
現在、SVGがどのような状態になっているかを```states```という変数で管理し
閉じていたら開いているSVGのパスに、開いていたら閉じているSVGのパスにアニメーションが
実行されるようにしています。

アニメーションは、先ほど取得したパスに```animate```という関数を実行することで
実行する事ができます。
HTML部分の説明で行ったように、<font color="Red">アニメーション後</font>のSVGをテキストエディタで開き、
```<path```タグ内の```d="~~~~"```をコピーして```=```を```:```に変更したものを
関数の第１引数として指定します。第２引数に何秒間かけてアニメーションを行うか、第３引数にイージングを指定します。

```
(変更するパス).animate({(d:"~~~~")},アニメーション秒数, イージング);
```

これでSVGのアニメーションを実行する事ができます。


## まとめ
Snap.svgを使用するとSVGのアニメーションをJqueryと同じような感覚で簡単に実装する事ができます。
ループで実行することもできるので、フレームをずっとうねうねさせることも可能です。
CSSのみでは出来ない複雑なうごきもSVGを作成する事が得意であれば簡単に実装できるので
デザインの幅が広がると感じました。
