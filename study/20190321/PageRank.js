const RADIUS = 40;				//ノードの半径
let nodes = [];						//ノードの配列
let edges = [];						//エッジの配列
let edgesForRankSource = [];	//ランクソース関係のエッジ
let state = null;					//現在の状態
let selectedNode = null; 	//現在選択中のノード
let dampingFactor = 100;		//ダンピングファクター（実際はこの値を0.01倍したもの）
let resizeNodesFlag = true;	//PageRank値によってノードのサイズを変えるかどうか
let animationSpeed = 1;			//アニメーションのスピード(0:OFF, 1:SLOW, 2:MEDIUM, 3:FAST)
let animationDuration = [0, 300, 180, 60];	//アニメーションの持続時間（上記のanimationSpeedに対応）
let animationFrame = 0;			//アニメーションのフレーム
let normalizationFlag = false;	//PageRank値の合計を1にするかどうか（正規化）
let sumOfPRScore = 0;  //PageRank値の合計

function setup() {
  createCanvas(1100, 800);
	strokeWeight(3);

	//初期ノードの生成
	for (let x = 100; x <= 700; x += 300) {
		for (let y = 250; y <= 550; y += 300) {
			nodes.push(new Node(x, y));
		}
	}

	//ランクソースの生成
	rankSource = new Node(950, 700);

	//PageRank値の合計を計算
	calculateSumOfPRScore();
}


function draw() {
	fill(240);
	rect(0, 0, 1100, 800);

	//移動中のノードがあれば座標を変更
  if (state == "MoveNode") {
		selectedNode.x = fitInCanvas(mouseX);
		selectedNode.y = fitInCanvas(mouseY);
	}

	//エッジ生成中であればそのエッジを描画
	if (state == "CreateEdge") {
		drawArrow(selectedNode.x, selectedNode.y, fitInCanvas(mouseX), fitInCanvas(mouseY));
	}

	//エッジの描画
	for (let i = 0; i < edges.length; i++) {
		let e = edges[i];
		let sn = e.sn;
		let en = e.en;
		let d = dist(sn.x, sn.y, en.x, en.y);
		if (d > 0) {
			drawArrow(sn.x, sn.y, (en.r * sn.x + (d - en.r) * en.x) / d, (en.r * sn.y + (d - en.r) * en.y) / d);
		}
	}

	//ノードの描画
	for (let i = nodes.length - 1; i >= 0; i--) {
		let n = nodes[i];
		fill(255);
		ellipse(n.x, n.y, n.r * 2, n.r * 2);
		fill(255, 0, 0, 255 * n.prs * 3 / 16);
		ellipse(n.x, n.y, n.r * 2, n.r * 2);
		fill(0);
		if (n.prs > 9.994) {
			textSize(n.r * 0.5);
		} else {
			textSize(n.r * 0.6);
		}
		textAlign(CENTER, CENTER);
		if (normalizationFlag) {
			text((n.prs / sumOfPRScore).toFixed(2), n.x - n.r * 0.86, n.y - n.r * 0.5, n.r * 1.73, n.r);
		} else {
			text(n.prs.toFixed(2), n.x - n.r * 0.86, n.y - n.r * 0.5, n.r * 1.73, n.r);
		}
	}

	//画面右側の描画
	drawRightSide();

	//アニメーションの描画
	if (state == "Run") {
		if (animationFrame == 0) {
			runPageRankStep1();
		}
		if (animationFrame > 0 && animationFrame < animationDuration[animationSpeed]) {
			animate(edgesForRankSource, animationDuration[animationSpeed], animationFrame);
		}
		if (animationFrame == animationDuration[animationSpeed]) {
			runPageRankStep2();
		}
		if (animationFrame > animationDuration[animationSpeed] && animationFrame < animationDuration[animationSpeed] * 2) {
			animate(edges, animationDuration[animationSpeed], animationFrame - animationDuration[animationSpeed]);
			drawRankSource();
		}
		if (animationFrame == animationDuration[animationSpeed] * 2) {
			runPageRankStep3();
		}
		if (animationFrame > animationDuration[animationSpeed] * 2 && animationFrame < animationDuration[animationSpeed] * 3) {
			animate(edgesForRankSource, animationDuration[animationSpeed], animationFrame - animationDuration[animationSpeed] * 2);
		}
		if (animationFrame == animationDuration[animationSpeed] * 3) {
			runPageRankStep4();
			animationFrame = -1;
			state = null;
		}
		animationFrame++;
	}
}

//左クリックされた時に実行される関数
function mousePressed() {
	//実行中のマウス操作は受け付けない
	if (state == "Run") {
		return;
	}

	//Cキーが押されている場合はノードまたはエッジの生成
	if (keyIsPressed && key == "c") {
		//ノードがクリックされていればエッジを生成
		for (let i = 0; i < nodes.length; i++) {
			let n = nodes[i];
			if (n.onMouseOver()) {
				selectedNode = n;
				state = "CreateEdge";
				return;
			}
		}
		//ノードがクリックされていなければノードを生成
		nodes.push(new Node(mouseX, mouseY));
		calculateSumOfPRScore();
		return;
	}

	//Dキーが押されている場合はノードまたはエッジを削除
	if (keyIsPressed && key == "d") {
		//ノードがクリックされていればノードを削除
		for (let i = 0; i < nodes.length; i++) {
			let n = nodes[i];
			if (n.onMouseOver()) {
				n.remove();
				calculateSumOfPRScore();
				return;
			}
		}
		//エッジがクリックされていればエッジを削除
		for (let i = 0; i < edges.length; i++) {
			let e = edges[i];
			if (e.onMouseOver()) {
				e.remove();
				return;
			}
		}
	}

	//キーが押されていない場合はノードの移動
	for (let i = 0; i < nodes.length; i++) {
		let n = nodes[i];
		if (n.onMouseOver()) {
			selectedNode = n;
			state = "MoveNode";
			break;
		}
	}
}

//左クリックが離された時に実行される関数
function mouseReleased() {
	//ノード移動中であれば移動を解除
	if (state == "MoveNode") {
		state = null;
		selectedNode = null;
	}

	//エッジ生成中であればエッジを生成
	if (state == "CreateEdge") {
		for (let i = 0; i < nodes.length; i++) {
			let n = nodes[i];
			if (n.onMouseOver() && n !== selectedNode) {
				//エッジがまだ存在しなければ生成
				if (!inEdges(selectedNode, n)) {
					edges.push(new Edge(selectedNode, n));
					selectedNode.out++;
					n.in++;
					break;
				}
			}
		}
		state = null;
		selectedNode = null;
	}
}

//キーが押された時に実行される関数
function keyPressed() {
	//実行中のキー操作は受け付けない
	if (state == "Run") {
		return;
	}

	//Rキーが押されたらページランクの計算を実行
	if (key == "r") {
		if (nodes.length > 1) {
			state = "Run"
		}
	}

	//Qキーが押されたら全てのノードの値を1.00にする
	if (key == "q") {
		for (let i = 0; i < nodes.length; i++) {
			nodes[i].prs = 1.0;
		}
		calculateSumOfPRScore();
		resizeNodes();
	}

	//Sキーが押されたらPageRank値でノードのサイズを変えるかどうかを変更
	if (key == "s") {
		resizeNodesFlag ? resizeNodesFlag = false : resizeNodesFlag = true;
		resizeNodes();
	}

	//Aキーが押されたらアニメーションスピードを変更
	if (key == "a") {
		animationSpeed = (animationSpeed + 1) % 4;
	}

	//1キーが押されたらダンピングファクターを減らす
	if (key == "1") {
		if (dampingFactor > 0) {
			dampingFactor--;
		}
	}	

	//2キーが押されたらダンピングファクターを増やす
	if (key == "2") {
		if (dampingFactor < 100) {
			dampingFactor++;
		}
	}

	//Nキーが押されたらPG値を合計1にするかどうかを変更
	if (key == "n") {
		normalizationFlag ? normalizationFlag = false : normalizationFlag = true;
	}
}

//ノードを表すクラス
class Node {
	constructor(x, y) {
		this.x = x;		//ノードのx座標
		this.y = y;		//ノードのy座標
		this.r = RADIUS;	//ノードの半径
		this.in = 0;	//ノードの入次数
		this.out = 0;	//ノードの出次数
		this.prs = 1.0;		//ノードのPageRank値
	}

	//ノードを削除（ノード数が2以上の時のみ）
	remove() {
		if (nodes.length > 1) {
			//このノードの接続されているエッジの削除
			for (let i = edges.length - 1; i >= 0; i--) {
				let e = edges[i];
				if (e.sn === this || e.en === this) {
					e.remove();
				}
			}
			//このノードの削除
			nodes.splice(nodes.indexOf(this), 1);
		}
	}

	//マウスと重なっているかどうかを返すメソッド
  onMouseOver() {
		if (dist(this.x, this.y, mouseX, mouseY) <= this.r) {
			return true;
		} else {
			return false;
		}
	}
}

//エッジを表すクラス
class Edge {
	constructor(sn, en) {
		this.sn = sn;	//始点ノード
		this.en = en;	//終点ノード
		this.prs = 0;	//エッジのPageRank値
		this.r = 0;		//エッジのPageRank値移動の際の半径
	}

	//エッジを削除
	remove() {
		this.sn.out--;
		this.en.in--;
		edges.splice(edges.indexOf(this), 1);
	}

	//マウスと重なっているかどうかを返すメソッド
	onMouseOver() {
		let sn = this.sn;
		let en = this.en;
		if ((sn.x == mouseX && sn.y == mouseY) || (en.x == mouseX && en.y == mouseY)) {
			return true;
		} 
		let ax = en.x - sn.x;
		let ay = en.y - sn.y;
		let bx = mouseX - sn.x;
		let by = mouseY - sn.y;
		if ((ax * bx + ay * by) / (sqrt(sq(ax) + sq(ay)) * sqrt(sq(bx) + sq(by))) < 0.9998) {
			return false;
		} 
		ax = -ax;
		ay = -ay;
		bx = mouseX - en.x;
		by = mouseY - en.y;
		if ((ax * bx + ay * by) / (sqrt(sq(ax) + sq(ay)) * sqrt(sq(bx) + sq(by))) < 0.9998) {
			return false;
		} 
		return true;
	}
}

//エッジ（矢印）を描画する関数
function drawArrow(sx, sy, ex, ey) {
	//エッジの描画
	line(sx, sy, ex, ey);

	//矢尻の描画
	let lengthOfArrowhead = 15; //矢尻の長さ
	let d = dist(sx, sy, ex, ey);
	if (d > lengthOfArrowhead) {
		let tx = (lengthOfArrowhead * sx + (d - lengthOfArrowhead) * ex) / d;
		let ty = (lengthOfArrowhead * sy + (d - lengthOfArrowhead) * ey) / d;
		line(ex, ey, (tx - ex) * cos(PI / 6) - (ty - ey) * sin(PI / 6) + ex, (tx - ex) * sin(PI / 6) + (ty - ey) * cos(PI / 6) + ey);
		line(ex, ey, (tx - ex) * cos(-PI / 6) - (ty - ey) * sin(-PI / 6) + ex, (tx - ex) * sin(-PI / 6) + (ty - ey) * cos(-PI / 6) + ey);
	}
}

//ある始点と終点を持つエッジが存在するかを返す関数
function inEdges(sn, en) {
	for (let i = 0; i < edges.length; i++) {
		let e = edges[i];
		if (e.sn === sn && e.en === en) {
			return true;
		}
	}
	return false;
}

//ノードのサイズをまとめて変更する関数
function resizeNodes() {
	if (resizeNodesFlag) {
		for (let i = 0; i < nodes.length; i++) {
			if (sqrt(nodes[i].prs) > 0.4) {	
				nodes[i].r = RADIUS * sqrt(nodes[i].prs);
			} else {
				nodes[i].r = RADIUS * 0.4;
			}
		}
		for (let i = 0; i < edges.length; i++) {
			edges[i].r = RADIUS * sqrt(edges[i].prs);
		}
		for (let i = 0; i < edgesForRankSource.length; i++) {
			edgesForRankSource[i].r = RADIUS * sqrt(edgesForRankSource[i].prs);
		}
		rankSource.r = RADIUS * sqrt(rankSource.prs);
	} else {
		for (let i = 0; i < nodes.length; i++) {
			nodes[i].r = RADIUS;
		}
		for (let i = 0; i < edges.length; i++) {
			edges[i].r = RADIUS;
		}
		for (let i = 0; i < edgesForRankSource.length; i++) {
			edgesForRankSource[i].r = RADIUS;
		}
		rankSource.r = RADIUS;
	}
}

//キャンバス内に収める関数
function fitInCanvas(num) {
	if (num < 0) {
		return 0;
	} else if (num > 800) {
		return 800;
	} else {
		return num;
	}
}

function runPageRankStep1() {
	rankSource.prs = 0.0;
	for (let i = 0; i < nodes.length; i++) {
		let n = nodes[i];
		if (n.out == 0) {
			let e = new Edge(n, rankSource);
			e.prs = n.prs;
			edgesForRankSource.push(e);
			n.prs = 0;
		} else if (dampingFactor != 100) {
			let e = new Edge(n, rankSource);
			e.prs = n.prs * (1 - dampingFactor / 100);
			edgesForRankSource.push(e);
			n.prs *= dampingFactor / 100;
		}
	}

	if (edgesForRankSource.length > 0) {
		resizeNodes();
	} else {
		//ランクソースが不要であればアニメーションを飛ばす
		animationFrame += animationDuration[animationSpeed];
	}
}

function runPageRankStep2() {
	for (let i = 0; i < edgesForRankSource.length; i++) {
		rankSource.prs += edgesForRankSource[i].prs;
	}

	if (edges.length > 0) {
		for (let i = 0; i < edges.length; i++) {
			let e = edges[i];
			e.prs = e.sn.prs / e.sn.out;
		}

		for (let i = 0; i < nodes.length; i++) {
			nodes[i].prs = 0;
		}

		resizeNodes();
	} else {
		//エッジがなければアニメーションを飛ばす
		animationFrame += animationDuration[animationSpeed];
	}
}

function runPageRankStep3() {
	for (let i = 0; i < edges.length; i++) {
		let e = edges[i];
		e.en.prs += e.prs;
		e.prs = 0;
	}

	if (edgesForRankSource.length != 0) {
		edgesForRankSource = [];
		for (let i = 0; i < nodes.length; i++) {
			let e = new Edge(rankSource, nodes[i]);
			e.prs = rankSource.prs / nodes.length;
			edgesForRankSource.push(e);
		}
		rankSource.prs = 0.0;
	} else {
		//ランクソースがなければアニメーションを飛ばす
		animationFrame += animationDuration[animationSpeed];
	}

	resizeNodes();
}

function runPageRankStep4() {
	if (edgesForRankSource.length != 0) {
		for (let i = 0; i < edgesForRankSource.length; i++) {
			let e = edgesForRankSource[i];
			e.en.prs += e.prs;
		}
		resizeNodes();
		edgesForRankSource = [];
	}
}

//アニメーションを描画する関数
function animate(selectEdges, duration, frame) {
	for (let i = 0; i < selectEdges.length; i++) {
		let e = selectEdges[i];
		let x = (e.sn.x * (duration - frame) + e.en.x * frame) / duration;
		let y = (e.sn.y * (duration - frame) + e.en.y * frame) / duration;
		fill(255, 0, 0, 255 * e.prs * 3 / 16);
		ellipse(x, y, e.r * 2, e.r * 2);
		if (e.prs > 9.994) {
			textSize(e.r * 0.5);
		} else {
			textSize(e.r * 0.6);
		}
		fill(0);
		textAlign(CENTER, CENTER);
		if (normalizationFlag) {
			text((e.prs / sumOfPRScore).toFixed(2), x - e.r * 0.86, y - e.r * 0.5, e.r * 1.73, e.r);
		} else {
			text(e.prs.toFixed(2), x - e.r * 0.86, y - e.r * 0.5, e.r * 1.73, e.r);
		}
	} 
}

//画面右側を描画する関数
function drawRightSide() {
	fill(200);
	rect(800, 0, 300, 490);
	fill(200, 255, 200);
	rect(800, 490, 300, 110);
	fill(240);
	rect(800, 600, 300, 200);
	fill(0);

	textSize(14);
	textStyle(BOLD);
	textAlign(LEFT, TOP);
	let manual = [
		"Move Node:\n    Drag node",
		"Create Node:\n    'C key' + Click",
		"Create Edge:\n    'C key' + Drag node",
		"Delete Node:\n    'D key' + Click node",
		"Delete Edge:\n    'D key' + Click edge",
		"Run PageRank Algorithm:\n    'R key'",
		"Change Animation Speed:\n    'A key'",
		"Resize or not Nodes by PR Score:\n    'S key'",
		"Reset PageRank Score:\n    'Q key'",
		"Decrease DampingFactor:\n    '1 key'",
		"Increase DampingFactor:\n    '2 key'",
		"Normalize or not PR Score:\n    'N key'"
	]
	for (let i = 0; i < manual.length; i++) {
		text(manual[i], 805, 40 * i + 5, 290, 40);
	}

	textSize(18);
	textAlign(LEFT, CENTER);
	let animationSpeedText = ["OFF", "SLOW", "MEDIUM", "FAST"];
	text("Animation Speed: " + animationSpeedText[animationSpeed], 805, 495, 290, 25);
	text("Resize Nodes: " + (resizeNodesFlag ? "ON" : "OFF"), 805, 520, 290, 25);
	text("DampingFactor: " + (dampingFactor / 100).toFixed(2), 805, 545, 290, 25);

	if (normalizationFlag) {
		text("Sum of PR Score: 1.00 (NR)", 805, 570, 290, 25);
	} else {
		text("Sum of PR Score: " + sumOfPRScore.toFixed(2), 805, 570, 290, 25);
	}

	textSize(15);
	textAlign(LEFT, TOP);
	text("RankSource", 805, 605, 290, 30);
	textStyle(NORMAL);
}

//ランクソースを描画する関数
function drawRankSource() {
	if (edgesForRankSource.length != 0) {
		let rs = rankSource;
		fill(255, 0, 0, 255 * rs.prs * 3 / 16);
		ellipse(rs.x, rs.y, rs.r * 2, rs.r * 2);
		if (rs.prs > 9.994) {
			textSize(rs.r * 0.5);
		} else {
			textSize(rs.r * 0.6);
		}
		fill(0);
		textAlign(CENTER, CENTER);
		if (normalizationFlag) {
			text((rs.prs / sumOfPRScore).toFixed(2), rs.x - rs.r * 0.86, rs.y - rs.r * 0.5, rs.r * 1.73, rs.r);
		} else {
			text(rs.prs.toFixed(2), rs.x - rs.r * 0.86, rs.y - rs.r * 0.5, rs.r * 1.73, rs.r);
		}
	}
}

//PageRank値の合計を計算
function calculateSumOfPRScore() {
	sumOfPRScore = 0;
	for (let i = 0; i < nodes.length; i++) {
		sumOfPRScore += nodes[i].prs;
	}
}
