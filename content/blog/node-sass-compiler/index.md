---
title: npm-scriptsでSassのコンパイル環境構築
date: "2021-02-19"
description: Sassの環境構築でよく使用されるGulpですが、最近ではnpm-scriptsの方が主流になりつつあります。今回はnpm-scriptsでSassの環境構築を行っていきます。また、よく目にするnode-sassではなくDart製のパッケージを使用します。
tag:
  - Node.js
---

## 概要

今回は、`npm-script`を使用した`Sass`の環境構築手順を紹介します！  
説明するにあたって、大切な前知識があるのでまずはその紹介から入ります。

### 1. npm-scripts での環境構築

`Sass`の環境構築というと`Gulp`を使用されている例が多いかと思います。  
しかし 2020 年頃から、かの有名な[フロントエンドロードマップ](https://roadmap.sh/frontend)でもそこまで注目されなくなり  
`npm-scripts`で殆どの事が解決できるのではないかという雰囲気に。

という事で今回は`npm-scripts`での環境構築を行っていきます。

### 2. DartSass を使用したコンパイル

意外と知られていない事なのですが、厳密には`Sass`は 3 種類あります。

基本的な記述方法は同じですが、`@import`等細かな箇所で違いがあり、  
独自の機能・記述方法を使用している場合には、乗り換えは少し手間になる事があります。

#### 1. Ruby Sass

その名の通り、`Ruby`製の`Sass`です。

このタイプの場合コンパイルには`compass`が使用されており、  
`config.rb`という設定ファイルがあると思います。

3 種類の`Sass`の内で最も古く、2019 年にサポートが終わっています。  
昔から保守が続いているサイト・Web アプリ等ではよく見かけられます。

### 2. LibSass

こちらは`C++`製の`Sass`で、このタイプは`node-sass`でコンパイルが行われており  
現在最も多く使用されています。

<p class="kao sleep">
Gulpを使用している場合はgulp-sassになりますが、内部的にはnode-sassを使用しているみたいです
</p>

2021 年 2 月中旬の現在だと、記事等の情報も最も豊富で  
`node-sass`の週間インストール数も 400 万回行われています 😮

但し、こちらも 2020 年 10 月に`Sass`の公式から非推奨とされています。  
実際の記事：[https://sass-lang.com/blog/libsass-is-deprecated](https://sass-lang.com/blog/libsass-is-deprecated)

### 3. Dart Sass

こちらも名前の通り`Dart`製の`Sass`になります。  
`Sass`公式ではこちらが推奨されており、新機能の対応は  
殆どこちらでしかされていない状態です。

しかし、現段階の週間インストール数では`node-sass`よりも少なく
280 万回となっており、世界的に見てもまだ普及しきっていないような状態で  
特に日本での情報は多くありません。

という事で今回は、現段階では最新っぽい  
`npm-scripts`と`Dart Sass`での環境構築を行っていきます！

<p class="kao sleep">
前置き長くなってしまった…
</p>

## 環境構築

では、ここから実際に`Sass`の環境構築手順を紹介していきます！

### ディレクトリ作成

まずはテスト用のディレクトリを作成して`package.json`ファイルの作成をしましょう！

```bash
# テストディレクトリの作成（名前は任意）
mkdir node-sass-compiler

# 移動・package.jsonの作成
cd node-sass-compiler

npm init
```

### モジュールのインストール

次に使用するモジュールのインストールを行います。

| module | description               |
| ------ | ------------------------- |
| sass   | Dart 製の Sass コンパイラ |

```bash
# モジュールインストール
npm install sass
```

まず、`Sass`のコンパイルを行ってくれる`sass`モジュールを使ってみましょう。

### sass モジュールの使用方法

先ほど作成した`package.json`の`scripts`の箇所を下記の様に編集してみてください。

```json:title=package.json
# --- 略 ---
"scripts": {
    "sass": "sass src/scss/:dist/css/ --no-source-map --watch"
  },
# --- 略 ---
```

上記のスクリプトの解説はこんな感じです。

```bash
# sass [コンパイル前ファイル（ディレクトリ）]:[出力先ファイル（ディレクトリ）]
sass src/scss/:dist/css/
```

使用しているオプションの`--no-source-map`はソースマップを表示しない、  
`--watch`はコンパイル前ファイル（ディレクトリ）の変更を検知して  
コンパイルを実行してくれるものです。

オプション周りの詳細は下記公式を参考にしてください。  
`Dart Sass`のコマンドラインドキュメント：[https://sass-lang.com/documentation/cli/dart-sass](https://sass-lang.com/documentation/cli/dart-sass)

それでは実際にスクリプトを実行してみましょう！

```bash
npm run sass
```

これで`/src/sass/`ディレクトリ配下に`sass` or `scss`ファイルを作成・編集すると、  
コンパイルが行われ、`/dist/css/`ディレクトリに`css`ファイルが生成されます 😍

<p class="kao sleep">
単純なコンパイルのみであれば、めちゃくちゃ簡単…！
</p>

## 参考
`Dart Sass`の`npm`：[https://www.npmjs.com/package/sass](https://www.npmjs.com/package/sass)

`Dart Sass`のコマンドラインドキュメント：[https://sass-lang.com/documentation/cli/dart-sass](https://sass-lang.com/documentation/cli/dart-sass)

`Dart Sass`の`JS API`ドキュメント：[https://sass-lang.com/documentation/js-api](https://sass-lang.com/documentation/js-api)

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Article",
  "name": "npm-scriptsでSassのコンパイル環境構築",
  "headline": "npm-scriptsでSassのコンパイル環境構築",
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
  "description": "Sassの環境構築でよく使用されるGulpですが、最近ではnpm-scriptsの方が主流になりつつあります。今回はnpm-scriptsでSassの環境構築を行っていきます。また、よく目にするnode-sassではなくDart製のパッケージを使用します。",
  "url": "https://noob-front-end-engineer-blog.com/node-sass-compiler/",
  "mainEntityOfPage": "https://noob-front-end-engineer-blog.com/node-sass-compiler/",
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
  "datePublished": "2021-02-19",
  "dateModified": "2021-02-19"
}
</script>
