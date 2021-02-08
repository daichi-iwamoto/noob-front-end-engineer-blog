---
title: npm-scriptsで画像をWebpに変換する
date: "2021-02-03"
description: npm-scriptsを用いて、画像をWebpの形式に変換してくれるモジュールの作成方法を紹介します。
tag:
  - node
  - npm-scripts
---

## 概要

`npm-scripts`を用いて、画像の追加・変更を監視し  
自動で圧縮してくれるモジュールを作成する方法を紹介します！

完成品は[こちら](https://github.com/daichi-iwamoto/node-img-compressor)です。  
使用方法は`README.md`に記載してありますので、お急ぎの方は上記を使用してみてください。

<p class="kao sleep">
Github強化中なので、☆, フォローいただけると喜びます
</p>

`node`と`linuxコマンド`に対する基礎的な知識はあるものとして解説を進めていきます。

## 環境構築

今回使用する`node_module`達は下記の通りです。

| module               | description                                  |
| -------------------- | -------------------------------------------- |
| imagemin             | 画像圧縮してくれる                           |
| imagemin-keep-folder | ディレクトリ構造を維持したまま圧縮してくれる |
| imagemin-gifsicle    | gif の圧縮をしてくれる                       |
| imagemin-mozjpeg     | jpeg の圧縮をしてくれる                      |
| imagemin-pngquant    | png の圧縮をしてくれる                       |
| imagemin-svgo        | scg の圧縮をしてくれる                       |
| onchange             | 変更の監視をしてくれる                       |

まずは、今回のデモを行う為のディレクトリを作成・移動、  
必要なモジュールをインストールしていきましょう。

`init`の際にでてくる入力項目は任意で問題ありません。

```bash:title=bash
# ディレクトリ作成
mkdir demo

# ディレクトリ移動
cd demo

# npm 初期設定
npm init

# モジュールインストール
npm install imagemin imagemin-keep-folder imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo onchange -D
```

今回のデモは下記のようなディレクトリ構造で行っていきます。

```bash
demo
  └ dist
     └ img   # <-- 圧縮後の画像の出力先
  └ src
     └ img   # <-- 圧縮前の画像の格納場所
```

コマンドでもエクスプローラーでも構わないので、  
`dist/img/`ディレクトリと`src/img/`ディレクトリを作成しておいてください。

## package.jsonの編集

先ほどのモジュールインストールの際に行った  
`npm init`によって`package.json`が作成されていると思うので  
そちらの編集を行っていきましょう。

`package.json`の`"script"`の箇所に下記を追加してください。

```json:title=package.json
"press": "onchange src/img/**/*.{jpg,png,gif,svg} -- node imagemin.js {{changed}}"
```

やっている事としては、先ほどインストールを行った`onchange`モジュールが  
`src/img/**/*.{jpg,png,gif,svg}`を監視し、変更が検知されたら  
`node imagemin.js {{changed}}`を実行してくれるという処理です。  
この`imagemin.js`については、次のセクションで作成を行っていきます。


node.js では`node 〇〇.js`で指定したjsファイルを実行してくれます。  
更にコマンドラインから引数を渡す事も可能なので、今回は`onchange`モジュールが  
検知した変更ファイルを教えてくれる`{{changed}}`を引数として渡しています。

## imageminの設定ファイル作成

`package.json`と同じ階層に、設定用のJSファイルを作成してください。  
このファイル名は特に指定はありませんが、今回は先ほど`package.json`で  
指定した`imagemin.js`で作成していきます。

```javascript:title=imagemin.js
const imagemin = require("imagemin-keep-folder")
const imageminMozjpeg = require("imagemin-mozjpeg")
const imageminPngquant = require("imagemin-pngquant")
const imageminGifsicle = require("imagemin-gifsicle")
const imageminSvgo = require("imagemin-svgo")

imagemin([process.argv[2]], {
  plugins: [
    imageminMozjpeg({ quality: 80 }),
    imageminPngquant(),
    imageminGifsicle(),
    imageminSvgo(),
  ],
  replaceOutputDir: output => {
    return output.replace(/img\//, "../dist/img/")
  },
}).then(() => {
  console.log("Images optimized")
})
```

設定ファイルの上部は使用する`imagemin`系列のモジュールを読み込んでいます。  
今回はディレクトリ構造を維持したまま書き出しを行ってほしいので`imagemin-keep-folder`の方を使用しています。  

```javascript:title=imagemin.js
imagemin([process.argv[2]], {
```

上記で使用している`process.argv[2]`という箇所には、  
先ほど`package.json`で渡した引数`{{changed}}`の値が入ってきています。  
コマンドラインからの引数を参照する場合、指定方法が少し特殊でこのような書き方になってます。

こちらについては、他の方が詳しく書いてくださっているので  
こちらの素敵記事を参考にしてください。
<https://qiita.com/furusin_oriver/items/f030d1eaa9e7b54233c3>

`plugins`では、使用するプラグインを指定しています。  
それぞれの圧縮率等のオプションを設定する事ができるので、こちらについてはお好みでどうぞ

`replaceOutputDir`では出力先の指定をしています。

```javascript:title=imagemin.js
output.replace(/img\//, "../dist/img/")
```

上記の様にありますが、`output`には圧縮する画像の path が入っています。  
今回で言うと`{{changed}}`の値が入っており、`/src/img/test/test.png`という画像を  
追加したとすると、この`output`にも同じ値がはいります。その値に`replace`を行うと  
`/src../dist/img/test/test.png`となり、今回想定しているディレクトリに出力されるようになります。

## 実行

下記を実行し、`/src/img/`ディレクトリに適当な画像を保存してみると圧縮が行われるはずです！

```bash:title=bash
npm run press
```

## おわりに

`npm-scripts`で画像圧縮を自動化する手法を調べると幾つか記事は見つかったのですが  
画像を圧縮したいタイミングでコマンドを打つ手法が一番多く、監視を行って圧縮する手法を書いたものは  
ありませんでした。

幾つかの記事を参考に、この手法を作成する事は出来ましたが  
画像圧縮くらいであれば、自動化しなくとも都度コマンドを打っても問題ないよな…  
と思って、完成例には監視で圧縮する場合と、コマンドで圧縮する場合の2つ用意しました🙆‍♂️

### 参考にさせていただいた記事

<https://techblog.lclco.com/entry/2018/08/31/180000>  
<https://qiita.com/k-gen/items/79812b04593b233b1ac1>

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Article",
  "name": "npm-scriptsで画像圧縮を自動化する",
  "headline": "npm-scriptsで画像圧縮を自動化する",
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
  "description": "npm-scriptsを用いて、画像の追加・変更を監視し自動で圧縮してくれるモジュールを作成する方法を紹介します。",
  "url": "https://noob-front-end-engineer-blog.com/npm-scripts-images/",
  "mainEntityOfPage": "https://noob-front-end-engineer-blog.com/npm-scripts-images/",
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
  "datePublished": "2021-02-03",
  "dateModified": "2021-02-03"
}
</script>
