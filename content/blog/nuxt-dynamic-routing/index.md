---
title: Nuxt.jsでAPIで取得したデータごとにページを作成する 
date: "2019-11-14"
description: Nuxt.jsを使用して、APIから取得してきたデータを元にページを作成する、動的ルーティングの手法を紹介します。
---

# 概要
APIで取得してきたデータ毎にページを作成したい！と思い色々試行錯誤した内容をまとめました。
API作成に使用したのツールは[Micro CMS](https://microcms.io/)です。別記事で使用方法を書いてあります。
[Nuxtで最近話題のMicroCMSを使用してFirebaseで公開する](https://qiita.com/omochironn/items/05a2b3cca6067119c88e)

※コードの説明は基本コメントで行ってます。

## まずは公式リファレンスを読もう
[Nuxt.js 動的ルーティング](https://ja.nuxtjs.org/guide/routing/#%E5%8B%95%E7%9A%84%E3%81%AA%E3%83%AB%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0)について公式リファレンスで記載があるので、まずはコチラを読みましょう。
>なるほどわからん:thinking: 

もう少し調べると[素敵な記事](https://www.dkrk-blog.net/vue-nuxt/nuxt-generate-routes)を見つけました。
>どうやらnuxt.config.jsをいじるっぽいぞ:thinking: 

という事で再度[公式リファレンス](https://ja.nuxtjs.org/api/configuration-generate/)を確認。
ちょっとずつ分かってきたぞ。ではやってみよう。

## まずはAPIの作成
MicroCMSを使用する場合であれば[Nuxtで最近話題のMicroCMSを使用してFirebaseで公開する](https://qiita.com/omochironn/items/05a2b3cca6067119c88e)
の記事の方を参考に。
実際に送られてくるデータの例としては下記の様に作成しました。
作成するサイトはお友達紹介ページです。

```json:get.json
{
    "contents": [
        {
            "id": "自動登録",
            "createdAt": "自動登録",
            "updatedAt": "自動登録",
            "dir": "friends01",
            "title": "お友達01",
            "mainv": {
                "url": "画像URL"
            },
            "body": "<p>仲良しこよしのお友達<br>お友達登録No.001</p>"
        },
        {
            "id": "自動登録",
            "createdAt": "自動登録",
            "updatedAt": "自動登録",
            "dir": "friends02",
            "title": "お友達02",
            "mainv": {
                "url": "画像URL"
            },
            "body": "<p>仲良しこよしのお友達<br>お友達登録No.002</p>"
        }
    ]
}
```
使用するのは`dir`,`title`,`mainv`,`body`の4つです。


## nuxt.config.jsの編集
```js:nuxt.config.js
// axiosをimport (※importせず$を使用した方法でも可
import axios from 'axios'

export default {
  mode: 'spa',
  //　～
  // 中略
  //　～
  generate: {
    routes () {
      // 使用するAPIから情報を取得
      return axios.get('リクエストURL', {
        headers: { 'X-API-KEY': 'APIキー' }
      })
        .then((res) => {
          return res.data.contents.map((friends) => {
            return {
              route: friends.dir,  // ページのurlになる部分。今回はAPI上で設定した情報を使用。
              payload: friends     // ページ毎に疎通を行わずに済むようpayloadに情報を渡す
            }
          })
        })
    }
  }
}
```

## Storeの作成
APIで取得してきたデータを`state`として管理します。

```js:/store/friends.js
export const state = () => ({
  ApiFlag: false,  //APIデータ取得を行ったか否か
  friend: ''       //APIで取得してきたデータを格納
})

export const mutations = {
  // API疎通に成功した際にFlagを立てる
  FlagChange (state) {
    if (state.ApiFlag === false) {
      state.ApiFlag = true
    }
  },

  // APIで取得してきたデータを格納する
  getFriends (state, res) { state.friend = res }
}
```
ページ毎にAPI疎通を行わない様に、`ApiFlag`を設置しました。
>これについては`payload`で解決しそうなものなのですが、
うまく動作しなかったのでこの仕様にしました :cry: 

## テンプレート用のvueファイルの作成
動的に作成されるページのテンプレートファイルを作成します。
アンダースコアのプレフィックスを付けたvueファイルを作成する事で定義できます。
私の場合は`_friends.vue`という名前でテンプレートを作成しました。

### JS部分
```vuejs:/pages/_friends.vue
<script>
import axios from 'axios'

export default {
  // store
  computed: {
    // stateの情報を取得
    ApiFlag () { return this.$store.state.friends.ApiFlag },
    friends () { return this.$store.state.friends.friend }
  },
  data () {
    return {
      // APIで取得してきたデータ群
      dir: '',    // ページURL
      title: '',  // お友達の名前
      mainv: '',  // お友達のイメージ画像
      body: ''    // お友達の紹介文
    }
  },
  async asyncData ({ store, params, error, payload }) {
    // payloadでデータを受け取った場合
    if (payload) {
      return {
        dir: payload.dir,
        title: payload.title,
        mainv: payload.mainv,
        body: payload.body
      }
    } else {
      // payloadでデータを取得できなかった場合
      let Dir
      let Ftitle
      let Fmainv
      let Fbody

      // API通信を行っていなかった場合
      if (store.state.friends.ApiFlag === false) {
        await axios.get('リクエストURL', {
          headers: { 'X-API-KEY': 'APIキー' }
        })
          .then((res) => {
            // Flagを立てて、情報をstateに格納
            this.$store.commit('friends/FlagChange')
            this.$store.commit('friends/getFriends', res.data.contents)
            // APIで取得してきたデータを格納　　　　
            res.data.contents.map((friend) => {
              if (friend.dir === params.friends) {
                Dir = friend.dir
                Ftitle = friend.title
                Fmainv = friend.mainv
                Fbody = friend.body
              }
            })
          })

      // API通信済みの場合
      } else {
        // storeのデータを回して、現在のページのお友達情報を格納
        store.state.friends.friend.map((friend) => {
          if (friend.dir === params.friends) {
            Dir = friend.dir
            Ftitle = friend.title
            Fmainv = friend.mainv
            Fbody = friend.body
          }
        })
      }

      return {
        dir: Dir,
        title: Ftitle,
        mainv: Fmainv,
        body: Fbody
      }
    }
  },
  methods: {
    // ページ遷移関数
    jump (e) {
      location.href = e.target.value
    }
  }
}
</script>
```

### HTML部分
```vuejs:/pages/_friends.vue
<template>
  <div class="container">
    <!-- 選択でページ遷移 -->
    <select class="links" @change="jump">
      <option hidden>おともだち を えらぼう！</option>
      <option v-for="friend of friends" :key="friend.id" :value="`./${friend.dir}`">{{ friend.title }}</option>
    </select>

    <div class="card">
      <div class="contents">
        <h1 class="title">
          <!-- dataからお友達の名前を取得 -->
          {{ title }}
        </h1>
        <div class="mainv">
          <img :src="mainv.url" alt="メイン画像">
        </div>
        <div class="contents">
          <h2>プロフィール</h2>
          <span v-html="body" />
        </div>
      </div>
    </div>
  </div>
</template>
```

#### select部分
APIで取得してきたデータをv-forで回して`option`を作成しています。
`:value`の書き方が特殊なので注意してください。

#### card部分
`titile` ⇒ 通常の`{{ }}`を使用して`<h1>`に適用
`mainv`  ⇒ `v-bind`を使用した`src`で`<img>`に適用
`body`  ⇒ 取得してきたhtmlタグをそのまま使用するため、`v-html`で適用

これでAPIで取得してきたデータ分だけページが作成されるはずです！

## まとめ
動的ルーティングはHeadlessCMSを使ったブログページ作成などで重宝しそうです。
ただ、APIを使用したブログページがSEOや表示速度の面でどうなのか気になる所です。
HeadlessCMSの使用箇所としてはブログなどの情報量が多いものではなく、ページの一部のみ
簡単に変更したい場合などに使うようにするくらいが良いのだろうか…難しいところです。
