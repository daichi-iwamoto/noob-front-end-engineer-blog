---
title: Nuxt.js製サイトをFirebase HostingにDeployする
date: "2018-10-14"
description: JSフレームワークのNuxtで作成したWebアプリ・サイトをFirebase HostingにDeployする手法を紹介します。
tag:
    - Nuxt.js
    - Firebase
---

## 概要

JS フレームワークの Nuxt で作成した Web アプリ・サイトを Firebase Hosting に Deploy する手法を紹介します。

## Nuxt.js 導入

[公式リファレンス](https://ja.nuxtjs.org/guide/installation/)を参考に行いましょう。

#### プロジェクトの作成

```bash
npx create-nuxt-app <project-name>
```

色々聞かれるのでお好みの設定で。
それぞれ何を聞かれているかは[公式](https://ja.nuxtjs.org/guide/installation/)の方に記載されています。

#### インストール & 起動

```bash
cd <project-name>
npm install
npm run dev
```

問題なくローカルで確認できれば OK

## Firebase の導入

### 事前準備

[Firebase](https://firebase.google.com/?hl=ja)のサイトにてログインし、
『 プロジェクトを追加 』を選び任意の名前でプロジェクトを作成しておく。

#### パッケージのインストール

```
npm install -g firebase-tools
```

#### Firebase にログイン

```
firebase login
```

Web ページを開いて良いか聞かれるので`y`を選択し、web 上でログインを行います。

#### Firebase の初期設定

```
firebase init
```

① 接続するプロジェクトを聞かれるので、既存のプロジェクトの先ほど作成したプロジェクトを指定しましょう。
② 公開ルートディレクトリを聞かれるので、Nuxt の仕様に合わせ`dist`と答えましょう。

これらも詳細は[公式](https://firebase.google.com/docs/hosting/quickstart?hl=ja)で確認してください。

## Deploy を行う

#### まず deploy 用に dist ファイルを作成する

```
npm run build
npm run generate
```

##### deploy する！

```
firebase deploy
```

deploy が完了すると公開 URL が表示されるので、そこに飛ぶと公開された実物が見れるはずです！
