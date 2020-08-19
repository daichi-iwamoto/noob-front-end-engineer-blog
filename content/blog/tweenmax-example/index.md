---
title: 初心者向け TweenMaxの使い方・使用例
date: "2018-05-15"
description: jsのアニメーションフレームワーク TweenMaxを使った簡単なアニメーション例を紹介します
---

<p class="description">
TweenMax.jsを勉強した際にできた副産物達を、めちゃくちゃ雑な解説と共にとっておく為のメモ記事。
これからTweenMaxを勉強する人の助けになれば幸いです。誤りなどございましたらご指摘お願いします！
</p>

## TweenMaxとは
高機能なJavaScriptアニメーションライブラリです。
商用利用、非商用利用に限らず基本的に無料で、課金ユーザーのみ閲覧アクセス可能なコンテンツもあります。
今回のアニメーション例ではjQueryを使用していますが、依存性はないのでjQueryが無くても使用可能です。

## 導入方法
ファイルをダウンロードする場合であれば
<a href="https://greensock.com/" target="_blank" rel="noopener noreferrer">公式サイト</a>から<br>
zipファイルかgithubかをお好みで選んでください。

CDNを使用する場合は下記をHTMLにコピペしてください。

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
```

## Examples
### example.1
<iframe height="265" style="width: 100%;" scrolling="no" title="TweenMax01" src="https://codepen.io/da10410/embed/LmBoXz?height=265&theme-id=light&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/da10410/pen/LmBoXz'>TweenMax01</a> by daichi
  (<a href='https://codepen.io/da10410'>@da10410</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

#### HTML部分
今回は一文字ずつアニメーションを行いたいので、aタグの中にspanで一文字ずつ入れています。
また、同じようにaタグの中に背景色アニメーション用のdivタグを入れておきます。

#### CSS部分
aタグをblock要素に、spanとdivをinline-block要素にしpositionを整えます。<br>
その他は省略

#### JS部分

##### TweenMax.toの使用方法

```js
// TweenMax.to('操作するオブジェクト', アニメーション時間, {アニメーション内容});
TweenMax.to('#bgc01', 0.25, {width: "100%" });
TweenMax.to('.obj01', 0.25, {border: "1px solid gray",color: "gray"});
```

今回の例ではマウスが乗った時、0.25秒かけて背景色用のdivがwidth:100%になり
aタグのborderが1px solid grayになり文字色がgrayになるアニメーションをつけています。

##### TweenMax.staggerToの使用方法

```js
// TweenMax.staggerTo('操作するオブジェクト', アニメーション時間, {アニメーション内容}, 次のオブジェクトのアニメーションが開始されるまでの時間);
TweenMax.staggerTo('.obj01t', 0.25, {rotationX: 360}, 0.02);
```

staggerは配列化されたセレクターを、順番にアニメーションさせるものです。
今回の例ではマウスが乗った時、文字列の入ったspanが0.25秒かけて360°前回転するアニメーションになっており、
最初の`.obj01t`のアニメーションが開始された0.02秒後に次の`obj01t`のアニメーションが始まるようになっています。
