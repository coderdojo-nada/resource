// グローバル変数定義（関数をまたがって使われる変数）
let width, height, snowTimer, snows = [], counter=0

// ランダムと切り捨て
function random_floor(limit) {
	 return floor(random(limit))
}

function Snow() {
	this.x = random(windowWidth) // 雪の開始位置(横位置)
	this.y = -10 // 雪の開始位置(縦位置)
	this.drift = random() // 横方向にランダムに動かす
	this.speed = random_floor(5) + 1 // 落ちるスピードは1から5までの間でランダム
	this.width = random_floor(3) + 2 // 雪の大きさは2から4までの間でランダム
	this.height = this.width // 雪の高さは幅といっしょ
	this.theta = random(100) // 雪の回転する角度は0から９９までのランダム
	this.radius = random(10) + 3 // 雪の回転する半径は3から11までのランダム
}

// 最初に１回自動的に呼ばれて、draw()のなかでもボールが落ちるたびに呼び出す
function setup() {
	createCanvas(windowWidth, windowHeight)　// 背景をウィンドウと同じサイズにする
	background(100) // 背景をグレー色で、ぬりつぶす
	frameRate(10) // 速さは1秒間に10回、書きなおす（draw()関数を呼び出す）
	ellipseMode(RADIUS) // 円を描くときに座標は中心を指定して、大きさは半径の大きさを指定する
	noStroke()// 枠は描かない
}

// １秒で5回呼び出される
function draw() {
	 // ３回画面を描くたびに1回だけ雪をひとつ増やす
	 if (++counter % 3 == 0) {
		 snows.push(new Snow())
	 }
     // 雪 	
	 for (var i = 0; i < snows.length; i++) {
		 snows[i].y += snows[i].speed // 縦位置に落ちるスピードを加算
		 if (snows[i].y > windowHeight) { // 
		 		 snows[i].y = -5 // 上に戻す
		 }
		 snows[i].x += snows[i].drift;
		 if (snows[i].x > windowWidth) {
		 		 snows[i].x = 0 // 左に戻す
		 }
		 snows[i].theta += 0.1 // 左右に振られる角度を増やす
	 }
	
	// 画面を描く
	background(100)
	fill("white")
    // ぜんぶの雪を描く
	snows.forEach(function (s) {
        // x座標+ 左右に振られる角度 + y座標, 雪ひとつの幅、雪ひとつの高さ
		rect(s.x + sin(s.theta) * s.radius, s.y, s.width, s.height)
	})
}
