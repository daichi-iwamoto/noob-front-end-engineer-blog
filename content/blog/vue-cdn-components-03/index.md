---
title: CDNで始めるVue.js入門 コンポーネント 3
date: "2018-06-03"
description: JavaScriptフレームワークのVueをCDNを使用して、お手軽に入門してみました。Vueの細かい機能よりはコンポーネントの使い方について重点的に調査してみました。
tag:
  - Vue
---

## 記事概要

[CDN で始める Vue.js 入門 コンポーネント 1](../vue-cdn-components-01/)<br>
[CDN で始める Vue.js 入門 コンポーネント 2](../vue-cdn-components-02/)<br>
初回同様。

## 今回のコンポーネント使用例

### 完成例

<iframe height="265" style="width: 100%;" scrolling="no" title="Vue.js03" src="https://codepen.io/da10410/embed/JZoxPm?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/da10410/pen/JZoxPm'>Vue.js03</a> by daichi
  (<a href='https://codepen.io/da10410'>@da10410</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
CSSの説明は省きます。

### JavaScript 部分

```js
Vue.component("device-template", {
  props: ["item"],
  template:
    '<div class="device" v-on:click="popups">' +
    '<div class="img-box">' +
    "</div>" +
    "<p>{{ item.name }}</p>" +
    "<p>{{ item.made }}</p>" +
    "<p>{{ item.price }}</p>" +
    "<p>{{ item.com }}</p>" +
    "</div>",
  methods: {
    popups: function () {
      alert(
        "商品名: " +
          this.item.name +
          "\n製造: " +
          this.item.made +
          "\n値段: " +
          this.item.price +
          "\n特徴: " +
          this.item.com
      )
    },
  },
})

new Vue({
  el: "#contents",
  data: {
    devices: [
      { name: "ZZ01", made: "japan", price: "20,000", com: "新商品！" },
      { name: "ZZ02", made: "china", price: "22,000", com: "新商品！" },
      { name: "ZZ03", made: "china", price: "24,000", com: "ちょっと高い！" },
      { name: "ZZ04", made: "china", price: "21,000", com: "新商品！" },
      { name: "ZZ05", made: "canada", price: "10,000", com: "激安！" },
      { name: "ZZ06", made: "canada", price: "12,000", com: "安い！" },
      { name: "ZZ07", made: "japan", price: "23,000", com: "ちょっと高い！" },
      { name: "ZZ08", made: "china", price: "25,000", com: "ちょっと高い！" },
      { name: "ZZ09", made: "china", price: "31,000", com: "たかい！" },
      { name: "ZZ010", made: "japan", price: "32,000", com: "たかい！" },
    ],
  },
})
```

#### Vue.component

今回はコンポーネントの使用可能範囲を設定せずに、
グローバルで使用できるコンポーネントとして作成してみます。

#### props

親要素からデータを受け取ります。受け取ったデータは`item`に代入されます。

#### template

前回とほぼ同じですが、`{{ name }}, {{ made }}, {{ price }}`の前に先ほど
props で受け取った`item`が挿入されています。
あと、しれっと`{{ item.com }}`が追加されています。特に意味は無いです。

#### methods

コチラもほぼ前回と同じ。
template と同じくデータの前に`item`が挿入されています。

#### new Vue

ほぼ前回同様。template がグローバルになっているので
個別で指定する必要がなくなりました。

#### data

ここが今回の大きな変更点の一つです。
データを関数として返すのではなく、配列で管理しています。
`devices`に今回使用する`name, made, price, com`のデータを入力していきます。

### HTML 部分

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<h1>Vue.js</h1>

<div id="contents">
  <device-template
    v-for="device in devices"
    v-bind:key="device.name"
    v-bind:item="device"
  >
  </device-template>
</div>
```

`<div id="contents">`の中に先ほど作ったコンポーネント
`<device-template>`を挿入します。しかし、今回は 10 回`<device-template>`が
出力しているはずが、一度しか記入されていません。

### `v-for="device in devices`

`devices`のデータを`device`に入れています。
`v-for`を行うことで、配列に入っているデータが全て出力されるまで
ループ処理を行ってくれます。

### `v-bind:key="device.name"`

`v-for`で要素を再利用・並べ替えをする際に必要になる
key を指定しています。今回は`devices.name`

### `v-bind:item="device`　

先ほど`devices`のデータを入れた`device`を`item`に渡します。
`item`は`index.js`で説明した`propsに渡ります。`

### 終わりに

配列でデータを管理することでより一層 HTML 部分がすっきりしました。

これで CDN で始める Vue.js コンポーネント　の記事は終わりになります。<br>
記載内容に誤りなどあれば、ぜひ教えていただけたらたすかります<(\_ \_)>。<br>
拙い記事を読んでいただき、ありがとうございました！
