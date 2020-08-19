---
title: CDNで始めるVue.js入門 コンポーネント 2
date: "2018-06-02"
description: JavaScriptフレームワークのVueをCDNを使用して、お手軽に入門してみました。Vueの細かい機能よりはコンポーネントの使い方について重点的に調査してみました。
tag:
  - Vue
---

## 記事概要

[CDN で始める Vue.js 入門 コンポーネント 1](../vue-cdn-components-01/)
前回同様。

## 今回のコンポーネント使用例

今回は親要素からデータを渡すことができるコンポーネントを
作っていきたいと思います。

### 完成例

<iframe height="265" style="width: 100%;" scrolling="no" title="Vue.js02" src="https://codepen.io/da10410/embed/NzqBKw?height=265&theme-id=light&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/da10410/pen/NzqBKw'>Vue.js02</a> by daichi
  (<a href='https://codepen.io/da10410'>@da10410</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
CSSの説明は省きます。

### JavaScript 部分

```js
const Devices = {
  template:
    '<li class="device" v-on:click="popups">' +
    '<div class="img-box">' +
    "</div>" +
    '<div class="info-box">' +
    "<p>device : {{ name }}</p>" +
    "<p>made : {{ made }}</p>" +
    "<p>price : {{ price }}</p>" +
    "</div>" +
    "</li>",
  props: {
    name: String,
    made: String,
    price: Number,
  },
  data: function () {
    return {
      name,
      made,
      price,
    }
  },
  methods: {
    popups: function () {
      alert(
        "商品名: " +
          this.name +
          "\n製造: " +
          this.made +
          "\n値段: " +
          this.price
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

前回と同じです。

#### props

親要素からデータを受け取ります。
Vue.js 公式では、型の指定を推奨されています。

#### data

前回とほぼ同じです。
データを指定していれば、初期値を設定することができます。

#### methods

コチラも前回と同じ。

#### new Vue

前回同様です。

### HTML 部分

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<h1>Vue.js</h1>
<div id="scroll">
  <div id="contents">
    <device-template name="XX01" made="japan" price="21,000"> </device-template>
    <device-template name="XX02" made="china" price="18,000"> </device-template>
    <device-template name="XX03" made="china" price="19,000"> </device-template>
    <device-template name="XX04" made="china" price="14,000"> </device-template>
    <device-template name="XX05" made="canada" price="23,000">
    </device-template>
    <device-template name="XX06" made="japan" price="11,000"> </device-template>
    <device-template name="XX07" made="canada" price="10,000">
    </device-template>
    <device-template name="XX08" made="china" price="27,000"> </device-template>
    <device-template name="XX08" made="china" price="12,000"> </device-template>
    <device-template name="XX09" made="china" price="31,000"> </device-template>
  </div>
</div>
<div id="contents"></div>
```

`<device-template>`を必要数記入するのは前回同様ですが
`<device-template>`内で`name,made,price`に値を入れて
コンポーネントに props で渡しています。

### 終わりに

今回は親要素からデータを一つずつ代入する方法を紹介しました。
この方法を使えば、それぞれのコンポーネントに違うデータを渡すことが
可能になり、HTML ファイルを見ればどのテンプレートにどのデータが入ってるか
一目でわかります。

しかし、この方法ではデータが多くなりすぎると HTML ファイルに書く分も
増えてしまいます。（それでもコードの短縮ができている事に変わりはありませんが）

次回は HTML ファイル上でのコードを更に短縮できる方法を紹介いたします。

[CDN で始める Vue.js 入門 コンポーネント 3](../vue-cdn-components-03/)
