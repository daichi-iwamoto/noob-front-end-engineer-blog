---
title: Vuex の基礎的な使い方をズンドコキヨシで試してみる
date: "2018-07-05"
description: Vuexの基本的な使用法の紹介します。今回は例として、【 ｽﾞﾝ → ｽﾞﾝ → ｽﾞﾝ → ｽﾞﾝﾄﾞｺ → ｷﾖｼ‼ 】とループするモジュールを作成してみました。
tag:
  - Vue
---

## 概要

Vuex の基本的な使用法の紹介します。今回は例として、<br>
【 ｽﾞﾝ → ｽﾞﾝ → ｽﾞﾝ → ｽﾞﾝﾄﾞｺ → ｷﾖｼ‼ 】とループするモジュールを作成してみました。

### 使用する CDN

```html
# Vue
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

# Vuex
<script src="https://unpkg.com/vuex"></script>

# TweenMax
<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>

# google fonts
<link
  href="https://fonts.googleapis.com/earlyaccess/hannari.css"
  rel="stylesheet"
/>
```

## 完成形

<iframe height="265" style="width: 100%;" scrolling="no" title="Vuex.js01 (ｽﾞﾝﾄﾞｺ)" src="https://codepen.io/da10410/embed/qKoobR?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/da10410/pen/qKoobR'>Vuex.js01 (ｽﾞﾝﾄﾞｺ)</a> by daichi
  (<a href='https://codepen.io/da10410'>@da10410</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

※フォントサイズの都合上、画面が小さすぎるとバグります。

## HTML 部分

```html
<div id="app">
  <p id="kiyoshi">{{ zundoko }}</p>
  <button id="btn" @click="callcommit">せぃ</button>
</div>
```

### `{{ zundoko }}`

この zundoko に入る state が
【 ｽﾞﾝ → ｽﾞﾝ → ｽﾞﾝ → ｽﾞﾝﾄﾞｺ → ｷﾖｼ‼ 】に変わる

### `click="callcommit"`

後述する`mutation`を`commit`する関数が書かれている
`collcommit`関数を呼び出しています。

## JavaScript 部分

```js
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    call: "ズン",
    num: 0,
  },
  mutations: {
    callchange(state) {
      switch (state.num) {
        case 0:
          state.call = "ズン"
          break
        case 1:
          state.call = "ズン"
          break
        case 2:
          state.call = "ズン"
          break
        case 3:
          state.call = "ズンドコ"
          break
        case 4:
          state.call = "キヨシ！！！"
          break
      }
      ++state.num
      if (state.num === 5) state.num = 0
    },
  },
})

const temp = new Vue({
  el: "#app",
  computed: {
    zundoko() {
      return store.state.call
    },
  },
  methods: {
    callcommit() {
      store.commit("callchange")
      TweenMax.fromTo(
        "#kiyoshi",
        0.5,
        { top: 0, opacity: 0 },
        { top: "150px", opacity: 1, ease: Bounce.easeOut }
      )
    },
  },
})
```

### `Vue.use(Vuex)`

Vuex を使用する宣言です。

### `Store`

#### `state`

状態を保存しています。ここでは HTML 部分の`{{ zundoko }}}`に入る`call`と
`call`に次何が入るか判定する際に使用する`num`を宣言しています。

#### `mutation`

`Vuex`の`state` の値を変更できる唯一の方法がこの`mutation`を`commit`する事です。
`mutation`には`state`を変更するための処理が書かれています。

今回は`state`の`call`に何が入っているか`num`の数値から参照しています。<br>
表にするとこんな感じ　 ⇓

| 　ズン　 | 　ズン　 | 　ズン　 | 　ズンドコ　 | 　キヨシ　 |
| :------: | :------: | :------: | :----------: | :--------: |
|    0     |    1     |    2     |      3       |     4      | 4 |

switch 文で次に来るセリフを`call`に入れる。
switch を抜けた後に`num`に 1 を足し、`num`が 5 になったら 0 に戻す。

### `Vue`

#### `el`

対象を指定する。ここでは`id="app"`

#### `compted`

`{{ zundoko }}`に返す値を算出する。

#### `method`

commit とアニメーションを行う関数が書かれている。
HTML 部分の`click="callcommit`で呼び出されるのはここ。

```js
TweenMax.fromTo(
  "#kiyoshi",
  0.5,
  { top: 0, opacity: 0 },
  { top: "150px", opacity: 1, ease: Bounce.easeOut }
)
```

アニメーションを js で簡単に書ける TweenMax.js を使用しています。
ファイルサイズが他のアニメーションライブラリに比べ大きいですが、
フルスタックで便利なのでおすすめです。
(正直今回程度のアニメーションであれば js なり css が得意な方からすると不要そうですが…)

今回の使用例の説明としては、`id="kiyoshi"`が`0.5秒`かけて
`top`の位置`0`、`opacity`が`0`から
`top`の位置`150px`、`opacity`が`1`になるアニメーションを記述しています。

## 終わりに

Vuex の簡単なデモをおこなってみました。
公式の説明にもあったのですが、実際に Vuex が必要となってくるのは
大規模なプロジェクトの時で、私のように個人的に Vue を使用しているだけの
人にとっては管理が難しそうでした。使いこなせるとかっこいいな…

Vue 関連の便利なプラグインやフレームワークが続々出てきているので
また触ってみたいと思っています！
