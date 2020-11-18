---
title: Svelte・Sapper で Hello World を行う
date: "2020-07-24"
description: 軽量なJSフレームワーク「Svelte」を使用してみました。Svelte製フレームワーク「Sapper」にも記事内で触れています。VueやReactと軽く比較してみての感想等々を書いてあります。
tag:
  - Svelte
  - Sapper
---

## SVELTEとは

[公式サイト](https://svelte.dev/)はこちら。  
ざっくり説明すると記述方法が簡単で早いJS フレームワークです。  
記述方法だけ見てると、簡単すぎて`Vue`や`React` っていうよりはもはや  
`Pug`とかの方が近くない！？ってなるくらい簡単。

## SAPPERとは

`SAPPER`は`SVELTE`のフレームワークで  
`Vue`でいう`Nuxt`,`React` でいう`Next`的なポジションの奴です。  

## SVELTE導入

まずは`SVELTE`の導入を行っていきましょう！  
公式サイトを見ると`zip`と`npm`での導入方法が紹介されていますが、  
今回は`npm`で行っていきます。

まずは`SVELTE`のインストール。

```bash:title=bash
# 公式リポジトリからコピーを落としてくる
npx degit sveltejs/template プロジェクト名

# プロジェクトに移動
cd プロジェクト名

# 関連モジュールのインストール
npm install

# 開発サーバの立ち上げ
npm run dev
```

これで立ちあがった localhost を開く`SVELTE`の初期画面が表示されるかと思います。  
前準備はたったこれだけでOK&#x1f44c;

ちなみに、公式リポジトリからコピーを落としてくる際に使用している`degit`というのは  
`git clone`より高速にソースを落としてきてくれる優れものだそうです。（[npm](https://www.npmjs.com/package/degit)）

基本的な構文や使い方を学びたい場合は、ここまでできればあとは  
`/src/App.svelte`を色々いじって試すことができます。

ただ、ルーティング等を考え出すと現状`vue-router`や`react-router`的な存在がいないので  
その他の`page.js`等のモジュールをインストールしてそれぞれ設定する必要があります。  
それはメンドクサイし、情報自体も現段階ではあまりないので  
`SAPPER`を入れちゃいたいと思います。

## SAPPER 導入

rollup 版と webpack 版があるのですが、今回は webpack 版の導入を行っていきます。  
[公式](https://sapper.svelte.dev/)に沿って導入を進めます。

```bash:title=bash
npx degit 'sveltejs/sapper-template#webpack' プロジェクト名
```

モジュール類をインストールして開発サーバを立ち上げてみましょう。

```bash:title=bash
# プロジェクトに移動
cd プロジェクト名

# 関連モジュールのインストール
npm install

# 開発サーバの立ち上げ
npm run dev
```

これで立ちあがった localhost を開くと`SAPPER`の初期画面  
『╭( ･ㅂ･)و̑ ｸﾞｯ』の赤ちゃんが表示されるかと思います。

`SAVELTE`同様、導入はとても簡単。  
あと、`nuxt`や`next`と比べると開発サーバが立ちあがるまでがめちゃくちゃ早い。

## SAPPER のディレクトリ構造

作成した`SAPPER`プロジェクトの中身を少し詳しく見てみましょう！

### src

まずは`/src/`ディレクトリを開いてみましょう。  
こちらには`.svelte`ファイルのコンポーネントを置いておく為の  
`components`ディレクトリや、自動でルーティングを行ってくれる`routes`ディレクトリがあります。

`routes`ディレクトリを確認してもらうと、`index.svelte`や`about.svalte`があります。  
例えばここに`test.svalte`というファイルを作成すると、  
[http://localhost:3000/test](http://localhost:3000/test) に表示されます。

`Nuxt`や`Next`でもおなじみの機能ですが、  
僕はもうこれだけの為に`SAPPER`や`Nuxt`といったフレームワークを  
入れてもいいんじゃないかと思ってるくらい便利…

`components/blog/`ディレクトリを見てもらうと`js`とテンプレートから  
ページを作成できるような記述例も見れるのでチェックしてみてください。

### __sapper__

下記コマンドを実行する事で、`.svelte`ファイルで作成したものを  
静的な`html`ファイルに変換して`/__sapper__/export/`に吐き出してくれます。

```bash:title=bash
npm run export
```

`Nuxt`で言うところの`npm run generate`にあたるコマンドかな？  
先ほど紹介した`js`とテンプレートでページ作成を行っている箇所も  
しっかり`html`ファイルとしてそれぞれ書き出しが行われます。

## その他

`webpack`で`scss`を入れたい時は下記の素敵な記事を参考にしてください。  
<https://qiita.com/azukisiromochi/items/7313c958b46048c7bcdc>

## 所感

環境構築はめちゃくちゃ簡単で、ローカルホストが立ちあがるのもめちゃくちゃ早い。  
ディレクトリ構造もシンプルなので、ちょっと触ってみようかな～と思ったら  
すぐに始められるのがうれしかったです。

あと、`Vue`や`React`より公式の[Examples](https://svelte.dev/examples#hello-world)がめちゃくちゃ豊富。  
しかもアニメーションもめっちゃ豊富。

`CSS`やマークアップに強みを持っている人達が  
The フロントエンド の技術に触れる前に、`svelte`を触ってみると  
とっかかりやすそうだと思いました。  

`vue`とか`react`を触っている人たちなら、全くと言っていいほど参入障壁は無さそうです。

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Article",
  "name": "Svelte・Sapper で Hello World を行う",
  "headline": "Svelte・Sapper で Hello World を行う",
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
  "description": "軽量なJSフレームワーク「Svelte」を使用してみました。Svelte製フレームワーク「Sapper」にも記事内で触れています。VueやReactと軽く比較してみての感想等々を書いてあります。",
  "url": "https://noob-front-end-engineer-blog.com/svelte-sapper-starter/",
  "mainEntityOfPage": "https://noob-front-end-engineer-blog.com/svelte-sapper-starter/",
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
