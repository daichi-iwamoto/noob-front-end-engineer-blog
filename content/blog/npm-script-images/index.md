---
title: npm-script で画像圧縮を行う際のベストプラクティス
date: "2020-08-12"
description: npm-scriptを用いて、画像の追加を監視し、画像が追加・変更されると自動で圧縮してくれるように設定する方法を紹介します。
---

## 概要
npm-scriptで自動画像圧縮を行う手順を紹介します :star2:
$\scriptsize{ ベストプラクティスとか書いてるけどもっといい方法あったら指摘お願いします… }$

## 使用するモジュール群
| module | description |
| --- | --- |
| imagemin | 画像圧縮してくれる |
| imagemin-keep-folder | ディレクトリ構造を維持したまま圧縮してくれる |
| imagemin-gifsicle | gifの圧縮をしてくれる |
| imagemin-mozjpeg | jpegの圧縮をしてくれる |
| imagemin-pngquant | pngの圧縮をしてくれる |
| imagemin-svgo | scgの圧縮をしてくれる |
| onchange | 変更の監視をしてくれる |

```bash
# モジュールのインストール
npm install imagemin imagemin-keep-folder imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo onchange -D
```

## デモのディレクトリ構造
今回のデモは下記の様なディレクトリ構造で行っていきます

```
dist
  └ img   # <-- 圧縮後の画像の出力先
src
  └ img   # <-- 圧縮前の画像の格納場所
```

## package.json
`script`に下記を追加してください

```json
"press": "onchange src/img/**/*.{jpg,png,gif,svg} -- node imagemin.js {{changed}}"
```

やっている事としては、先ほどインストールを行った`onchange`モジュールが
`src/img/**/*.{jpg,png,gif,svg}`を監視し、変更が検知されたら
`node imagemin.js {{changed}}`を実行してくれるという処理です

node.jsでは`node 〇〇.js`で指定したjsを実行してくれます
更にコマンドラインから引数を渡す事も可能なので、今回は`onchange`モジュールが
検知した変更ファイルを教えてくれる`{{changed}}`を渡しています

## imageminの設定ファイルを作成
`package.json`と同じ階層に、設定用のJSファイルを作成してください
このファイル名は特に指定はありませんが、今回は先ほど指定した`imagemin.js`で作成していきます

作成した`imagemin.js`はこんな感じ

```javascript:imagemin.js
const imagemin = require('imagemin-keep-folder');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

imagemin([process.argv[2]], {
  plugins: [
    imageminMozjpeg({ quality: 80 }),
    imageminPngquant(),
    imageminGifsicle(),
    imageminSvgo()
  ],
  replaceOutputDir: output => {
    return output.replace(/img\//, '../dist/img/')
  }
}).then(() => {
  console.log('Images optimized');
});
```

設定ファイルの上部は使用する`imagemin`系列のモジュールを読み込んでいます
今回はディレクトリ構造を維持したまま書き出しを行ってほしいので`imagemin-keep-folder`の方を使用しています

```js
imagemin([process.argv[2]], {
```
上記で使用している`process.argv[2]`というのは、先ほど`package.json`で渡した引数
`{{changed}}`の値が入ってきています コマンドラインからの引数を参照する場合
指定方法が少し特殊でこのような書き方になってます

これについては詳しく他の方が書いてくださっているのでこちらの素敵記事を参考にしてください
https://qiita.com/furusin_oriver/items/f030d1eaa9e7b54233c3

`plugins`では、使用するプラグインを指定しています
それぞれで圧縮率等のオプションを設定する事ができるので、こちらについてはお好みでどうぞ

`replaceOutputDir`では出力先の指定をしています

```js
output.replace(/img\//, '../dist/img/')
```
上記の様にありますが、`output`には圧縮する画像のpathが入っています
今回で言うと`{{changed}}`の値が入っており、たとえば`/src/img/test/test.png`という画像を追加したとします
すると、この`output`にも同じ値がはいるので`replace`を行うと、`/src../dist/img/test/test.png`となり
今回想定しているディレクトリに出力されるようになります

## 実行
下記を実行し、`/src/img/`ディレクトリに適当な画像を保存してみると圧縮が行われるはずです！

```bash
npm run press
```

## おわりに
npm-scriptで画像圧縮を自動化する手法を調べると幾つか記事は見つかったのですが
画像を圧縮したいタイミングでコマンドを打つ手法が一番多く、監視を行って圧縮する手法を書いたものは
あまりありませんでした

幾つかの記事を参考にこの手法を作成する事は出来ましたが、
確かに画像ってそんなにポンポン変更しないし監視するまでもないよな…

### 参考にさせていただいた記事
https://techblog.lclco.com/entry/2018/08/31/180000
https://qiita.com/k-gen/items/79812b04593b233b1ac1
