let counter = 0;
let 半径 = 0;
let 円周の積分 = 0;
let 円の面積 = 0;
let 増分値 = 1; // 半径の増分 == 円周の線の太さ

// 初期設定
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
    noStroke();
    frameRate(100);
    textSize(30);
    strokeWeight(1);
    noFill();
}

// 繰り返し
function draw() {

    // 半径が255を超えたら、描画をスキップ
    if (半径>255) return;

    // 半径を少しずつ増やす
    半径 += 増分値;

    // 半径 × 2 × π × 円周の太さ(半径の増分値)
    円周の積分 += 半径 * 2 * Math.PI *　増分値; // 円周を積分(累積)
    
    // 半径 × 半径 * π
    円の面積 = 半径 ** 2 * Math.PI; // 面積

    counter += 1;
    if (counter % 2 == 0) {
        // 円を描く
        stroke(半径); // 半径の大きさで色を変える
        circle(windowWidth/2, windowHeight/2, 半径*2); // x位置、y位置、直径
        
        // 文字を描く部分をクリア
        fill(200);
        rect(0, 0, 800, 200);

        // 文字を描く
        fill(0);
        text("円周を積分: " + 円周の積分, 10, 30);
        text("円の面積　: " + 円の面積, 10, 80);
        text("円周を積分 - 円の面積　: " + (円周の積分 - 円の面積), 10, 130);
        text("半径　: " + 半径, 10, 180);
    }
}
