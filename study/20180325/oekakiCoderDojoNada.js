crab.setCreative(true)
//この変数drwは2つ以上の値を入れることができる配列といいます。 
//配列にはパーラービーズの要領で、ブロックのIDを並べていれることができます。 
let clr = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
let drw = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,35,35,35,35,35, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0,35,35,35,35,35, 0, 0, 0, 0, 0, 0, 0,35, 0, 0, 0, 0, 0,35,35, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0,35, 0, 0, 0, 0, 0,35, 0, 0, 0, 0,35,35, 0, 0, 0,35, 0, 0, 0,35,35, 0, 0, 0, 0],
    [ 0, 0, 0, 0,35, 0, 0,35,35,35, 0, 0,35, 0, 0, 0,35, 0, 0, 0, 0,35, 0, 0, 0, 0,35, 0, 0, 0, 0],
    [ 0, 0, 0,35, 0, 0,35, 0, 0, 0,35, 0, 0,35, 0,35, 0, 0, 0, 0, 0,35, 0, 0, 0, 0,35,35, 0, 0, 0],
    [ 0, 0, 0,35, 0, 0,35, 0, 0, 0,35, 0, 0,35, 0,35, 0, 0, 0, 0, 0,35, 0, 0, 0, 0, 0,35, 0, 0, 0],
    [ 0, 0, 0,35, 0, 0,35, 0, 0, 0,35, 0, 0,35, 0,35, 0, 0, 0, 0, 0,35, 0, 0, 0, 0, 0,35, 0, 0, 0],
    [ 0, 0, 0,35, 0, 0,35, 0, 0, 0,35, 0, 0,35, 0,35, 0, 0, 0, 0, 0,35, 0, 0, 0, 0, 0,35, 0, 0, 0],
    [ 0, 0, 0,35, 0, 0,35, 0, 0, 0,35, 0, 0,35, 0,35, 0, 0, 0, 0, 0,35, 0, 0, 0, 0, 0,35, 0, 0, 0],
    [ 0, 0, 0, 0,35, 0, 0,35,35,35, 0, 0,35, 0, 0, 0,35, 0, 0, 0, 0,35, 0, 0, 0, 0,35, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0,35, 0, 0, 0, 0, 0,35,35, 0, 0, 0,35,35, 0, 0, 0,35, 0, 0, 0,35,35, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0,35,35,35,35,35, 0, 0, 0, 0, 0, 0, 0,35, 0, 0, 0, 0, 0,35,35, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,35,35,35,35,35, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0,35,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,35,35, 0, 0, 0, 0, 0, 0, 0,35, 0, 0, 0, 0],
    [35, 0, 0, 0,35, 0, 0, 0,35, 0, 0, 0, 0, 0,35, 0, 0,35, 0,35, 0, 0,35, 0, 0, 0, 0, 0, 0,35, 0],
    [35, 0, 0,35, 0,35, 0, 0,35, 0,35,35,35, 0,35,35, 0,35, 0,35, 0,35, 0,35, 0, 0,35, 0,35, 0,35],
    [35, 0, 0,35, 0,35, 0, 0,35, 0,35, 0,35, 0,35, 0, 0,35, 0,35, 0,35, 0,35, 0, 0,35, 0,35, 0,35],
    [35, 0, 0,35, 0,35,35,35,35, 0,35,35,35, 0,35, 0, 0,35, 0,35, 0,35, 0,35, 0, 0,35, 0,35, 0,35],
    [35, 0, 0,35, 0,35,35, 0,35, 0,35, 0, 0, 0,35, 0, 0,35, 0,35, 0,35, 0,35, 0, 0,35, 0,35, 0,35],
    [ 0,35,35, 0,35, 0,35,35,35, 0,35,35,35, 0,35, 0, 0,35,35,35, 0, 0,35, 0,35, 0,35, 0, 0,35, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,35, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0,35, 0, 0, 0,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0,35,35, 0, 0,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0,35, 0,35, 0,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0,35, 0,35,35,35, 0, 0,35,35,35, 0, 0,35,35,35,35, 0, 0,35,35,35, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0,35, 0, 0,35,35, 0,35, 0, 0,35, 0, 0,35, 0, 0,35, 0,35, 0, 0,35, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0,35, 0, 0, 0,35, 0,35, 0, 0,35, 0, 0,35, 0, 0,35, 0,35, 0, 0,35, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0,35, 0, 0, 0,35, 0, 0,35,35,35,35, 0,35,35,35,35, 0, 0,35,35,35,35, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
//配列から、ブロックを作る時の幅を決めます 
//wが幅、よこは5で折り返すという意味です
let w = 31 
//hは高さ、幅がわかったら、長さを割れば高さが求まります 
let h = 33
for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
        //置く場所の(x,y)から配列のどれを取り出すかきめて、値を取り出し。 
        let d = clr[y][x]
        //それをsetBlockでマイクラの世界に置きます 
        world.setBlock(d, 0, x, h - y, 1) //高さは降順にする 5-0 ... 5-4で 5,4,3,2,1になる1だと宙に浮く
    }
}
