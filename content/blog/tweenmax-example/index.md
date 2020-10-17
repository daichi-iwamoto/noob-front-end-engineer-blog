---
title: 初心者向け TweenMaxの使い方・使用例
date: "2018-05-15"
description: jsのアニメーションフレームワーク TweenMaxを使った簡単なアニメーション例を紹介します
tag:
  - animation
---

<p class="description">
TweenMax.jsを勉強した際にできた副産物達を、めちゃくちゃ雑な解説と共にとっておく為のメモ記事。  
これからTweenMaxを勉強する人の助けになれば幸いです。誤りなどございましたらご指摘お願いします！
</p>

## TweenMax とは

高機能な JavaScript アニメーションライブラリです。  
商用利用、非商用利用に限らず基本的に無料で、課金ユーザーのみ  
閲覧アクセス可能なコンテンツもあります。  
今回のアニメーション例では`jQuery`を使用していますが、  
依存性はないので`jQuery`が無くても使用可能です。  

## 導入方法

ファイルをダウンロードする場合であれば
<a href="https://greensock.com/" target="_blank" rel="noopener noreferrer">公式サイト</a>から  
`zipファイル`か`github`から`clone`するかお好みで選んでください。

CDN を使用する場合は下記を HTML にコピペしてください。

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
```

## Examples

### example.1

<iframe height="265" style="width: 100%;" scrolling="no" title="TweenMax01" src="https://codepen.io/da10410/embed/LmBoXz?height=265&theme-id=light&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/da10410/pen/LmBoXz'>TweenMax01</a> by daichi
  (<a href='https://codepen.io/da10410'>@da10410</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

#### HTML 部分

今回は一文字ずつアニメーションを行いたいので、`<a>`の中に`<span>`で一文字ずつ入れています。  
また、同じように`<a>`の中に背景色アニメーション用の`<div>`を入れておきます。

#### CSS 部分

`<a>`を`block要素`に`<span>`と`<div>`を`inline-block要素`にし`position`を整えます。  
その他は省略

#### JS 部分

##### TweenMax.to の使用方法

```js
// TweenMax.to('操作するオブジェクト', アニメーション時間, {アニメーション内容});
TweenMax.to("#bgc01", 0.25, { width: "100%" })
TweenMax.to(".obj01", 0.25, { border: "1px solid gray", color: "gray" })
```

今回の例ではマウスが乗った時、0.25 秒かけて背景色用の`<div>`が`width:100%`になり、  
`<a>`の`border`が`1px solid gray`になり文字色が`gray`になるアニメーションをつけています。

##### TweenMax.staggerTo の使用方法

```js
// TweenMax.staggerTo('操作するオブジェクト', アニメーション時間, {アニメーション内容}, 次のオブジェクトのアニメーションが開始されるまでの時間);
TweenMax.staggerTo(".obj01t", 0.25, { rotationX: 360 }, 0.02)
```

`stagger`は配列化されたセレクターを、順番にアニメーションさせるものです。

今回の例ではマウスが乗った時、  
文字列の入った`<span>` が 0.25 秒かけて360° 前回転するアニメーションになっており、  
最初の`.obj01t`のアニメーションが開始された 0.02 秒後に  
次の`obj01t`のアニメーションが始まるようになっています。

<script type="application/ld+json">
{
  "@context":"http://schema.org",
  "@type":"Article",
  "headline": "初心者向け TweenMaxの使い方・使用例",
  "mainEntityOfPage":{
    "@type":"WebPage",
    "@id":"https://noob-front-end-engineer-blog.com/tweenmax-example/"
  },
  "author":{
    "@type":"Person",
    "address":"Japan",
    "email":"tay1fai0y@gmail.com",
    "name":"daichi iwamoto"
  },
  "publisher":{
    "@type":"Organization",
    "name":"Noob front end engineer blog",
    "url":"https://noob-front-end-engineer-blog.com/",
    "logo":{
      "@type": "ImageObject",
      "url":"http://organization.com/logo.png"
    }
  },
  "datePublished":"2018-05-15",
  "dateModified":"2020-10-017",
  "name":"初心者向け TweenMaxの使い方・使用例",
  "url":"https://noob-front-end-engineer-blog.com/tweenmax-example/",
  "image":"http//exmaple.com/images/img.png",
  "fileFormat":"text/html",
  "isAccessibleForFree":true,
  "description":"jsのアニメーションフレームワーク TweenMaxを使った簡単なアニメーション例を紹介します",
  "keywords":["TweenMax","JavaScript","アニメーション"],
  "encoding":{"@type":"MediaObject","encodingFormat":"utf-8"},
  "copyrightHolder":{
      "@type":"Person",
      "name":"daichi iwamoto",
      "address":"Japan",
      "email":"tay1fai0y@gmail.com",
      "image":"https://cdn1.www.st-hatena.com/users/ca/cartman0/profile.gif?1428245168"
  },
  "copyrightYear":"2020"
}
</script>