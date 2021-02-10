---
title: npm-scriptsで始めるTypeScript入門
date: "2021-02-08"
description: フロントエンド界隈では使えるのが当たり前になりつつあるTypeScript。今回は、まだTypeScriptに触れたことが無い人向けに、npm-scriptsで簡易的に環境構築を行いTypeScriptを試す方法をご紹介します。
tag:
  - Nuxt.js
  - MicroCMS
---

## 概要

`Vue`や`React`などの新しいフレームワークに夢中になっている間、ずっと見て見ぬふりをしてきたTypeScript。  
そろそろやらねば。という事で、今更ながらTypeScript勉強してみました。

## 導入

ひとまず環境構築をする前に、[公式サイト](https://www.typescriptlang.org/)を参考にTypeScriptを軽く触ってみましょう。

今回は`npm`を使用して、Windows環境に導入します。  
下記コマンドをbash等のターミナルで叩いてみましょう。

```bash
npm install -g typescript
```

導入はこれで終了です。

<p class="kao sleep">
あれ…速攻できるやん…
</p>

## TypeScriptを書いてコンパイルしてみる

コマンド一つで導入できてしまったので、とりあえずTypeScriptを書いてみます。  
試しに`test.ts`というファイルを作成して、下記の様なコードを書いてみましょう。

```typescript
function hello(name: string) {
  return "Hello! " + name + "!";
}

let you = "dummy men";

console.log(hello(you));
```

コード内容的には、よくある「hello world」です。引数の所に何やら見えるかもしれませんが、 一旦スルーしてコピーしてください。

次に、作成した`test.ts`をコンパイルしていきます。下記コマンドを叩いてみましょう。

``bash
tsc test.ts
```

すると、test.tsを作成した同一ディレクトリに、`test.js`というJavaScriptの形式に されたファイルが出現するはずです！これでコンパイルも完了。

では、実際にコードを実行してみましょう！  
ターミナルで下記の様にコマンドを叩いてみてください。

```bash
node [該当のパス]/test.js
```

すると「Hello! dummy men!」と表示されるはずです！

<p class="kao sleep">
あ、あれれ…速攻できるやん…
</p>

## TypeScriptの「型」について

先ほど作成した`test.ts`の`hello関数`の引数が、通常のJavaScriptの形式では見慣れない記載方法だったかと思います。  
これが何かといいますと、そうです。「型」です。

`hello(name: string)`は「引数nameは`string`型じゃないとこの関数は使えませんよ！」という事を定義しています。  
試しに、`let you = "dummy men";`の箇所を`let you = 4649;`や`let you = ["iam", "dummy men"];`といった `string`以外の型して、再度コンパイルしてみましょう。  
すると、エラーメッセージが返されるはずです！

今回、詳細な説明は省きますが「interface」や「class」などにも対応しています。

<p class="kao sleep">
コンパイルのタイミングで簡易的な単体テストの様な事ができるんや…便利…
</p>

## TypeScript 環境構築

それでは実際に`TypeScript`を開発で使用する為に、環境構築を行っていきましょう。  
この記事を書き始めた当初は、`webpack`を使用してガチガチの開発環境を構築しようと思っていたのですが、  
調べていくうちに「純粋に`TypeScript`だけを導入するだけならば`npm-scripts`だけで環境構築ができるのでは？」  
と思ったので、`npm-scripts`のみで開発環境を構築してみました。

<p class="kao sleep">
webpackでの環境構築は他に素敵な記事が大量にあったしね…
</p>

まずはディレクトリを作成して、`npm init`しましょう。  
私の場合は、`TypeScript-Test`というディレクトリを作成しました。

```bash
mkdir TypeScript-Test
cd TypeScript-Test
npm init
```

次に`TypeScrip`をインストールします。今回はgit等で開発環境を共有するために`-D`オプションを付けましょう。

```bash
npm install -D typescript
```

インストールが完了し、node_modulesディレクトリが作成されたら  
tsconfig.jsonを作成しましょう。ここではtsファイルのコンパイル先のディレクトリを指定したり、  
コンパイルの形式を指定したりすることができます。細かい設定については[TypeScriptの公式ドキュメント](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)を参照しましょう。

tsconfig.jsonを下記の様に記載してください。

```json:title=tsconfig.json
{
  "compilerOptions": {
    "module": "system",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "outDir": "./dist/js/",    // 書き出しフォルダの指定
  },
  "include": [
    "./src/ts/*.ts"            // 監視対象の指定
  ],
  "exclude": [
    "./node_modules",
    "**/*.spec.ts"
  ]
}
```

コード内にもコメントアウトで記載はしていますが、主に注目して頂きたいのは`outDir`と`include`の箇所になります。  
`include`で次の工程で説明する監視コマンドの、監視対象を指定しています。  
`outDir`ではコンパイルされたデータを吐き出すディレクトリを指定しています。ここを`outFile`として、  
ファイル名を指定すると、すべてのtsファイルを指定した1つのファイルに連結して出力してくれます。

次に、`package.json`を下記の様に記述してください。

```json:title=package.json
{
  "name": "typescript-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "watch": "tsc -w"      // ここでwatch scriptを設定
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^3.8.3"
  }
}
```

変更するのは`scripts`の個所ですが、見てもらうとわかる通りめちゃくちゃ簡単ですね。

## 実際にコンパイルしてみる

では最後に実際にコンパイルしてみましょう。`tsconfig.json`で指定した通り、  
`./src/ts/`ディレクトリ内に`index.ts`を作成して、この記事のはじめにテストしてみた下記コードをコピペしてみましょう。

```js:title=index.ts
function hello(name: string) {
  return "Hello! " + name + "!";
}

let you = "dummy men";

console.log(hello(you));
```

そして、さきほど`package.json`で設定した下記コマンドを打ってみます。

```bash
npm run watch
```

すると、`./dist/js/index.js`というjsファイルが出力されているはずです！  
`./src/ts/`ディレクトリ内に他の名前のtsファイルを作成すると、`./dist/js/`ディレクトリに  
出力が行われることが確認できるかと思います。また、この記事のはじめの方で行ったように  
型の違反を行うと、しっかりエラーメッセージが返されます！

## 感想

ずっと避けてきたTypeScriptですが、意外に簡単に入門できました！  
フレームワーク等では標準で装備されているものも多いですが、  
いきなりフレームワークで使うのは難しいので、`npm-scripts`で簡易的に  
環境構築をして、実装環境が作れると便利です！

<script type="application/ld+json">
[
  {
    "@context": "http://schema.org",
    "@type": "Article",
    "name": "npm-scriptsで始めるTypeScript入門",
    "headline": "npm-scriptsで始めるTypeScript入門",
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
    "description": "フロントエンド界隈では使えるのが当たり前になりつつあるTypeScript。今回は、まだTypeScriptに触れたことが無い人向けに、npm-scriptsで簡易的に環境構築を行いTypeScriptを試す方法をご紹介します。",
    "url": "https://noob-front-end-engineer-blog.com/typescript-npm-scripts/",
    "mainEntityOfPage": "https://noob-front-end-engineer-blog.com/typescript-npm-scripts/",
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
    "datePublished": "2021-02-08",
    "dateModified": "2021-02-08"
  }
]
</script>
