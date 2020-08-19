---
title: 【Input type="file"】のデザインをCSSとjQueryを使用して変更する
date: "2019-06-17"
description: ファイル選択を行う『Input type="file"』のデザインをCSSとjQueryを使用して変更する方法を紹介します。
---

## 完成品

<p class="codepen" data-height="400" data-theme-id="0" data-default-tab="result" data-user="da10410" data-slug-hash="bPpbMQ" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="input file design01">
  <span>See the Pen <a href="https://codepen.io/da10410/pen/bPpbMQ/">
  input file design01</a> by daichi (<a href="https://codepen.io/da10410">@da10410</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## HTML部分

htmlで重要になるのは下記の部分です。全体を見たい方はCodoPenの方を確認してください。

```html:form.html
<!--  ①非表示  -->
<input type="file" class="input-file" id='file01' style="display:none;">

<!--  ②inputタグに紐づくlabel  -->
<label for="file01" class="fileup-btn">
  ファイルを選択
</label>

<!--  ③選択したファイルパスを記述する  -->
<labe class="js-file01">
  選択されていません
</labe>
```

1. まず、`<input type="file">`本体を非表示にします。
2. ファイル選択のエクスプローラーを起動するためのラベルを作成します。ここにスタイルを当てていきます。
3. 選択したファイルパスを表示するためのラベルです。ここに関しては必ず`<label>`にする必要はありません。

## CSS部分

css部分は、好みの問題になるので説明は大方省きます。
下記は『 選択したファイルパスを表示するためのラベル 』のスタイル部分になります。

```css:index.css
    .js-file01 {
      display: block;
      width: 55%;
      box-sizing: border-box;
      padding: 10px 0 0 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: gray;
    }
```

この下記部分で、ファイルパスが長すぎて要素に入りきらなかった場合などに
『 ... 』と表示してくれるようになります。

```
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

>こんな感じにしてくれます:point_down::open_mouth:
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/185788/55909aad-b6c0-aaf1-cbda-cff122c79321.png)
今回初めて知りました:hushed:
ブラウザの対応状況はこんな感じ:point_down:
https://caniuse.com/#search=text-overflow%3A%20ellipsis%3B

## Javascript部分

```javascript:index.js
$('.input-file').on('change', function(){
  const target = $(this).attr('id');
  $('.js-'+target).text($(this).val());
});
```

上記が選択したファイルパスを表示するための記述になります。

`class="input-file"`は`<input type="file">`の要素全てに付与し、
ファイルパスを表示する要素には`class="js-(【対応するinputタグのid】)"`のとすれば、
上記の関数1つで全てのファイルパス表示に対応できる作りになっています。
