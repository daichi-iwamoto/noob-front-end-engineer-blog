---
title: Pythonを使用してWordファイルからHTMLファイルをいい感じに生成する
date: "2021-01-09"
description: PythonのモジュールmammothとBeautifulSoupを使用して、いい感じのHTMLを作成する方法を紹介します。
tag:
  - Docker
  - Python
---

## 概要

静的なサイトで記事ページを作成する際、ライターの方から  
頂いた Word ファイル（.docx）を元に実装する事はありませんか？

コピペを何度も何度も行う単純作業はきついですよね。

という事で、今回は Python を使用して Word ファイルを元に  
いい感じの HTML を生成する方法を紹介していきます 🙂

完成品は[こちら](https://github.com/daichi-iwamoto/node-img-resize/)です。  
使用方法は`README.md`に記載してありますので、お急ぎの方は上記を使用してみてください。  
※ Docker 使用を想定して作成しています

<p class="kao sleep">
Github強化中なので、☆, フォローいただけると喜びます
</p>

## 環境構築

`Python3`がインストール済み、もしくは`Docker`等で  
`Python3`の実行環境ができているものとします。

まずは任意の場所にデモ用のディレクトリを作成してください。

```bash:title=bash
# ディレクトリ作成
mkdir demo

# ディレクトリ移動
cd demo
```

今回のデモは下記のようなディレクトリ構造で行っていきます。

```bash
demo
  └ dist
     └ index.html  # <-- 作成されたHTML
  └ src
     └ input.docx  # <-- 元となるWordファイル
  |
  └ converter.py   # <-- HTML生成処理
```

コマンドでもエクスプローラーでも構わないので、  
`dist/`ディレクトリと`src/`ディレクトリを作成しておいてください。

## HTML 生成処理の作成

今回使用するモジュール達は下記の通り

| module  | description                                                       |
| ------- | ----------------------------------------------------------------- |
| os      | ファイル・ディレクトリ操作                                        |
| re      | 正規表現が使える                                                  |
| glob    | ファイル名取得                                                    |
| mammoth | docx ファイルから html ファイルに変換してくれる                   |
| bs4     | HTML 操作全般をおこなってくれる（今回は html の整形用として使用） |

`os`, `re`, `glob`はデフォルトでインストールされている為  
`mammoth`, `bs4(beautifulsoup4)`のみ明示的にインストールする必要があります。

今回は`converter.py`というファイルを作成して、そこに実装を行っていきます。

処理の内容は下記の通りです。

```python:title=converter.py
import mammoth # docx → html
import os # create file
import glob # read file name

from bs4 import BeautifulSoup # html linter 
from bs4 import Tag

import re # 正規表現

files = glob.glob('./src/*.docx')

for file in files:
  with open(file, 'rb') as docx_file:
    result = mammoth.convert_to_html(docx_file)
    source = result.value

    # --------------------- class setting start ---------------------

    # パラグラフ
    source = source.replace('<p>', '<p class="">')
  
    # 見出し 
    source = source.replace('<h2>', '<h2 class="">')
    source = source.replace('<h3>', '<h3 class="">')

    # 画像
    source = re.sub('<img src=\"(.*?)\"', '<img src=""', source)

    # リスト
    source =source.replace('<ul>', '<ul class="">')
    source =source.replace('<ol>', '<ol class="">')

    # --------------------- class setting end ---------------------

    html = BeautifulSoup(source, 'lxml')
    html = html.prettify()
    messages = result.messages

    outputfile = file.replace('.docx', '.html')
    outputfile = outputfile.replace('/src/', '/dist/')

  with open(outputfile, mode='w') as f:
    f.write(html)

  print("finished convert (´-ω-`)")
```

それでは、実際にどのように処理を行っているか解説していきます！

### 元となるWordファイルの取得・ループ処理

まずは元となるWordファイルのファイルパスを全て取得し  
ファイルの件数分だけループを回しています。

```python:title=converter.py
# --- 略 ---
files = glob.glob('./src/*.docx')

for file in files:
# --- 略 ---
```

`glob`モジュールを使用する事でファイルパスを取得することができます。  
今回の場合は`./src/`ディレクトリ内にある`.docx`形式のファイル全てのファイルパスを  
取得し`files`変数に格納しています。

### Wordファイルを元にHTMLを作成

ここからは実際にWordファイルを元にHTMLを作成する機能を作成しています。  

```python:title=converter.py
# --- 略 ---
  with open(file, 'rb') as docx_file:
    result = mammoth.convert_to_html(docx_file)
    source = result.value
# --- 略 ---
```

`file`には先ほど取得してきたWordファイルのパスが格納されているので  
そちらのファイルを開き、`docx_file`変数にWordファイルの情報を格納します。

次に`docx_file`に取得したWordファイルを`mammoth`モジュールを使用してHTMLに変換します。
`mammoth.convert_to_html()`に`docx_file`を渡すことでHTMLの情報を取得できます。  
返ってきたHTML情報を`result`に格納し、`value`を確認すると、
実際にHTML入っていることが確認できると思います。

### タグを独自に加工

ここから各HTMLタグを独自に加工していきます。

```python:title=converter.py
# --- 略 ---
    # --------------------- class setting start ---------------------

    # パラグラフ
    source = source.replace('<p>', '<p class="">')
  
    # 見出し 
    source = source.replace('<h2>', '<h2 class="">')
    source = source.replace('<h3>', '<h3 class="">')

    # 画像
    source = re.sub('<img src=\"(.*?)\"', '<img src=""', source)

    # リスト
    source =source.replace('<ul>', '<ul class="">')
    source =source.replace('<ol>', '<ol class="">')

    # --------------------- class setting end ---------------------
# --- 略 ---
```

`replace`を使用して開始タグを編集します。  
ここは実際に入れたいclass名、id名等を自由に記入してください。

### HTMLの整形・出力

最後にHTMLの整形を行い、ディレクトリ・ファイル名を指定して出力する処理を解説していきます。

```python:title=converter.py
# --- 略 ---
    html = BeautifulSoup(source, 'lxml')
    html = html.prettify()
    messages = result.messages

    outputfile = file.replace('.docx', '.html')
    outputfile = outputfile.replace('/src/', '/dist/')

  with open(outputfile, mode='w') as f:
    f.write(html)

  print("finished convert (´-ω-`)")
# --- 略 ---
```

Wordから変換したHTMLデータが入っている`source`は  
改行やインデント等が入っていないHTMLファイルになってしまっている為、  
`BeautifleSource`モジュールを使用して整形を行っています。

`html = BeautifulSoup(source, 'lxml')`を行う事で、  
`source`に入っていたHTML情報の文字列を`HTMLデータ`として  
`html`変数に格納することができます。

<p class="kao sleep">
このような、「どういったデータ構造になっているか明示的に示す」事を<br>
「パースする」と言う事を初めて知りました
</p>

`html`変数には`BeautifulSoup`で使用できる`HTMLデータ`になったので、
`prettify`という整形用の関数を使用して整形を行えます。

最後にファイルパスを出力用のパスに書き換えて、  
HTMLファイルを作成したら完成です🙆‍♂️

## おわり

今回初めてまともにPythonを触ったのですが、記述方法がとても簡単で感動しました…  
知識が薄いので、もっといい書き方、説明があれば是非ご指摘ください！

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Article",
  "name": "Pythonを使用してWordファイルからHTMLファイルをいい感じに生成する",
  "headline": "Pythonを使用してWordファイルからHTMLファイルをいい感じに生成する",
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
  "description": "PythonのモジュールmammothとBeautifulSoupを使用して、いい感じのHTMLを作成する方法を紹介します。",
  "url": "https://noob-front-end-engineer-blog.com/docker-python-docx/",
  "mainEntityOfPage": "https://noob-front-end-engineer-blog.com/docker-python-docx/",
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
  "datePublished": "2021-01-09",
  "dateModified": "2021-01-09"
}
</script>
