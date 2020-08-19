---
title: Nuxt.js での MicroCMS 使用方法 
date: "2019-10-16"
description: Nuxt製のアプリケーションでMicroCMSを使用する方法を紹介します。NuxtとAxiosの基本的な使用方法がわかっていれば比較的簡単に実装可能です。
---

# 概要
・Nuxt.jsのプロジェクト作成
・MicroCMSの簡単な使用方法
・AxiosでMicroCMSで作成したAPIを使用
・作成したNuxtプロジェクトをFirebaseで公開
までの手順を紹介します。
`※vueの細かいルール等の説明は割愛します。`

## 完成イメージ
☟テストで作成したページ
https://microcms-qiita.firebaseapp.com/

PCが重い為少し遅いですが、使用イメージは下記Gifの様な感じになります。
![MicroCMS.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/185788/942705be-2d3a-b74b-e4e4-84744da40c8e.gif)


## MicroCMSとは
https://microcms.io/
最近話題の日本製HeadlessCMS
簡単に自作APIを作成する事ができ、編集もらくちん。
制限はあるが無料枠あります。

## Nuxt
https://ja.nuxtjs.org/
Vue.jsのフレームワーク こちらの説明は割愛

## 作業開始

### 1.Nuxtプロジェクトの作成
参考：https://ja.nuxtjs.org/guide/installation
まず、Nuxtプロジェクトを簡単に作成できる`create-nuxt-app`をイントールします。

```bash
npm install create-nuxt-app -g
```
次にプロジェクトを作成。私の場合は「MicroCMS-Qiita」というプロジェクト名で作りました。

```bash
npx create-nuxt-app MicroCMS-Qiita
```
色々聞かれますが基本はお好きなように選んで構いませが、
`Choose Nuxt.js module`では`Axios`も選択してください。
私の場合は下記の様に設定しました。

| 質問内容 | 選択 |
|-----------------|------------------|
| Project name | MicroCMS-Qiita |
| Project description | お好きな内容 |
| Author name | お好きな名前 |
| Choose the package manager | npm |
| Choose UI framework | none |
| Choose custom server framework | none |
| Choose Nuxt.js modules | Axios, SPA Support どちらも |
| Choose linting tools | ESLint |
| Choose test framework | none |
| Choose rendering mode | Single Page App |
| Choose development tools | jsconfig.json |

これで作成したプロジェクトのディレクトリに移動して下記コマンドを打てば
ローカルでプロジェクトの確認ができるようになります。

```bash
npm run build
npm run start
```

### 2.MicroCMSでプロジェクトを作成する
[公式サイト](https://microcms.io/)で新規登録を行いサービスを作成します。
API型はリスト形式を選択し、下記の様に3つの入力項目を設置しました。（後からでも修正可能）
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/185788/2a40ee24-cd16-21bd-3341-a26277599e43.png)
`※種類が豊富で助かります。`

サービスが作成できたら、次はコンテンツを追加しましょう。
先ほど設置した3つの項目が入力できるようになっていると思います。
下記の様に好きなように入力して公開してみましょう。
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/185788/e55c4d9c-14b8-ecce-4e23-d82fe793e2ea.png)
似たようなものを3つほど追加しておきましょう。
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/185788/d4f7247e-62a4-d375-99c1-5a41e5ef67be.png)

### 3.NuxtプロジェクトでMicroCMSのAPIを使用する

とりあえず/pages/index.vueを一旦、下記の様に空にしましょう

```vue
<template>
  <div class="container">
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
```

### 4.Axiosを使用してMicroCMSからデータを取得する
MicroCMSで「APIリファレンス」を開くと、API通信に必要な情報があります。
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/185788/d8eb6490-1f35-bfb8-9766-ee3ee588a316.png)
「試してみる」を押下すると実際にリクエストを投げるURLが確認できるので
そのURLと、「X-API-KEY」をそれぞれを確認してください。

実際の取得方法は下記の様になります。先ほどの
`/pages/index.vue`のscriptタグ部分を編集します。

```vue
<script>
// axiosの使用宣言
import axios from 'axios'

export default {
  data () {
    return {
      // 取得したデータを入れる
      items: ''
    }
  },
  // API通信
  async asyncData () {
    const { data } = await axios.get('リクエストを投げるURL', {
      headers: { 'X-API-KEY': '********************' }
    })
    return {
      items: data.contents
    }
  }
}
</script>
```
これで、ページ表示時に`items`にAPIで取得したデータが格納されるはずです。
API通信部分のasyncに関しては[公式ドキュメント](https://ja.nuxtjs.org/guide/async-data/)を参考にしてください。

#### 取得したデータの表示領域を作成
APIでデータの取得はできているはずなので、ちゃんと取得できているか
表示して確認してみましょう。templateタグ部分は下記の様にしてください。

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
説明はコメントアウトに記載しました。
~~v-htmlでhtmlタグごと取得するのですが、これをするとXSS攻撃を受ける可能性があると
怒られます。何かいい方法をご存知の方は教えていただきたいです。~~
>コメントで素敵な記事を教えていただきました！ありがとうございます！
[Vueのv-htmlでXSSを回避する](https://qiita.com/tnemotox/items/b4b8f0f627e23dd62447)


CSSは下記の様にしてください。
※SASSも導入する事はできますが今回は省きます。下記に導入手順があります。
https://ja.nuxtjs.org/api/configuration-css/

```vue
<style>
.items{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 200px 0;
  flex-wrap: wrap;
  width: 500px;
  margin: 0 auto;
  color: #2d3436;
}
.item-box{
  width: 100%;
  border: solid 1px #2d3436;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0px 3px 10px rgba(0,0,0,0.5);
}
.name{
  background: #2d3436;
  padding: 5px;
  text-align: center;
  color: #dfe6e9;
  font-weight: bold;
}
.description{
  padding: 20px;
  background: #636e72;
  color: #dfe6e9;
}
.price{
  text-align: right;
  background: #636e72;
  color: #dfe6e9;
  padding: 0 10px;
}
</style>
```

デザインがてきとうなのはご愛敬。CSSの説明は割愛。
これでAPIで登録した内容が出力されるはずです！
MicroCMSで、コンテンツの順番を変えると表示される順番も変わります！

### 5.Firebaseで公開する
これについては別記事で書いてあるので、[こちら](https://qiita.com/omochironn/items/27d80d5ef470cdb2baca)を参考にしてください！

## おわりに
HeadlessCMSってなに？と聞かれるとうまく答えられません…
例えばNetlifyCMSではAPIではなく、管理画面でコンテンツを修正すると
Git上でコミットが打たれ、コード自体に変更が加わる事でCMSとして機能しています。
あれはHeadlessCMSなのか…わからない…教えて偉い人…
