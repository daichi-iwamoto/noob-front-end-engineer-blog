---
title: Nuxt.jsでFirebase Functionsを使用する
date: "2019-11-19"
description: Nuxt.jsのプロジェクトで、Firebase Functionsを使用して「Hello World!」を行います！Nuxtちょっと分かるけど、NuxtとFirebaseの組み合わせ方わからん…！ってなってる人の助けになれば
tag:
  - Nuxt.js
  - Firebase
---

## 概要

Nuxt.js のプロジェクトで、Firebase Functions を使用して「Hello World!」を行います！  
Nuxtはちょっと分かるけど、NuxtとFirebaseの組み合わせ方わからん…！  
ってなってる人の助けになれば…

## セットアップ

Nuxt と Firebase Hosting のセットアップ方法については下記別記事で掲載しています。

[『Nuxt + Firebase Hosting』で超速 deploy](../nuxt-firebase-hosting/)

```bash
firebase init
```

の際に、firebase の使用する機能の選択で`Hosting`だけでなく  
`Functions`も選択するようにしてください。  

## Firebase Functions の種類

Firebase Functions には種類が2つあります。  
以降でそれぞれの説明を行います！

### アプリから呼び出す関数

公式リファレンス[【アプリから関数を呼び出す】](https://firebase.google.com/docs/functions/callable?hl=ja)

> Firebase クライアント SDK の最小バージョンとの連携によって呼び出される関数。

簡単に言うと Firebase SDK が登録されているアプリケーションから呼び出される用の関数。　　
今回の記事ではこちらの関数を使っていきます。

### HTTP リクエスト経由で呼び出す関数

公式リファレンス[【HTTP リクエスト経由で関数を呼び出す】](https://firebase.google.com/docs/functions/http-events?hl=ja)

> HTTP リクエストで関数をトリガーできます。

簡単に言うと誰でも`POSTMAN`や`curl`コマンドなどで  
リクエストを行えば、レスポンスが得られる関数。

ただ、Nuxt のプロジェクトでこちらの関数を使おうとすると`Access-Control-Allow-Origin`の  
エラーで、悩まされる事になります。私は半日くらいこいつに時間を取られました…&#x1f635;  
こちらについては下記の素敵な記事を参考にしてください。

[Firebase の Cloud Functions で CORS が~とか Access-Control-Allow-Origin が~と言われたらこれ](https://qiita.com/qrusadorz/items/40234ac0b5c5c2315cad)

## Firebase SDK の登録

よし、じゃあ『アプリから呼び出す関数』の方で実装するぞ！  
あれ、でも Nuxt の場合 SDK の登録ってどうやって行うんだ…？

と初歩の初歩で引っかかってしまい、探し回っているうちに下記の素敵な記事 2 つを発見
・[【v2 対応】Nuxt.js と Firebase を組み合わせて爆速で Web アプリケーションを構築する](https://qiita.com/potato4d/items/cfddeb8732fec63cb29c#oauth-%E3%81%A8%E8%AA%8D%E8%A8%BC%E6%83%85%E5%A0%B1%E3%81%AE%E6%B0%B8%E7%B6%9A%E5%8C%96)
・[Firebase と Nuxt.js を使ってユーザ認証関係を簡単に作ってみる+1 ヶ月前の自分に教えたいリンク集](https://qiita.com/redshoga/items/da5c0e247e0df314a257#2-firebase%E3%81%AE%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%AE%E4%BD%9C%E6%88%90)

どうやら`plugin`として登録するといいみたいだぞ :thinking:

#### firebas をインストール & セーブ

```bash
npm install firebase --save
```

#### plugin ファイルの作成

```js:~/plugins/firebase.js
import firebase from 'firebase'

if (!firebase.apps.length) {
firebase.initializeApp({
apiKey: "API_KEY",
authDomain: "APP_ID.firebaseapp.com",
databaseURL: "https://PROJECT_ID.firebaseio.com",
projectId: "PROJECT_ID",
storageBucket: "PROJECT_ID.appspot.com",
messagingSenderId: "1234567890"
})
}

export default firebase

````
`firebase.initializeApp`の中身はFirebaseのサイト上の、
該当のプロジェクトの設定画面で確認する事ができるので
そちらを全て貼り付ける形で問題ありません。

> 参考にした記事は2つともユーザー認証系の記事だったため、今回の場合
`if (!firebase.apps.length) `の条件分岐は無くても動きます。

これでSDKの登録が行われたプラグインを作成する事ができました！

## functionの作成
セットアップがうまくいっていればプロジェクトのルートに`functions`という
フォルダが作成されているはずです。その中にある`index.js`で関数を作成していきます。

#### 「Hello World!」を返す関数の作成
```js:~/functions/index.js
const functions = require('firebase-functions');

exports.helloworld = functions.https.onCall((data, context) => {
  return "Hello World! " + data.name;
});
````

関数の作成自体はものすごく簡単ですね。
関数の詳細、`data`や`context`に何が入るか等は[公式](https://firebase.google.com/docs/functions/callable?hl=ja#write_and_deploy_the_callable_function)が一番わかりやすかったです。

#### 作成した関数を deploy する

```bash
firebase deploy --only functions
```

上記コマンドで functions だけが deploy されます。
完了すると該当のプロジェクトの Functions に追加されているのが確認できるはずです！
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/185788/fc0f9f4c-f781-4c82-6297-90a865bdb40d.png)

## 関数を呼び出す

では、さっそく関数を呼び出してみましょう。
作成した`~/plugin/firebase.js`を使用して関数を呼び出します。
plugin 作成の際に参考にさせていただいた記事はどちらも auth 機能の方を使用していたため
functions はどうやって呼び出すんだ…？POST の仕方は…？と悩んでしまいましたが
これについては[公式](https://firebase.google.com/docs/functions/callable?hl=ja#call_the_function)で詳しく記載されていました。

`~/pages/index.vue`を下記の様に書き換えてみましょう。

```js:title=/pages/index.vue
<template>

  <div class="container">
    <h1>Welcome!</h1>
    <div class="inputs">
      <label for="name">お名前は？</label>
      <input v-model="name" name="name" class="i-name" type="text">
      <div class="send-box">
        <input @click="helloworld" type="button" value="送信">
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    helloworld () {
      const hello = firebase.functions().httpsCallable('helloworld')
      hello({ name: this.name })
        .then((result) => {
          console.log(result)
          alert(result.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">
body{
  background: #2d3436;
  color: #dfe6e9;

  .container{
    padding: 30px;
    h1{
      text-align: center;
    }
    .inputs{
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      padding-top: 20px;
      label{
        display: block;
        width: 100%;
        padding-bottom: 10px;
        text-align: center;
      }

    }
  }
}
</style>

````

### HTML部分
html部分については簡単な説明にさせていただきます。
`<input v-model="name" name="name" class="i-name" type="text">`で後述する
`data()`とバインディングを行い、そのデータを
`<input @click="helloworld" type="button" value="送信">`で呼び出される関数で使用しています。

### JS部分
`import firebase from '~/plugins/firebase'`で`plugin`に登録したfirebaseを読みだしています。

#### data
`name`は入力された名前が入る様になっています。

#### methods
呼び出しの要となる部分です。説明はコメントアウトで記載しました。

```vue
<script>
  // 略
  methods: {
    helloworld () {
      // pluginのfirebaseからfunctionsを呼び出し、onCallメソッドのどの関数を呼び出すか指定
      const hello = firebase.functions().httpsCallable('helloworld')
      // 関数にdataを渡す
      hello({ name: this.name })
        .then((result) => {
          console.log(result)
          alert(result.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  // 略
</script>
````

### ローカルで呼び出してみる。

```bash
npm run dev
```

で nuxt をローカルで立ち上げ、自分の名前を入れて送信すると…
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/185788/2515dbc1-69b2-976e-a7bc-8824bc4a56ab.png)

> で、できた :sob:！

## まとめ

新しい便利なもの( nuxt )と新しい便利なもの( firebase )を一緒に使おうと思うと
プロの人達ならすぐわかるような事で引っかかってしまい、ドキュメントが無かったり。
便利なもの同士が競合を起こしていたり( nuxt と netlify forms など…)意外と大変だと痛感しました。
どちらもそれぞれで極めてから使用するべきだなぁ:thought_balloon:

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Article",
  "name": "Nuxt.jsでFirebase Functionsを使用する",
  "headline": "Nuxt.jsでFirebase Functionsを使用する",
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
  "description": "Nuxt.jsのプロジェクトで、Firebase Functionsを使用して「Hello World!」を行います！Nuxtちょっと分かるけど、NuxtとFirebaseの組み合わせ方わからん…！ってなってる人の助けになれば",
  "url": "https://noob-front-end-engineer-blog.com/npm-script-images/",
  "mainEntityOfPage": "https://noob-front-end-engineer-blog.com/npm-script-images/",
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
  "datePublished": "2020-08-12",
  "dateModified": "2020-08-12"
}
</script>
