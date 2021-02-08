---
title: Nuxt.js での MicroCMS 使用方法
date: "2019-10-16"
description: Nuxt製のアプリケーションでMicroCMSを使用する方法を紹介します。NuxtとAxiosの基本的な使用方法がわかっていれば比較的簡単に実装可能です。
tag:
  - Nuxt.js
  - MicroCMS
---

# 概要

* `Nuxt.js`のプロジェクト作成
* `MicroCMS`の簡単な使用方法
* `Axios`で`MicroCMS`で作成したAPIを使用
* 作成したNuxt製プロジェクトを`Firebase`で公開

までの手順を紹介します。

<p class="kao sleep">
※ vueの細かいルール等の説明は割愛します。
</p>

## 完成イメージ

☟ テストで作成したページ  
https://microcms-qiita.firebaseapp.com/

PC が重い為少し遅いですが、使用イメージは下記 Gif の様な感じになります。
![Micro CMS demo](../../assets/nuxt-microcms.gif)

## MicroCMSとは

[公式サイト](https://microcms.io/)

最近話題の日本製`HeadlessCMS`  
簡単に自作APIを作成する事ができ、編集もらくちん。  
制限はありますが無料枠もあります。

## Nuxtとは

[公式サイト](https://ja.nuxtjs.org/)

言わずと知れた`Vue.js`のフレームワークです。  

## 作業手順

### 1. Nuxtプロジェクトの作成

まずは土台となる、`Nuxt`のプロジェクトを作成しましょう！  
[公式](https://ja.nuxtjs.org/guide/installation)の導入手順を参考に、`create-nuxt-app`を使用してセットアップを行います。

```bash
# create-nuxt-appをグローバルインストール
npm install create-nuxt-app -g
```

次に、下記コマンドでプロジェクトを作成します。  
私の場合は「MicroCMS-Qiita」というプロジェクト名で作りました。

```bash
npx create-nuxt-app MicroCMS-Qiita
```

色々聞かれますが基本はお好きなように選んで構いません。  
ただ、`Choose Nuxt.js module`では`Axios`も選択してください。  
私の場合は下記の様に設定しました。

| 質問内容                       | 選択                        |
| ------------------------------ | --------------------------- |
| Project name                   | MicroCMS-Qiita              |
| Project description            | お好きな内容                |
| Author name                    | お好きな名前                |
| Choose the package manager     | npm                         |
| Choose UI framework            | none                        |
| Choose custom server framework | none                        |
| Choose Nuxt.js modules         | Axios, SPA Support どちらも |
| Choose linting tools           | ESLint                      |
| Choose test framework          | none                        |
| Choose rendering mode          | Single Page App             |
| Choose development tools       | jsconfig.json               |

これで作成したプロジェクトのディレクトリに移動して、下記コマンドを打てば  
ローカルでプロジェクトの確認ができるようになります！

```bash
npm run build
npm run start
```

### 2. MicroCMSでプロジェクトを作成する

Nuxtのアプリの土台は作成できたので、  
次は使用する`MicroCMS`のプロジェクトを作成していきましょう！

[公式サイト](https://microcms.io/)で新規登録を行いサービスを作成します。  
API 型はリスト形式を選択し、下記の様に 3 つの入力項目を設置しました。（後からでも修正可能）  
![MicroCMSの管理画面](../../assets/nuxt-microcms01.png)

<p class="kao sleep">
種類が豊富で助かります
</p>

サービスが作成できたら、次はコンテンツを追加しましょう。  
先ほど設置した3つの項目が入力できるようになっていると思います。

下記の様に好きなように入力して公開してみましょう。
![MicroCMSの管理画面](../../assets/nuxt-microcms02.png)

似たようなものを 3 つほど追加しておきましょう。
![MicroCMSの管理画面](../../assets/nuxt-microcms03.png)

これで、`MicroCMS`から受け渡すデータセットが作成されました！
### 3. NuxtプロジェクトでMicroCMSのAPIを使用する

では、ここから実際にNuxtでMicroCMSを使用してみましょう！  
とりあえず`/pages/index.vue`を一旦、下記の様に空にします。

```vue
<template>
  <div class="container"></div>
</template>

<script>
export default {}
</script>

<style></style>
```

#### Axiosを使用してMicroCMSからデータを取得する

`MicroCMS`で「API リファレンス」を開くと、API疎通に必要な情報があります。
![MicroCMSの管理画面](../../assets/nuxt-microcms04.png)

「試してみる」を押下すると実際にリクエストを投げる`URL`が確認できるので  
その`URL`と、「X-API-KEY」をそれぞれを確認してください。

実際の取得方法は下記の様になります。先ほどの  
`/pages/index.vue`の script タグ部分を編集します。

```vue
<script>
// axiosの使用宣言
import axios from "axios"

export default {
  data() {
    return {
      // 取得したデータを入れる
      items: "",
    }
  },
  // API通信
  async asyncData() {
    const { data } = await axios.get("リクエストを投げるURL", {
      headers: { "X-API-KEY": "********************" },
    })
    return {
      items: data.contents,
    }
  },
}
</script>
```

これで、ページ表示時に`items`に API で取得したデータが格納されるはずです！
API疎通部分の`async`に関しては[公式ドキュメント](https://ja.nuxtjs.org/guide/async-data/)を参考にしてください。

#### 取得したデータの表示領域を作成

`API`でデータの取得はできているはずなので、ちゃんと取得できているか  
表示して確認してみましょう。`template`タグ部分は下記の様にしてください。

```vue
<template>
  <div class="items">
    <!-- itemsをforでまわし、itemにそれぞれのデータが入ります。 -->
    <div v-for="item in items" :key="item" class="item-box">
      <div class="name">
        <!-- item内のnameを取得する -->
        {{ item.name }}
      </div>
      <!-- item内のdescriptionをHTMLタグも取得するためv-htmlで設定します。 -->
      <div class="description" v-html="item.description" />
      <div class="price">
        <!-- item内のpriceを取得する -->
        {{ item.price }}円
      </div>
    </div>
  </div>
</template>
```

細かな説明はコメントアウトの通りです。  
~~v-htmlでhtmlタグごと取得するのですが、これをすると XSS 攻撃を受ける可能性があると
怒られます。何かいい方法をご存知の方は教えていただきたいです。~~

> コメントで素敵な記事を教えていただきました！ありがとうございます！
> [Vue の v-html で XSS を回避する](https://qiita.com/tnemotox/items/b4b8f0f627e23dd62447)

`CSS`は下記の様にしてください。  
※SASS も導入する事はできますが今回は省きます。下記に導入手順があります。
https://ja.nuxtjs.org/api/configuration-css/

```vue
<style>
.items {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 200px 0;
  flex-wrap: wrap;
  width: 500px;
  margin: 0 auto;
  color: #2d3436;
}
.item-box {
  width: 100%;
  border: solid 1px #2d3436;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
}
.name {
  background: #2d3436;
  padding: 5px;
  text-align: center;
  color: #dfe6e9;
  font-weight: bold;
}
.description {
  padding: 20px;
  background: #636e72;
  color: #dfe6e9;
}
.price {
  text-align: right;
  background: #636e72;
  color: #dfe6e9;
  padding: 0 10px;
}
</style>
```

デザインがテキトーなのはご愛敬🤗 CSS の説明は割愛させていただきます。  
これで`API`で登録した内容が出力されるはずです！

`MicroCMS`の管理画面上で、コンテンツの順番を変えると表示される順番も変わります！

### 5.Firebase で公開する

これについては別記事で書いてあるので、[こちら](./nuxt-firebase-hosting)を参考にしてください！

## おわりに

今回はNuxt × Axios × MicroCMS での簡単な使い方をご紹介しました！  
ただ、今回説明した使用方法ではアクセス毎にAPIを叩いて情報を取得してきている状態なので、  
規模の大きなサイト等では使用が向いていません。  
アクセス数の見込みがあるサイトでは、CIツールなどを併用するなどして  
『MicroCMSに変更がかかったタイミングで、ビルドを行う。』等の
設定をしないといけないと思われます🤔
