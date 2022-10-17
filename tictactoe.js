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
    turn = !turn;
    // TODO: Check for win
}