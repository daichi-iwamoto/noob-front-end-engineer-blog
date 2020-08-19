---
title: React初心者向け Gatsbyざっくり入門
date: "2020-01-06"
description: React初心者によるReact初心者の為のGatsby入門書です。ディレクトリ構造等基本的な内容を紹介します。
tag:
  - Gatsby.js
---

## 概要

- React 初心者による Gatsby 入門メモ
- 主に[公式サイト](https://www.gatsbyjs.org/)の意訳
- React の基本構文を最低限理解している方向け

<font color="LightPink">※React 玄人の方は違和感を感じたらバンバン指摘オネシャス</font>

## Gatsby とは

- React 製の静的サイトジェネレータ
- なんか最近 Hot らしい :fire:

## 導入

```bash:bash
npm install -g gatsby-cli
gatsby new gatsby-site
```

## ディレクトリ構造

Gatsby を導入すると初期構造は下記の様なものになります
<font color="DarkGray">※ 2020/01/06 時点</font>

```
|-- /.cache
|-- /plugins
|-- /public
|-- /src
    |-- /pages
    |-- /templates
    |-- html.js
|-- /static
|-- gatsby-config.js
|-- gatsby-node.js
|-- gatsby-ssr.js
|-- gatsby-browser.js
```

### /src/

主にここを触ることになります
コンポーネント等を作成する際はここにフォルダーを作るなりして作成します

### /src/pages/

『/src/pages/』内に作成されたファイル名で、ページが自動的に生成されます
便利 :sob:

### /static/

画像等をここに設置します

### /gatsby-config.js

プラグインの設定・メタデータの設定等を行います

### /gatsby-config.js

サイトデータを記載するファイル
title,description,author ect...プラグインなどのメタデータもここで設定

## サイト内リンク

Gatsby でサイト内リンクを設置する場合は`<Link />`を使用します
`/src/pages/index.js`を見てみると下記のような記述があるかと思います

```react:/src/pages/index.js
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)
```

`<Link to="/page-2/">Go to page 2</Link>`左記のようにリンク先を指定できます

## レイアウトコンポーネント

ページ内リンクの説明で記載した`/src/pages/index.js`を見てみると、
`<Layout>`というタグがあります
このように Layout コンポーネントでページ全体をラッピングするのが一般的です
スタイルや関数を複数ページで共有できるようになっています

デフォルトでは`/src/components/layout.js`に設置してあります

## プログラムを使用してページを作成する

`/gatsby-node.js`を使用します

```react:/gatsby-node.js
exports.createPages = ({ actions }) => {
  const { createPage } = actions
  const pageData = [
    {
      pageName: "dummy01",
      contents: "ダミー作成",
    },
    {
      pageName: "dummy02",
      contents: "ダミー作成",
    }
  ]

  pageData.forEach(data => {
    createPage({
      path: `/${data.pageName}`,
      component: require.resolve(`./src/template/create-page.js`),
      context: { data },
    })
  })
}
```

`const pageData`にあるデータをもとに`forEach`をかけてページを作成できます
ブログページなどであれば、ここに文言を記入するだけで簡単にページを作成してくれます

## `<Layout>`以外でグローバルに使用する CSS の設定

`gatsby-browser.js`を使用します

```react:gatsby-browser.js
import "./src/styles/common.css"
```

この 1 行で`/src/styles/common.css`が全ページで適用されるようになります

## Style 付コンポーネントの作成

JSX で css が記載できるようにする為にはプラグインを追加する必要があります

`gatsby-plugin-styled-components`
`styled-components`
`babel-plugin-styled-components`
の 3 つをインストールします

```bash:bash
npm install --save gatsby-plugin-styled-components styled-components babel-plugin-styled-components
```

そして`/gatsby-config.js`にプラグインを追加しましょう

```react:/gatsby-config.js(略版)
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
  ],
```

css を記述したいコンポーネントでプラグインをインポートする必要があります
今回は`/src/pages/index.js`で使用してみます

```react:src/pages/index.js
import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const StyledDiv = styled.div`
  color: #ff7675;
  font-weight: bold;
  font-size: 24px;
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <StyledDiv>★ test ★</StyledDiv>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
```

`import styled from "styled-components"`でインポートを行い
`const StyledDiv = styled.div`で style 付の Div 要素を作成します
それを`<StyledDiv>★ test ★</StyledDiv>`と呼び出すことによって
style 付の Div 要素が表示されるはずです
書き方面白い :thinking:

## Sass & Scss の導入

`node-sass`と`gatsby-plugin-sass`を導入する

```bash:bash
npm install --save node-sass gatsby-plugin-sass
```

`/gatsby-config.js`にプラグインを追加します

```react:/gatsby-config.js(略版)
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
  ],
```

これでファイルを`.sass`や`.scss`として作成すれば、css を import している箇所を
sass や scss に変更してそのまま使用できます
