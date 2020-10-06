---
title: React Hello World Examples
date: "2020-01-03"
description: Reactの入門として、Reactの基本的な機能群を使用してHello Worldを行ってみました。
tag:
  - React
---

## 概要

・ノーマル Hello World  
・関数コンポーネント Hello World  
・クラスコンポーネント Hello World

## 導入

[Create React App](https://ja.reactjs.org/docs/create-a-new-react-app.html#create-react-app)を使用して環境構築を行います
`npm`のバージョンが 5.2 以上であれば`npx`がデフォルトで入っているはずなので下記で導入ができます

```bash
npx create-react-app my-app
cd my-app
npm start
```

## Sass & Scss 導入

[こちら](https://qiita.com/yikeda6616/items/0e31a920d533d70c0bd9)の記事を参考に node-sass を導入して sass を使えるようにしました

## ① まずはノーマルの Hello world！

`/src/index.js`を下記の様に書き換えてください。

```react:/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';

const say = 'Hello, World!';

ReactDOM.render(
  <div>
    <h1>{ say }</h1>
  </div>,
  document.getElementById('root')
);
```

### ポイント

- <font color="Red">React</font>と<font color="Red">ReactDom</font>を import していないと怒られます
- <font color="Red">ReactDom.render</font>内で、表示する DOM を定義しています
- <font color="Red">getElement</font>で取得している`id="root"`という DOM 内に追加されます
- <font color="Red">ReactDom.render</font>で返される DOM は 1 つ DOM 要素である必要があります<br>
  今回は 1 つの`<div>`要素を返していることになります
- 3 行目の`import './sass/index.scss';`で scss を読み込んでいます<br>
  `/src/sass/`のディレクトリに`index.scss`を作成して、背景色等を変更し、変更が適用されるか確認してみましょう

```scss:/src/sass/index.scss
body {
  background: #f2f2f2;
}
```

### 表示結果

上記の様に実装すると、このように表示されるはずです :yum:
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/185788/d5739638-fb42-fbcf-3e76-29eebc04a4fa.png)
変数`say`に入れる文言を変更してみて、表示される内容が変わるか試してみてください！

## ② 関数コンポーネントで Hello World！

今度は`/src/index.js`を下記の様に書き換えてください。

```react:/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';

const say = 'Hello, World!';

// 関数コンポーネント
function Hello(props) {
  return <h2>Hello, {props.name}!</h2>;
}

ReactDOM.render(
  <div>
    <h1>{ say }</h1>
    <Hello name="hoge" />
  </div>,
  document.getElementById('root')
);
```

### ポイント

- <font color="Red">関数コンポーネント</font>とは文字通り、関数によって作られたコンポーネントです<br>
  render 内で呼び出す際には関数名を呼び出します<br>
- 関数コンポーネントは引数として<font color="Red">props</font>を受け取ります<br>
  render 内で呼び出しの際に記述している`name="hoge"`が<font color="Red">props.name</font>で使用できます<br>
- render 内で記述されるタグは<font color="Red">**頭文字が小文字の場合 DOM 要素・頭文字が大文字の場合コンポーネント**</font>として認識されます

### 表示結果

上記の様に実装を行うとこのように表示されるはずです

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/185788/dcd799d0-56d2-918c-c513-54befb286cb1.png)

Hello コンポーネントを呼び出している箇所で渡す名前を自分の名前に変更してみてください
挨拶してくれるはずです :smile:

## ③ クラスコンポーネントで Hello World！

今度は`/src/index.js`を下記の様に書き換えてください。

```react
import React from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';

const say = 'Hello, World!';

// クラスコンポーネント
class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Bob'
    }
  }

  setName = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h2>Hello, {this.state.name}!</h2>
        <label for='name'>input your name!</label>
        <input type='text' onChange={this.setName} />
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <h1>{ say }</h1>
    <Hello />
  </div>,
  document.getElementById('root')
);
```

### ポイント

- クラスコンポーネントは独自の<font color="Red">state(状態)</font>を持つことができます
- state を使用する場合には<font color="Red">**コンストラクタが必須**</font>になり、このコンストラクタ内で state の初期値を設定します<br>
  また、このコンストラクタでは必ず引数に props を受け取り、`super(props)`を行う必要があります<br>

```react
  constructor(props) {
    super(props);
    this.state = {
      name: 'Bob'
    }
  }
```

- state は<font color="Red">**直接変更をしてはいけません**</font><br>
  今回の場合は`<input type='text' onChange={this.setName} />`で`this(コンポーネント内の).setName`を<br>
  呼び出して、その関数内で`setState`を使用して state を変更しています

```react
  setName = (e) => {
    this.setState({
      name: e.target.value
    });
  }
```

- クラスコンポーネント内の`render()`で返却する DOM 要素を定義しています<br>
  ここでも DOM 要素を 1 つで返す必要があるので、`<div>`で囲っています
- コンポーネント内の state を DOM 要素内で取得する場合は`{this.state.name}`というように記述します

```react
  render() {
    return (
      <div>
        <h2>Hello, {this.state.name}!</h2>
        <label for='name'>input your name!</label>
        <input type='text' onChange={this.setName} />
      </div>
    );
  }
```

### 表示結果

上記の様に実装を行うとこのように表示されるはずです
![react-test.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/185788/aa29d2b1-cba7-93a1-cf26-5cbc990fce41.gif)
名前を入力して変更されるか試してみてください :smile:
