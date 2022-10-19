const X = 1;
const O = 0;
let turn = X;

/**
 * Move handler for standard game of Tic-Tac-Toe
 * @param {HTMLElement} elem The clicked element.
 */
function makeMove(elem) {
    if (elem.classList.contains("used")) return; // Check if space has already been used
    elem.classList.add("used"); // Mark cell as used
    if (turn == X) elem.classList.add("x");// Place X/O here
    if (turn == O) elem.classList.add("o");// Place X/O here
    // We only need to check current row, column, and diagonal(s) for a win
    for (let curClass of elem.classList) {
        if (!(curClass.includes("row") || curClass.includes("col") || curClass.includes("diag"))) continue;
        let elems = document.querySelectorAll(`.${curClass}.${turn == X ? "x" : "o"}`);
        if (elems.length == 3) {
            // alert("Win!");
            document.querySelectorAll(".space").forEach(space => {
                space.classList.add("hidden");
            });
            document.querySelector(".tictactoe").classList.add("used", `${turn==X?"x":"o"}`);
        }
    }
    turn = !turn;
}

/** Reset with "r" */
document.addEventListener("keydown", (ev) => ev.key=="r"?reset():null);

/**
 * Resets everything back to default.
 */
function reset() {
    let all = document.querySelectorAll("*");
    for (let elem of all) {
        elem.classList.remove("x","o","used","hidden");
    }
    turn = X;
}