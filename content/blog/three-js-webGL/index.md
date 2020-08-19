---
title: three.js で簡単な3Dアニメーションを試してみる
date: "2019-07-31"
description: JSアニメーションフレームワークのthree.jsを使用して、簡単なアニメーション実装する方法を紹介します。
---

# 手順

（1~3は順番関係無し）
1.Sceneの作成
2.Cameraの作成
3.Rendererの作成
4.Objectの作成
5.Materialの作成
6.MeshでObjectにMaterialを適用
7.6で作成したものをSceneに追加
8.カメラの座標指定
9.レンダリングの実行

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="result" data-user="da10410" data-slug-hash="ZgzXqY" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="webGL 01">
  <span>See the Pen <a href="https://codepen.io/da10410/pen/ZgzXqY/">
  webGL 01</a> by daichi (<a href="https://codepen.io/da10410">@da10410</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Scene
scene（シーン）を作成します。

```javascript
let scene = new THREE.Scene();
```

## Camera
camera（カメラ）を作成します。
カメラには複数種類があります。今回は遠近感がある「PerspectiveCamera」を使用します。

### PerspectiveCamera
遠近感があるカメラ

```javascript
// new THREE.PerspectiveCamera(視野角(fov), アスペクト比, near, far)
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
```

視野角が大きい = 遠近感が高い
視野角が小さい = 遠近感が低い

### OrthographicCamera

遠近法がないカメラ

```javascript
// new THREE.OrthographicCamera(left, right, top, bottom, near, far)
let camera = new THREE.OrthographicCamera(-480, +480, 270, -270, 1, 1000);
```


## Renderer
renderer（レンダラー）を作成します。

```javascript
let renderer = new THREE.WebGLRenderer();
```

## Geometrys
Geometry（ジオメトリ）を作成します。今回は立方体の「BoxGeometry」を使用します。

```javascript
let geometry = new THREE.BoxGeometry( 1, 1, 1 );
```

| ジオメトリ | 内容 | 指定方法 |
|-----------------|------------------|------------------|
| Geometry | 空のgeometry | new THREE.Geometry() |
| BufferGeometry | 空のgeometry(重い処理用) | new THREE.BufferGeometry() |
| BoxGeometry | 立方体 | new THREE.BoxGeometry( 1, 1, 1 ) |

## Materials
Materials（マテリアル）を作成します。色の指定は16進数。

```javascript
let material = new THREE.MeshBasicMaterial( { color: "fff" } );
```

## Mesh
ObjectにMaterialを適用します。

```javascript
let cube = new THREE.Mesh( geometry, material );
```

## Sceneに作成したObjectを追加
```javascript
scene.add( cube );
```

## アニメーション用の関数作成
```javascript
    var animate = function () {
        requestAnimationFrame( animate );
        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
        
        camera.position.z += 0.2;
        renderer.render( scene, camera );
    };

    animate();
```

`requestAnimationFrame`でループを行っています。
`cube.rotation~`で作成したobjectを描画毎に回転させています。
`camera.position~` でcameraの位置を変更し、objectから遠ざかるようにしています。
`renderer.render( scene, camera );`でレンダリングを行い描画完了です。

上記内容の関数を初回呼び出しを行えば、アニメーションが実行されます。

## まとめ
凄く簡単に3Dアニメーションが作成できて驚きました！
ただ、Webサイトに生かすアイデアがまだ全然浮かばないので色々試してみたいと思います
