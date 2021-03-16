import React, { useEffect } from "react"

const Mainv = () => {
  useEffect(() => {
    // Canvas
    const target = document.getElementById('mainv')  // canvasの親要素取得
    const canvas = document.getElementById('mainCanvas')    // canvas取得
  
    // 親のサイズ取得
    let Cwidth = target.clientWidth
    let Cheight = target.clientHeight
  
    // Canvas サイズ設定
    canvas.width = Cwidth
    canvas.height = Cheight               
  
    // コンテキスト取得
    const ctx = canvas.getContext('2d')
  
    // Canvasの中央取得
    let CenterW = Cwidth/2
    let CenterH = Cheight/2
  
    // 半径
    const r = 100
  
    // アニメーションID
    let AnimateID
  
    active: AnimateID = requestAnimationFrame(draw)  
  
    // 描画
    function draw() {  
      // 描画リセット
      ctx.clearRect(0, 0, Cwidth, Cheight)
      
      // ドット
      Dots()
      
      // 顔の輪郭描画  
      faceLine()
      
      // 顔のパーツ描画
      faceParts()
      
      AnimateID = requestAnimationFrame(draw)  
    }
  
    // ドット
    let dots = []
    for (let i=0; i<=9; i++) {  
      dots.push({
        x: CenterW + getRandom(r, -r),
        y: Cheight - getRandom(r, 0),
        size: getRandom(15, 5),
        xSpeed: getRandom(5, -5),
        ySpeed: getRandom(5, 1),
        flag: false,
        counter: 0
      })
    }
    function Dots() {  
      dots.forEach((value, index) => {
        
        for (let i=index; i < dots.length; i++) {
          let Xdiff = value['x'] - dots[i]['x']
          let Ydiff = value['y'] - dots[i]['y']
          if ( Math.floor(Math.sqrt(((Xdiff ** 2) + (Ydiff ** 2)))) <= 100 ) {
            ctx.lineWidth = 0.5
            ctx.strokeStyle = 'rgba(42, 54, 59, 1)'
            ctx.shadowBlur = 15
            ctx.shadowColor = 'rgba(42, 54, 59, 1)'
            ctx.beginPath()
            ctx.moveTo(value['x'], value['y'])
            ctx.lineTo(dots[i]['x'], dots[i]['y'])
            ctx.stroke()
          }
        }
          
        if (getRandom(1000, 0) === 1) {
          value['flag'] = true
        }
        
        if (value['flag'] === true) {
          ctx.fillStyle = 'rgba(255,162,183,1)'
          ctx.shadowColor = 'rgba(255,162,183,1)'
          
          ctx.beginPath()
          ctx.moveTo(value['x'] + getRandom(30, 20), value['y'] + getRandom(30, -30))
          ctx.lineTo(value['x'] - getRandom(30, 20), value['y'] + getRandom(30, -30))
          ctx.lineTo(value['x'] + getRandom(30, -30), value['y'] - getRandom(30, 20))
          ctx.fill()
          
          
          value['counter']++
          
          if (value['counter'] >= 30) {
            value['flag'] = false
            value['counter'] = 0
          }
        } else {
          ctx.fillStyle = 'rgba(42, 54, 59, 1)'
          ctx.shadowBlur = 15
          ctx.shadowColor = 'rgba(42, 54, 59, 1)'
          ctx.beginPath()
          ctx.arc(value['x'] + getRandom(2, -2), value['y'] + getRandom(2, -2), value['size'], 0, Math.PI * 2, true)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(value['x'] + getRandom(2, -2), value['y'] + getRandom(2, -2), value['size'], 0, Math.PI * 2, true)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(value['x'] + getRandom(2, -2), value['y'] + getRandom(2, -2), value['size'], 0, Math.PI * 2, true)
          ctx.fill()
        }
        
        if (value['x'] >= (Cwidth + 20) || value['x'] <= -20 || value['y'] <= -20) {
          value['x'] = CenterW + getRandom(r, -r)
          value['y'] = Cheight - getRandom(r, 0)
          value['xSpeed'] = getRandom(5, -5)
          value['ySpeed'] = getRandom(5, 1)
          value['size'] = getRandom(15, 5)
        }
        
        value['x'] += value['xSpeed']
        value['y'] -= value['ySpeed']
      })
    }
  
    // 顔の輪郭描画用関数
    function faceLine() {
      ctx.fillStyle = 'rgba(42, 54, 59, 1)'
      ctx.shadowBlur = 20
      ctx.shadowColor = 'rgba(42, 54, 59, 0.8)'
      
      // 中心の円描画
      ctx.beginPath()
      ctx.arc(CenterW, Cheight, r, 0, Math.PI, true)
      ctx.fill()
      
      // 輪郭の円描画   
      for (let i=0; i <= 500; i++) {    
        let x = getRandom(r, -r)
        let y = (Math.floor(Math.sqrt(((x * x) - (r * r)) * -1))) * -1
        let size = Math.floor(Math.random() * 20) + 10
        
        // 乱れさす
        x += getRandom(10, -10)
        y += getRandom(10, 0)
        
        // 輪郭    
        ctx.beginPath()
        ctx.arc(CenterW + x, Cheight + y, size, 0, Math.PI * 2, true)
        ctx.fill()
      }
    }
  
    // 目と口の描画用関数
    function faceParts() {
      ctx.fillStyle = 'rgba(255, 255, 255, 1)'
      ctx.shadowColor = 'rgba(255, 255, 255, 1)'
      ctx.shadowBlur = 10
      
      for (let j=0; j <= 5; j ++) {
        let x = getRandom(5, 0)
        let y = getRandom(5, 0)
        let size = getRandom(15, 10)
        
        // 右目
        ctx.beginPath()
        ctx.arc(CenterW + (r/2 - x), Cheight - (r - 20 + y), size, 0, Math.PI * 2, true)
        ctx.fill()
        // 左目    
        ctx.beginPath()
        ctx.arc(CenterW - (r/2 - x), Cheight - (r - 20 + y), size, 0, Math.PI * 2, true)
        ctx.fill()
      }
      
      // 口
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.lineWidth = 2
      ctx.lineJoin = 'bevel'
      for (let k=-20; k < 20; k++) {
        let y = getRandom(10, 0)
        
        if (k === -20) {
          ctx.moveTo(CenterW + k, Cheight - (r - 30 + y))
        } else {
          ctx.lineTo(CenterW + k, Cheight - (r - 30 + y))
        }
      }
      ctx.stroke()
    }
  
    // ランダム生成用関数
    function getRandom(max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  })

  return (
    <section id="mainv">
      <canvas id="mainCanvas">noob front end engineer blog</canvas>
      <h1>Noob Front End Engineer Blog</h1>
    </section>
  )
}

export default Mainv
