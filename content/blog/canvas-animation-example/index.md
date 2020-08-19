---
title: 素のJavaScript で Canvas アニメーションを実装する方法
date: "2019-06-28"
description: フレームワークやライブラリを使用せずに、簡単なCanvasアニメーションを実装する方法を紹介します。
---

# 完成品

<p class="codepen" data-height="400" data-theme-id="0" data-default-tab="result" data-user="da10410" data-slug-hash="LKOoJG" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="LKOoJG">
  <span>See the Pen <a href="https://codepen.io/da10410/pen/LKOoJG/">
  LKOoJG</a> by daichi (<a href="https://codepen.io/da10410">@da10410</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

よくヘッダーなどで目にするこのアニメーション。canvasとjavascriptでちゃちゃっと作ってみました！

## Step1

まず、canvasタグを設置します。この時点では何も出てきません。

```html:index.html
<div class="canvas-box">
  <p>CANVAS 入門</p>
  <canvas id="canvas01"></canvas>
</div>
```

## Step2

次に下記の様なjsを書くと、丸が20個ランダムな位置、ランダムなサイズで描画されます！

```javascript:index.js
$(function(){
  
  // キャンバスサイズ   
  const WIDTH = 500;
  const HEIGHT = 200;

  // canvas要素取得
  const canvas01 = $('#canvas01').get(0);
  canvas01.width = WIDTH;
  canvas01.height = HEIGHT;

  // コンテキスト取得
  const ctx = canvas01.getContext('2d');
  
  // 丸の数   
  const circleNum = 20;
  
  // 丸の最大最小サイズ
  const circleMinSize = 2;
  const circleMaxSize = 5 - circleMinSize;

  // 円の情報
  const circles = [];

  // 円の追加
  for(var i=0; i <= circleNum; i++){
    let xpath = Math.floor( Math.random() * WIDTH+1 ) ;
    let ypath = Math.floor( Math.random() * HEIGHT+1 ) ;
    const size = Math.floor( Math.random() * circleMaxSize+1 ) + circleMinSize ;
    const xspeed = Math.round( (Math.random()*20)-10, 10)/10;
    const yspeed = Math.round( (Math.random()*20)-10, 10)/10;
    circles.push({x:xpath, y:ypath, r: size, xs:xspeed, ys:yspeed}); 
  }

  // 各円を描画
  for(const c of circles) {
    ctx.beginPath();
    ctx.fillStyle = 'rgb(0, 0, 0)'; // 黒色
    ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
    ctx.fill();
  }
})
```

上記の内容を解説していきます。

まず、canvas要素をjs(今回はjQuery)で取得し、サイズを設定します。

```javascript
  // キャンバスサイズ   
  const WIDTH = 500;
  const HEIGHT = 200;

  // canvas要素取得
  const canvas01 = $('#canvas01').get(0);
  canvas01.width = WIDTH;
  canvas01.height = HEIGHT;
```

コンテキストを取得します。

```javascript
  const ctx = canvas01.getContext('2d');
```

円の各情報を作成します。
各変数は下記の様な意味になっています。

変数名|内容
---|---
xpath|topからの位置
ypath|leftからの位置
size|円のサイズ
xspeed|1描画毎に縦に移動する長さ
xspeed|1描画毎に横に移動する長さ


```javascript
  // 円の情報
  const circles = [];

  // 円の追加
  for(var i=0; i <= circleNum; i++){
    let xpath = Math.floor( Math.random() * WIDTH+1 ) ;
    let ypath = Math.floor( Math.random() * HEIGHT+1 ) ;
    const size = Math.floor( Math.random() * circleMaxSize+1 ) + circleMinSize ;
    const xspeed = Math.round( (Math.random()*20)-10, 10)/10;
    const yspeed = Math.round( (Math.random()*20)-10, 10)/10;
    circles.push({x:xpath, y:ypath, r: size, xs:xspeed, ys:yspeed}); 
  }
```

最後に円の情報が入っている配列分だけループで回し描画を行います。

```javascript
  // 各円を描画
  for(const c of circles) {
    ctx.beginPath();
    ctx.fillStyle = 'rgb(0, 0, 0)'; // 黒色
    ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
    ctx.fill();
  }
```

## Step3

これだけでは描画静止画になってしまいますので、ループで描画を回し動きを付けます。

```javascript:index.js
$(function(){
  
  // キャンバスサイズ   
  const WIDTH = 500;
  const HEIGHT = 200;
  
  // 丸の数   
  const circleNum = 20;
  
  // 丸の最大最小サイズ
  const circleMinSize = 2;
  const circleMaxSize = 5 - circleMinSize;

  // canvas要素取得
  const canvas01 = $('#canvas01').get(0);
  canvas01.width = WIDTH;
  canvas01.height = HEIGHT;

  // コンテキスト取得
  const ctx = canvas01.getContext('2d');

  // 円の情報
  const circles = [];

  // 円の追加
  for(var i=0; i <= circleNum; i++){
    let xpath = Math.floor( Math.random() * WIDTH+1 ) ;
    let ypath = Math.floor( Math.random() * HEIGHT+1 ) ;
    const size = Math.floor( Math.random() * circleMaxSize+1 ) + circleMinSize ;
    const xspeed = Math.round( (Math.random()*20)-10, 10)/10;
    const yspeed = Math.round( (Math.random()*20)-10, 10)/10;
    circles.push({x:xpath, y:ypath, r: size, xs:xspeed, ys:yspeed}); 
  }

  // 各円を描画
  for(const c of circles) {
    ctx.beginPath();
    ctx.fillStyle = 'rgb(0, 0, 0)'; // 黒色
    ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  function loop(ts){
    // 画面をクリア     
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    // 塗りつぶし     
    ctx.fillStyle = '#48dbfb';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
    let num = 0;
    
    // 各円を描画する。
    for(const c of circles) {
      
      let afters = circleNum - num;
      
      if(c.y <= 0 || c.y >= HEIGHT){
        c.ys = c.ys * -1;
      }
      if(c.x <= 0 || c.x >= WIDTH){
        c.xs = c.xs * -1;
      }
      
      // 線引く       
      for(let n=0; n <=afters; n++){
        if( Math.sqrt(((c.x - circles[circleNum-(afters-n)].x) ** 2) + ((c.y - circles[circleNum-(afters-n)].y) ** 2)) <= 70 ){
          ctx.beginPath();
          ctx.strokeStyle = '#fff';
          ctx.moveTo(c.x, c.y);
          ctx.lineTo(circles[circleNum-(afters-n)].x, circles[circleNum-(afters-n)].y);
          ctx.ineWidth = 0.1;
          ctx.closePath();
          ctx.stroke(); 
        }
      }
      
      c.x = c.x + c.xs;
      c.y = c.y + c.ys;
      
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    num++;
    window.requestAnimationFrame((ts) => loop(ts));
  }
  

  window.requestAnimationFrame((ts) => loop(ts));
})
```

まず、ループする関数を作成します。

```javascript:index.js
  function loop(ts){
    // 画面をクリア     
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    // 塗りつぶし     
    ctx.fillStyle = '#48dbfb';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
    let num = 0;
    
    // 各円を描画する。
    for(const c of circles) {
      
      let afters = circleNum - num;
      
      if(c.y <= 0 || c.y >= HEIGHT){
        c.ys = c.ys * -1;
      }
      if(c.x <= 0 || c.x >= WIDTH){
        c.xs = c.xs * -1;
      }
      
      // 線引く       
      for(let n=0; n <=afters; n++){
        if( Math.sqrt(((c.x - circles[circleNum-(afters-n)].x) ** 2) + ((c.y - circles[circleNum-(afters-n)].y) ** 2)) <= 70 ){
          ctx.beginPath();
          ctx.strokeStyle = '#fff';
          ctx.moveTo(c.x, c.y);
          ctx.lineTo(circles[circleNum-(afters-n)].x, circles[circleNum-(afters-n)].y);
          ctx.ineWidth = 0.1;
          ctx.closePath();
          ctx.stroke(); 
        }
      }
      
      c.x = c.x + c.xs;
      c.y = c.y + c.ys;
      
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
      ctx.fill();
    }
    num++;
    window.requestAnimationFrame((ts) => loop(ts));
  }
```

canvasでのアニメーションはパラパラ漫画の様に、一度書いて、消して、書いて～…を繰り返しています。
下記でループ毎に画面を一度クリアし、水色で全面塗りつぶしを行っています。

```javascript
    // 画面をクリア     
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    // 塗りつぶし     
    ctx.fillStyle = '#48dbfb';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
```

下記ではそれぞれの丸の位置が、canvasの枠を飛び出しそうになった時に
方向転換をするための内容となっています。
ここで丸のサイズを取得し、その半径を現在位置を考慮して計算を行えば
丸が枠から少し見切れることも無くなります。

```javascript
      if(c.y <= 0 || c.y >= HEIGHT){
        c.ys = c.ys * -1;
      }
      if(c.x <= 0 || c.x >= WIDTH){
        c.xs = c.xs * -1;
      }
```

下記では丸と丸の間を結ぶ線を描画しています。
三平方の定理を使用して、距離が70pxより近くなった場合に線を引く実装になっています。

```javascript
// 線引く       
      for(let n=0; n <=afters; n++){
        if( Math.sqrt(((c.x - circles[circleNum-(afters-n)].x) ** 2) + ((c.y - circles[circleNum-(afters-n)].y) ** 2)) <= 70 ){
          ctx.beginPath();
          ctx.strokeStyle = '#fff';
          ctx.moveTo(c.x, c.y);
          ctx.lineTo(circles[circleNum-(afters-n)].x, circles[circleNum-(afters-n)].y);
          ctx.ineWidth = 0.1;
          ctx.closePath();
          ctx.stroke(); 
        }
      }
````

最後に下記で丸の現在位置を更新する処理を行い、丸を描画しています。

```javascript
      c.x = c.x + c.xs;
      c.y = c.y + c.ys;

      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
      ctx.fill();
```


下記でループする関数を呼び出しています。

```javascript:index.js
window.requestAnimationFrame((ts) => loop(ts));
```

## 終わりに
アニメーションは難しく感じる事が多いですが、Canvasのアニメーションは触ってみると案外単純です。
義務教育レベルの数学とjavascriptの知識さえあれば、簡単なアニメーションをすぐに作成する事ができます。
是非皆さんも試してみてください！

※計算式などいついて後々追記していけたらと考えています :thinking: 
