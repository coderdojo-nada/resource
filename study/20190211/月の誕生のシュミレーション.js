let earthMass = 1000　// 地球の重さ
let moonMass = 0.001// 月の重さ

// グローバル変数定義（関数をまたがって使われる変数）
let width, height, rocks = [], counter=0

// ランダムと切り捨て
function random_floor(limit) {
	 return floor(random(limit))
}

function Rock() {
	this.x = random(windowWidth) // 岩の開始位置(横位置)
	this.y = random(windowHeight) // 岩の開始位置(縦位置)
	// -1 から 1の間で乱数
	this.vx = random()*2-1 // 岩の速度(横方向) 
	this.vy = random()*2-1  // 岩の速度(縦方向)
}

// 最初に１回自動的に呼ばれる
function setup() {
	createCanvas(windowWidth, windowHeight)　// 背景をウィンドウと同じサイズにする
	background(100) // 背景をグレー色で、ぬりつぶす
	frameRate(30) // 速さは1秒間に30回、書きなおす（draw()関数を呼び出す）
	ellipseMode(RADIUS) // 円を描くときに座標は中心を指定して、大きさは半径の大きさを指定する
	noStroke()// 枠は描かない
}

// １秒で30回呼び出される
function draw() {
	 // ３回画面を描くたびに1回だけ岩をひとつ増やす
	 if (++counter % 3 == 0) {
		 rocks.push(new Rock())
	 }
   // リストの岩全部の座標を動かす
	 rocks.forEach (function(r) {
		 // 岩の中心位置 - 地球の中心位置 = 岩と地球のxy座標の距離
		 // (x,y軸方向のベクトルの大きさ)
		 r.dx = r.x - windowWidth / 2 
		 r.dy = r.y - windowHeight / 2 
		 // ピタゴラスの定理で岩と地球の距離の2乗を求める
		 let r2 = r.dx * r.dx + r.dy * r.dy
		 // 万有引力の方程式 引力F = 重力定数 * 質量A * 質量B / 2つの物体の距離 / 2つの物体の距離
		 // (物体同士が受ける力は、互いの質量に比例し、距離の2乗に反比例する)
		 let f = -0.01 * earthMass * moonMass / r2
		 // 2つの物体の距離を求める
		 let r1 = sqrt(r2)
		 // xの方向の引力 = 引力 * (x方向の距離 / 2つの物体の距離) 
		 let fx = f * r.dx / r1 // f * cos
		 // yの方向の引力 = 引力 * (y方向の距離 / 2つの物体の距離) 
		 let fy = f * r.dy / r1 // f * sin
		 
		 // 運動方程式 f(力の大きさ) = m(質量) * a(加速度)
		 //「物体が受ける力は、物体の重さと加速度をかけたものになる」
		 // a(加速度) = 運動方程式 f(力の大きさ) / m(質量) 
		 let ax = fx / moonMass
		 let ay = fy / moonMass

		 // 加速度を速度に足し込む
		 r.vx += ax
		 r.vy += ay
		 
		 // 速度を距離に足し込む
		 r.x += r.vx
		 r.y += r.vy
		 
	 })
	
	// 画面を描く
	background(100)
  // 地球を描く
	fill("cyan")
  ellipse(windowWidth / 2, windowHeight / 2, 10, 10)
	
  // ぜんぶの岩を描く
  fill("yellow")
	rocks.forEach(function (r) {
    // x座標+ 左右に振られる角度 + y座標, 岩ひとつの幅、岩ひとつの高さ
		ellipse(r.x, r.y, 2, 2)
	})
}
