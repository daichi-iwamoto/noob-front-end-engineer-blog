---
title: nodeで画像の一括リサイズを行う
date: "2021-01-08"
description: nodeでsharpを用いて、画像の一括リサイズを行うモジュールの作成方法を紹介します。
tag:
  - node
---

## 概要
Web制作等で「大量の画像のサイズを統一しなければならない」という状況になり、  
Photoshopやillustratorで1枚1枚手動でリサイズするという苦行を行った事、  
見た事は無いですか？

今回はそういった方達を救済する為、`node.js`で`sharp`を用いて  
画像のリサイズを行うモジュールの作成方法を紹介します🙂

完成品は[こちら](https://github.com/daichi-iwamoto/node-img-resize/)です。  
使用方法は`README.md`に記載してありますので、お急ぎの方は上記を使用してみてください。

<p class="kao sleep">
Github強化中なので、☆, フォローいただけると喜びます
</p>

## 環境構築

今回使用する`node_module`達は下記の通りです。

| module | description                                |
| ------ | ------------------------------------------ |
| fs     | ファイル、ディレクトリの操作を行ってくれる |
| sharp  | 画像サイズの操作を行ってくれる             |

まずは、今回のデモを行う為のディレクトリを作成・移動、  
必要なモジュールをインストールしていきましょう。

```bash:title=bash
# ディレクトリ作成
mkdir demo

# ディレクトリ移動
cd demo

# npm 初期設定
npm init

# モジュールインストール
npm install fs sharp -D
```

今回のデモは下記のようなディレクトリ構造で行っていきます。

```bash
demo
  └ dist
     └ img   # <-- リサイズ後の画像の出力先
  └ src
     └ img   # <-- リサイズ前の画像の格納場所
```

コマンドでもエクスプローラーでも構わないので、  
`dist/img/`ディレクトリと`src/img/`ディレクトリを作成しておいてください。

## リサイズモジュールの作成

`package.json`と同じ階層に、設定用のJSファイルを作成してください。  
このファイル名は特に指定はありませんが、今回は`sharp.js`という名前で行っていきます。

まずはモジュールの読み込み、  
リサイズ対象の画像が設置されているディレクトリを取得してみましょう。

```javascript:title=sharp.js
const fs = require('fs');
const sharp = require('sharp');

const files = fs.readdirSync('./src/img', { withFileTypes: false });
```

`fs`モジュールの`readdirSync`を使用する事によって、  
第一引数内にあるファイルのパス群を取得することができます。  
これについては下記の記事がわかりやすかったので参考にさせて頂きました。  
[Node.jsで高速にファイル一覧を取得するfs.readdirのwithFileTypesオプション](https://qiita.com/shisama/items/affb219514eb1166198e)

これで`files`にリサイズ対象のファイルパスが格納されました。  

### 横幅を指定して縦横比を保ったままリサイズ

ここからは`sharp`モジュールを使用して実際にリサイズを行っていきます。  
まずは「横幅を指定して縦横比を保ったままリサイズ」をする為のコードを書いていきましょう！

先ほど作成した`sharp.js`に下記を追記してください。

```javascript:title=sharp.js
if (process.argv[2] == 'w') {
  files.map(file => {
    sharp(`./src/img/${file}`)
      .resize(Number(process.argv[3]))
      .toFile(`./dist/img/${file}`, (err, info) =>{
        if (err) {
          throw err;
        }
        console.log(info);
      })
  });
} 
```

上記で使用している`process.argv[2]`というのは、  
この`sharp.js`を実行する際に渡す『第一引数』の値が入ります。
ここでは第一引数に`w`を指定した場合、横幅を指定して縦横比固定リサイズを行う処理に入るように作成していきます。

まず、先ほど`fs`モジュールで取得してきたリサイズ対象のファイルパス群を  
ループで回して、全ファイルに対して処理が実行されるようにします。

`sharp`の第一引数で対象のファイル名、`.resize()`でリサイズ後のサイズを指定  
`toFile`で出力先を指定しています。  

`.resize()`は第一引数に`width`、第二引数に`height`の値が入ります。  
今回の場合は`width`を`sharp.js`を実行する際の『第二引数』の値が入ります。

<p class="kao sleep">
『argv[2]』 に『第一引数』が入るというのは、よく間違うので注意です！<br>
たまに使うと僕はよく間違えます
</p>

では実際に実行してみましょう！  
`sharp.js`があるディレクトリで下記コマンドを実行してください。

```bash:title=bash
node sharp.js w 1200
```

これを実行すると`src/img/`に設置されている画像が  
横幅`1200`固定でリサイズされて`dist/img/`に出力されるはずです！

### 縦幅を指定して縦横比を保ったままリサイズ

次は「縦幅を指定して縦横比を保ったままリサイズ」をする為のコードを書いていきましょう！

先ほど作成した`sharp.js`に下記を追記してください。

```javascript:title=sharp.js
else if (process.argv[2] == 'h') {
  files.map(file => {
    sharp(`./src/img/${file}`)
      .resize(null, Number(process.argv[3]))
      .toFile(`./dist/img/${file}`, (err, info) => {
        if (err) {
          throw err;
        }
        console.log(info);
      })
  });
} 
```

先ほど作成した「横幅を指定して縦横比を保ったままリサイズ」の処理と内容は殆ど同じです。

変更点としては`.resize()`の箇所で、第一引数の横幅指定の箇所に`null`を指定し、  
第二引数の縦幅指定の箇所に、`sharp.js`実行時の第二引数を指定しています。

実行する際のコマンドは下記の通りです。

```bash:title=bash
node sharp.js h 500
```

これを実行すると`src/img/`に設置されている画像が  
縦幅`500`固定でリサイズされて`dist/img/`に出力されるはずです！

### 縦横のサイズを指定してトリミング

最後に「縦横のサイズを指定してトリミング」をする為のコードを書いていきましょう！

先ほど作成した`sharp.js`に下記を追記してください。

```javascript:title=sharp.js
else if (process.argv[2] == 'wh') {
  files.map(file => {
    sharp(`./src/img/${file}`)
      .resize({
        width: Number(process.argv[3]),
        height: Number(process.argv[4])
      })
      .toFile(`./dist/img/${file}`, (err, info) => {
        if (err) {
          throw err;
        }
        console.log(info);
      })
  });
} 
```

先ほどまでの処理と内容は殆ど同じです。

今回も変更点としては`.resize()`の箇所で、`width`と`height`を  
指定することで、そのサイズでトリミングを行う事ができます。

実行する際のコマンドは下記の通りです。

```bash:title=bash
node sharp.js wh 1200 500
```

これを実行すると`src/img/`に設置されている画像が  
横幅`1200`, 縦幅`500`でトリミングされた画像が`dist/img/`に出力されるはずです！

## おわり

今回は`sharp`モジュールの活用法をご紹介しました。  

最後に紹介したトリミングは、デフォルトで中央を基準にトリミングしますが、  
基準を変更する事もできたり、いろいろとカスタマイズが可能です！

その他にも公式サイトの方でプロパティの説明等行われていたりするので  
是非見てみてください！

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Article",
  "name": "nodeで画像の一括リサイズを行う",
  "headline": "nodeで画像の一括リサイズを行う",
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
  "description": "nodeでsharpを用いて、画像の一括リサイズを行うモジュールの作成方法を紹介します。",
  "url": "https://noob-front-end-engineer-blog.com/npm-script-image-resize/",
  "mainEntityOfPage": "https://noob-front-end-engineer-blog.com/npm-script-image-resize/",
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
  "datePublished": "2021-01-08",
  "dateModified": "2021-01-08"
}
</script>
