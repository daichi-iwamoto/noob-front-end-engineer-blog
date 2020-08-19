---
title: Axios での Backlog API 使用方法 
date: "2019-10-24"
description: Nuxt製アプリケーション内のAxiosでBacklog APIを使用する例を紹介します。
---

# 概要
Nuxt×axiosでBacklogAPIを使用して課題を追加したりする際、結構引っかかった個所が多かったので
リファレンスをかみ砕いたものをメモしておきます。

## BacklogAPIを使用する上で共通で必要な情報
#### space
ご使用のBacklogのURL `https://[ココの部分]/dashboard`になります。
#### apikey
「個人設定」→「API」で新しいAPIキーを作成することができます。

## 課題の追加
まずは[公式リファレンス](https://developer.nulab.com/ja/docs/backlog/api/2/add-issue/#%E8%AA%B2%E9%A1%8C%E3%81%AE%E8%BF%BD%E5%8A%A0)を読んでみましょう。
公式リファレンスにある通り、必須項目は下記の4つ。

| パラメータ名 | 内容 |
|---|---|
| projectId | 課題を追加するプロジェクト |
| summary | 追加する課題名 |
| issueTypeId | 課題の種別 |
| priorityId | 優先度 |

### 実際にPOSTされるURL
```
https://[space名]/api/v2/issues?apiKey=APIキー&projectId=課題を追加するプロジェクト&summary=追加する課題名&issueTypeId=課題の種別&priorityId=課題の重要度
```

### Code

```vue
<script>
import axios from 'axios'

export default {
  methods: {
    addTask () {
      // 送信するパラメータ類
      const sendData = new URLSearchParams()
      sendData.append('apiKey', 送信者のAPIキー)
      sendData.append('projectId', 課題を追加するプロジェクト)
      sendData.append('summary', 課題名)
      sendData.append('issueTypeId', 課題の種別)
      sendData.append('priorityId', 優先度)
      // ここまで必須項目

      sendData.append('description', 課題詳細)
      sendData.append('assigneeId', 課題担当者)
      sendData.append('actualHours', 予定工数)
      sendData.append('startDate', 開始日)
      sendData.append('dueDate', 完了日)
      
      axios.post('https://[space名]/api/v2/issues?' + sendData)
        .then((res) => {
          console.log('【Add Task】', res)
        })
        .catch((error) => {
          console.log('【Add Task】', error)
        })
    }
  }
}
</script>
```

`axios.post`でパラメータを使用する場合、本来ならば下記のような記載方法で
行けるはずなのですがなぜか上手くいかず、上記のように設定したところ送信できました。


```javascript
axios.post('https://[space名]/api/v2/issues', sendData)
```

### <font color="Crimson">注意点 :warning: </font>
* 使用しているAPIキーの発行アカウントが管理者かどうかでできる制限が結構変わります。
* <b><font color="Crimson">カスタム属性</font></b>を設置していて、その項目が必須になっている場合があるので注意しましょう。
<br><font color="DarkGray">僕はこれになかなか気付かず何時間も無駄にしました…:cry: </font>
* 必須項目である【課題の種別】は同じ名前でもプロジェクトごとにキーが違います。

## 種別一覧の取得
先ほどの課題の追加の際、必須になってくる【種別一覧】を取得してみましょう。
[公式リファレンス](https://developer.nulab.com/ja/docs/backlog/api/2/get-issue-type-list/#%E7%A8%AE%E5%88%A5%E4%B8%80%E8%A6%A7%E3%81%AE%E5%8F%96%E5%BE%97)はこんな感じ。

| パラメータ名 | 内容 |
|---|---|
| projectIdOrKey | プロジェクトのID または プロジェクトキー |

### 実際にGETを行うURL
```
https://[space名]/api/v2/projects/[プロジェクトのID または プロジェクトキー]/issueTypes?apiKey=APIキー
```

リファレンスにあるURLの`/api/v2/projects/:projectIdOrKey/issueTypes`は
`:projectIdOrKey`の部分に【課題種別一覧を取得したいプロジェクトのIDまたはキー】を
入力したURLという意味になります。僕も今回初めて知ったのですが、`:〇〇`は
そのまま記載するという意味ではありません。

### Code

```vue
<script>
import axios from 'axios'

export default {
  methods: {
    getTaskTypes () {
      axios.get('https://[space名]/api/v2/projects/[プロジェクトID or Key]/issueTypes?apiKey=送信者のAPIキー')
        .then((res) => {
          console.log('【issuetype】', res)
        })
        .catch((error) => {
          console.log('【issuetype】', error)
        })
    }
  }
}
</script>
```

上記で一覧が取得でき、consoleにデータが出力されるはずです。
今回はapikeyをそのままurlに打ち込むタイプでGETを行いましたが、問題なく動作しました。
