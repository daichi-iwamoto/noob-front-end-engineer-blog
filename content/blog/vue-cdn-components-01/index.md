---
title: CDNで始めるVue.js入門 コンポーネント 1
date: "2018-06-01"
description: JavaScriptフレームワークのVueをCDNを使用して、お手軽に入門してみました。Vueの細かい機能よりはコンポーネントの使い方について重点的に調査してみました。
tag:
  - Vue
---

コンポーネント化を学習するにあたって、有名な JS フレームワークの
`Angular` `React` `Vue`のどのフレームワークを使うか迷ったのですが、
今回は一番学習コストが低いと言われている`Vue.js`を使用してみました。

Vue.js の説明というよりは、コンポーネント化する方法について、に重きを置いているので、
詳しい Vue.js の説明は<a href="https://jp.vuejs.org/v2/guide/" target="_blank" rel="noopener noreferrer">公式サイト</a>を見てください。

## CDN を読み込む

npm でインストールを行う vue-cli という便利なものがあるのですが、
今回は誰でも手軽に始められるよう、CDN を使ってコードを書いていきます。

下記 CDN を HTML に埋め込んでください

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
```

## 今回のコンポーネント使用例

### 完成例

<iframe height="265" style="width: 100%;" scrolling="no" title="Vue.js01" src="https://codepen.io/da10410/embed/KewYJN?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/da10410/pen/KewYJN'>Vue.js01</a> by daichi
  (<a href='https://codepen.io/da10410'>@da10410</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

今回 CSS の説明は省きます。

### JavaScript 部分

```js
const Devices = {
  template:
    '<div class="device" v-on:click="popups">' +
    '<div class="img-box">' +
    "</div>" +
    '<div class="info-box">' +
    "<p>Name : {{ name }}</p>" +
    "<p>price : {{ price }}</p>" +
    "<p>end : {{ end }}</p>" +
    "</div>" +
    "</div>",
  data: function () {
    return {
      name: "Big Campain",
      price: "$ -10",
      end: "2018/06/01",
    }
  },
  methods: {
    popups: function () {
      alert(
        "name : " +
          this.name +
          "\nprice : " +
          this.price +
          "\nend : " +
          this.end
      )
    },
  },
}

new Vue({
  el: "#contents",
  components: {
    "device-template": Devices,
  },
})
```

#### template

まず`const Devices`にコンポーネントの HTML 部分となる`template`を書き込みます。
今回は`<div class="device">`のなかに
`<div class="img-box">`と`<div class="info-box">`が入っています。
`{{ name }}, {{ price }}, {{ end }}`には後から設定するデータが入ります。

#### data

template 部分に適応されるデータを設定します。
コンポーネントに対してデータを渡す場合、data は関数にする必要があります。

#### methods

関数を作成できます。今回は`popups()`という関数を作ってあります。
機能は`<div class="device">`の持つデータをアラートで出力するというものです。
一度 template 部分に戻って`<div class="device">`を確認していただくと
`v-on:click="popups"`と書いてあります。ここでクリックされた時のアクションを指定しています。

#### new Vue

`el`　対象のエレメントを指定します。今回は`#contents`
`components`　`<device-template>`に`Devices`を代入しています。

### HTML 部分

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<h1>Vue.js</h1>

<div id="contents">
  <device-template></device-template>
  <device-template></device-template>
  <device-template></device-template>
</div>
```

`<div id="contents">`の中に先ほど作ったコンポーネント
`<device-template>`が三つ並べて完成です。

### 終わりに

HTML 部分を一度テンプレートとして書くだけで、何度でも使えるコンポーネントの基本を行ってみました。
しかし、今回の例のままでは name や price などが同じなものが表示されているので
主なデザイン・構造は同じだけどデータは違う。という場合には使えません。
次回はデータを指定して使えるコンポーネント例を紹介したいと思います。

[CDN で始める Vue.js 入門 コンポーネント 2](../vue-cdn-components-02/)
