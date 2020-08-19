---
title: Svelte・Sapper で Hello Worldを行ってみた
date: "2020-07-24"
description: 軽量なJSフレームワーク Svelte を使用してみました。Svelte製フレームワーク Sapper にも記事内で触れています。Vue や React と軽く比較してみての感想等々
---

# SVELTEとは
[公式サイト](https://svelte.dev/)
ざっくり説明すると記述方法が簡単で、早い、JSフレームワークです
記述方法だけ見てると、簡単すぎてVueやReactっていうよりはもはや
Pugとかの方が近くない！？ってなるくらい簡単

# SAPPERとは
SAPPERはSVELTEのフレームワークで
VueでいうNuxt、ReactでいうNext的なポジションの奴です

## 前提
```2020/07/23 段階での情報を元に書いています```

## SVELTE導入
まずはSVELTEの導入を行っていきましょう
公式サイトを見るとzipとnpmでの導入方法が紹介されていますが、今回はnpmで行っていきます

まずはSVELTEのインストール

```bash
# 公式リポジトリからコピーを落としてくる
npx degit sveltejs/template プロジェクト名

# プロジェクトに移動
cd プロジェクト名

# 関連モジュールのインストール
npm install

# 開発サーバの立ち上げ
npm run dev
```

これで立ちあがったlocalhostを開くと、SVELTEの初期画面が表示されるかと思います
前準備はたったこれだけでOK:ok_hand: 

ちなみに、公式リポジトリからコピーを落としてくる際に使用している`degit`というのは
`git clone`より高速にソースを落としてきてくれる優れものだそうです（[npm](https://www.npmjs.com/package/degit)）

基本的な構文や使い方を学びたい場合はここまでできればあとは
`/src/App.svelte`を色々いじって試すことができます
ただ、ルーティング等を考え出すと現状`vue-router`や`react-router`的な存在がいないので
その他の`page.js`等のモジュールをインストールしてそれぞれ設定する必要があります
それはメンドクサイ:confused: し、情報自体も現段階ではあまりないので
SAPPERを入れちゃいたいと思います

## SAPPER導入
rollup版とwebpack版があるのですが、今回はwebpack版の導入を行っていきます
[公式](https://sapper.svelte.dev/)に沿って導入を進めます

```bash
npx degit 'sveltejs/sapper-template#webpack' プロジェクト名
```

モジュール類をインストールして開発サーバを立ち上げてみましょう

```bash
# プロジェクトに移動
cd プロジェクト名

# 関連モジュールのインストール
npm install

# 開発サーバの立ち上げ
npm run dev
```

これで立ちあがったlocalhostを開くと、SAPPERの初期画面
『╭( ･ㅂ･)و̑ ｸﾞｯ』の赤ちゃんが表示されるかと思います

SAVELTE同様、導入はとても簡単
あと、nuxtやnextと比べると開発サーバが立ちあがるまでがめちゃくちゃ早い

## SAPPERのディレクトリ構造
作成したSAPPERプロジェクトの中身を少し詳しく見てみましょう

### `src`
まずは`/src/`ディレクトリを開いてみましょう
こちらには`.svelte`ファイルのコンポーネントを置いておく為の
`components`ディレクトリや、自動でルーティングを行ってくれる`routes`ディレクトリがあります

`routes`ディレクトリを確認してもらうと、`index.svelte`や`about.svalte`があります
例えばここに`test.svalte`というファイルを作成すると、
`http://localhost:3000/test`に表示されます

NuxtやNextでもおなじみの機能ですが、僕はもうこれだけの為に
SAPPERやNuxtといったフレームワークを
入れてもいいんじゃないかと思ってるくらい便利

`components/blog/`ディレクトリを見てもらうとjsとテンプレートから
ページを作成できるような記述例も見れるのでチェックしてみてください

### `__sapper__`
下記コマンドを実行する事で、`.svelte`ファイルで作成したものを
静的なhtmlファイルに変換して`/__sapper__/export/`に吐き出してくれます

```bash
npm run export
```

Nuxtで言うところの`npm run generate`にあたるコマンドかな？
先ほど紹介したjsとテンプレートでページ作成を行っている箇所も
しっかりhtmlファイルとしてそれぞれ書き出しが行われます

## その他
webpackでscssを入れたい時は下記の素敵な記事を参考にしてください
https://qiita.com/azukisiromochi/items/7313c958b46048c7bcdc

## 所感
環境構築はめちゃくちゃ簡単で、ローカルホストが立ちあがるのもめちゃくちゃ早い
ディレクトリ構造もシンプルなので、ちょっと触ってみようかな～とおもったら
すぐに始められるのがうれしかったです

あと、VueやReactより公式の[Examples](https://svelte.dev/examples#hello-world)がめちゃくちゃ豊富
しかもアニメーションもめっちゃ豊富

CSSやマークアップに強みを持っている人達が
The フロントエンド の技術に触れる前に、svelteを触ってみると
とっかかりやすそうだと思いました
vueとかreactを触っている人たちなら、全くと言っていいほど参入障壁は無さそう
