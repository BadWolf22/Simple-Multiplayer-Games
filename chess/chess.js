// let gameState = "";

let board = document.getElementById("chessBoard");
for (let i = 0; i < 64; i++) {
    let div = document.createElement("div");
    div.classList.add("space");
    if (Math.floor(i/8)%2==0) div.classList.add(`${i%2==0?"lightSquare":"darkSquare"}`)
    else div.classList.add(`${i%2==1?"lightSquare":"darkSquare"}`);
    board.appendChild(div);
}