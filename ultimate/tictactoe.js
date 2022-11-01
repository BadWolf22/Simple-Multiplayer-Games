// TODO: Total rewrite to simplify logic. Please

const X = 1;
const O = 0;
let turn = X;

/**
 * Move handler for standard game of Tic-Tac-Toe
 * @param {HTMLElement} elem The clicked element.
 */
function makeMove(elem) {
    if (elem.classList.contains("used") || elem.classList.contains("deactivated")) return; // Check if space has already been used
    elem.classList.add("used"); // Mark cell as used
    if (turn == X) elem.classList.add("x");// Place X/O here
    if (turn == O) elem.classList.add("o");// Place X/O here
    // Check current layer for a win
    checkWin(elem, turn);
    turn = !turn;
    deactivate();
    let rowCol = Array.from(elem.classList).filter(word => {
        return word.includes("row") || word.includes("col");
    });
    activate(elem.parentElement.parentElement.querySelector(`:scope > .${rowCol.join(".")}`));
    // elem.parentElement.parentElement.querySelector(`:scope > .${rowCol.join(".")}`).classList.add("previewed");
    // activate(elem.parentElement);
}

function checkWin(elem, turn) {
    // We only need to check current row, column, and diagonal(s) for a win
    for (let curClass of elem.classList) {
        if (!(curClass.includes("row") || curClass.includes("col") || curClass.includes("diag"))) continue;
        let elems = elem.parentElement.querySelectorAll(`:scope > .${curClass}.${turn == X ? "x" : "o"}`);
        if (elems.length == 3) {
            // alert("Win!");
            elem.parentElement.querySelectorAll(".space").forEach(space => {
                space.classList.add("hidden");
            });
            elem.parentElement.classList.add("used", `${turn == X ? "x" : "o"}`);
            // Do a check for the layer above
            checkWin(elem.parentElement, turn);
        }
    }
}

/** Reset with "r" key */
document.addEventListener("keydown", (ev) => ev.key == "r" ? reset() : null);
document.querySelectorAll(".tictactoe>.space").forEach(elem => {
    elem.addEventListener("mouseenter", (ev) => {
        if (elem.classList.contains("deactivated") || elem.classList.contains("used")) return;
        let rowCol = Array.from(elem.classList).filter(word => {
            return word.includes("row") || word.includes("col");
        });
        let target = elem.parentElement.parentElement.querySelector(`:scope > .${rowCol.join(".")}`);
        let targetIsUsed = target.classList.contains("used");
        if (!targetIsUsed) target.classList.add("previewed");
        else target.parentElement.querySelectorAll(":scope > .space:not(.used)").forEach(e => e.classList.add("previewed"));
        elem.classList.add(`${turn == X ? "x" : "o"}`);
    });
    elem.addEventListener("mouseleave", (ev) => {
        if (elem.classList.contains("deactivated") || elem.classList.contains("used")) return;
        let rowCol = Array.from(elem.classList).filter(word => {
            return word.includes("row") || word.includes("col");
        });
        // let target = elem.parentElement.parentElement.querySelector(`:scope > .${rowCol.join(".")}`)
        elem.parentElement.parentElement.querySelectorAll(":scope > .space:not(.used)").forEach(e => e.classList.remove("previewed"));
        elem.classList.remove(`${turn == X ? "x" : "o"}`);
    });
});

/**
 * Resets everything back to default.
 */
function reset() {
    let all = document.querySelectorAll("*");
    for (let elem of all) {
        elem.classList.remove("x", "o", "used", "hidden", "deactivated", "activated", "previewed");
    }
    turn = X;
}

/**
 * Deselects all squares for play.
 */
function deactivate() {
    let all = document.querySelectorAll(".space");
    for (let elem of all) {
        elem.classList.add("deactivated");
        elem.classList.remove("activated");
        elem.classList.remove("previewed");
    }
}

/**
 * Reenables the spaces within a parent game to be playable.
 * @param {HTMLElement} parent The parent game who's cells we would like to activate.
 */
function activate(parent) {
    if (parent.classList.contains("x") || parent.classList.contains("o")) return activate(document.body);
    parent.classList.remove("deactivated");
    parent.classList.add("activated");
    let all = parent.querySelectorAll("*");
    for (let elem of all) {
        elem.classList.remove("deactivated");
    }
}

/**
 * todo:
 * Toggles on/off the displaying of who won a cell (shows all moves instead of the summary).
 */
function toggleWinShowing() {

}