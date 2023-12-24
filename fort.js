// See fort.md for rules
// Checkers guide as a starting point:
// https://dev.to/niemet0502/how-i-built-a-checkers-game-with-javascript-2hn5

class Piece {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    equals(piece) {
        return piece.row == this.row && piece.col == this.col;
    }
}

// -2 = Black fort
// -1 = Black piece
// 0 = empty
// 1 = White piece
// 2 = White fort
let board = [
        [0,0,0,0,0],
       [0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0],
    [2,0,0,0,0,0,0,-2,0],
     [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
       [0,0,0,0,0,0],
        [0,0,0,0,0],
];

const movesPerTurn = 3;
const midPoint = (board.length - 1)/2;

let gameOver = false;
// 1 or -1
let currentPlayer = 1;
// 1, 2, 3, or 4
let currentPhase = 1;

let newPiecesPositions = [];

let readyToMove = null;

/* TODO's:
 * Undo last move - maintain an oldBoard which is just the most recent board before the current one.
 * Have a button below the board to restore it.
 *
 * Long term:
 * - Ten move rule (counter and check game over)
 * - Row and column markers
 * - Game log
 */

function movePiece(e) {
    if (gameOver) {
        return;
    }
    let piece = e.target;
    const row = parseInt(piece.getAttribute("row"));
    const col = parseInt(piece.getAttribute("col"));
    let p = new Piece(row, col);

    if (newPiecesPositions.length > 0) {
        enableToMove(p);
    }

    const kind = board[row][col];
    const currentPiece = currentPlayer;
    const currentFort = currentPlayer * 2;

    if (currentPhase <= movesPerTurn && kind == currentPiece) {
        findPossiblePositions(p, false);
    } else if (kind == currentFort) {
        findPossiblePositions(p, true);
    }
}

function enableToMove(p) {
    if (!readyToMove) {
        console.log("EnableToMove called but no piece ready to move. Problem!");
        return;
    }

    let eligibleCell = false;
    for (let i = 0; i < newPiecesPositions.length; i++) {
        if (p.equals(newPiecesPositions[i])) {
            eligibleCell = true;
            break;
        }
    }
    if (eligibleCell) {
        const kindToMove = board[readyToMove.row][readyToMove.col];
        const currentPiece = currentPlayer;
        const currentFort = currentPlayer * 2;
        const targetKind = board[p.row][p.col];
        if (kindToMove === currentPiece) {
            if (targetKind === currentPiece) {
                // Claim
                board[p.row][p.col] = currentFort;
            } else {
                // Step or capture
                board[p.row][p.col] = currentPiece;
            }
            // Empty current square
            board[readyToMove.row][readyToMove.col] = 0;
            currentPhase++;
        } else if (kindToMove == currentFort) {
            board[p.row][p.col] = currentPiece;
            currentPhase = 1;
            currentPlayer = -currentPlayer;
        } else {
            console.log("readyToMove doesn't point at current player");
        }
    }
    readyToMove = null;
    newPiecesPositions = [];
    skipToSpawn();
    checkGameOver();
    displayCurrentPlayer();
    buildBoard();
}

function skipToSpawn() {
    if (currentPhase === movesPerTurn + 1) {
        return;
    }
    // If current player has no pieces that have legal moves, skip to the spawn phase.
    for (let row_index = 0; row_index < board.length; row_index++) {
        const row = board[row_index];
        for (let col_index = 0; col_index < row.length; col_index++) {
            const cell = row[col_index];
            const currentPiece = currentPlayer;
            if (cell === currentPiece) {
                const neighbors = allNeighbors(new Piece(row_index, col_index));
                for (let i = 0; i < neighbors.length; i++) {
                    const neighbor = neighbors[i];
                    const neighbor_cell = board[neighbor.row][neighbor.col];
                    if (neighbor_cell == 0 || neighbor_cell == 1 || neighbor_cell == -1) {
                        return;
                    }
                }
            }
        }
    }
    currentPhase = movesPerTurn + 1;
}

function checkGameOver() {
    if (currentPhase <= movesPerTurn) {
        return;
    }
    // If, for every fort of the current player, it has no empty squares, the game is over.
    for (let row_index = 0; row_index < board.length; row_index++) {
        const row = board[row_index];
        for (let col_index = 0; col_index < row.length; col_index++) {
            const cell = row[col_index];
            const currentFort = currentPlayer * 2;
            if (cell == currentFort) {
                const neighbors = allNeighbors(new Piece(row_index, col_index));
                for (let i = 0; i < neighbors.length; i++) {
                    const neighbor = neighbors[i];
                    const neighbor_cell = board[neighbor.row][neighbor.col];
                    if (neighbor_cell == 0) {
                        return;
                    }
                }
            }
        }
    }
    currentPlayer = -currentPlayer;
    gameOver = true;
}


function displayCurrentPlayer() {
    let playerMarker = document.getElementById("next-player-marker");
    if (!playerMarker) {
        console.log("Player marker is null! Oh no!");
    }
    if (currentPlayer == 1) {
        playerMarker.setAttribute("class", "occupied white");
    } else {
        playerMarker.setAttribute("class", "occupied black");
    }
    let playerDiv = document.getElementById("next-player-text");
    if (gameOver) {
        playerDiv.innerText = "wins! Game over!"
    } else if (currentPhase <= movesPerTurn) {
        playerDiv.innerText = "player, move " + currentPhase + "/" + movesPerTurn;
    } else {
        playerDiv.innerText = "player, spawn";
    }
}

function findPossiblePositions(p, spawn) {
    const neighbors = allNeighbors(p);
    for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        const cell = board[neighbor.row][neighbor.col];
        if (cell === 0 || (!spawn && (cell === 1 || cell === -1))) {
            readyToMove = p;
            markPossiblePosition(neighbor);
        }
    }
}

function allNeighbors(p) {
    let array = [];
    // Move up
    if (p.row > 0) {
        // Move up left
        const left_col = p.row <= midPoint ? p.col - 1 : p.col;
        if (left_col >= 0) {
            array.push(new Piece(p.row - 1, left_col));
        }
        // Move up right
        if (left_col < board[p.row - 1].length - 1) {
            array.push(new Piece(p.row - 1, left_col + 1));
        }
    }
    // Move left
    if (p.col > 0) {
        array.push(new Piece(p.row, p.col - 1));
    }
    // Move right
    if (p.col < board[p.row].length - 1) {
        array.push(new Piece(p.row, p.col + 1));
    }
    // Move down
    if (p.row < board.length - 1) {
        // Move down left
        const left_col = p.row >= midPoint ? p.col - 1 : p.col;
        if (left_col >= 0) {
            array.push(new Piece(p.row + 1, left_col));
        }
        // Move down right
        if (left_col < board[p.row + 1].length - 1) {
            array.push(new Piece(p.row + 1, left_col + 1));
        }
    }
    return array;
}

function markPossiblePosition(p) {
    let attribute = p.row + "-" + p.col;

    let document_cell = document.querySelector("[data-position='" + attribute + "']");
    if (document_cell) {
        document_cell.style.background = "lawngreen";
        // Save where it can move
        newPiecesPositions.push(p);
    } else {
        console.log("Piece not found: " + attribute);
    }
}

let game = document.getElementById("game");
function buildBoard() {
    game.innerHTML = "";
    // Iterate over the rows
    for (let row_index = 0; row_index < board.length; row_index++) {
        const board_row = board[row_index];
        // Create div for each row
        let document_row = document.createElement("div");
        document_row.setAttribute("class", "row");

        // Space out the left
        const num_spacers = board.length - board_row.length;
        for (let spacer_index = 0; spacer_index < num_spacers; spacer_index++) {
            let spacer = document.createElement("div");
            spacer.setAttribute("class", "spacer");
            document_row.appendChild(spacer);
        }

        for (let col_index = 0; col_index < board_row.length; col_index++) {
            const board_cell = board_row[col_index];
            let document_cell = document.createElement("div");
            let piece_spot = document.createElement("div");

            // Colors for cells
            const background_start = row_index <= midPoint ? row_index : board.length - 1 - row_index;
            const background_choice = (background_start + col_index) % 3;
            let background = "";
            if (background_choice == 0) {
                background = "light";
            } else if (background_choice == 1) {
                background = "medium";
            } else {
                background = "dark";
            }

            // Colors for pieces
            let player = "";
            if (board_cell > 0) {
                player = "white";
            } else if (board_cell < 0) {
                player = "black";
            } else {
                player = "empty";
            }

            let kind = "";
            if (Math.abs(board_cell) == 1) {
                kind = "piece";
            } else if (Math.abs(board_cell) == 2) {
                kind = "fort";
            } else {
                kind = "none";
            }
                
            piece_spot.setAttribute("class", "occupied " + player + " " + kind);
            piece_spot.setAttribute("row", row_index);
            piece_spot.setAttribute("col", col_index);
            piece_spot.setAttribute("data-position", row_index + "-" + col_index);

            piece_spot.addEventListener("click", movePiece);

            document_cell.appendChild(piece_spot);

            document_cell.setAttribute("class", "cell " + background);

            document_row.appendChild(document_cell);
        }
        game.appendChild(document_row);
    }
}

buildBoard();
