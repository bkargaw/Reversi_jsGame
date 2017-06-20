let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let grid = new Array(8);
  for (let i = 0; i < 8; i++ ){
    grid[i] = new Array(8);
  }
  grid[3][4] = new Piece("black");
  grid[4][3] = new Piece("black");
  grid[3][3] = new Piece("white");
  grid[4][4] = new Piece("white");

  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

Board.prototype.isInBound = function (row, col) {
  if (row < 0 || row > 7 || col < 0 || col > 7) return false
  return true;
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  let row = pos[0];
  let col = pos[1];
  if (!this.isInBound(row, col)) throw Error("Not valid pos!");
  let piece = this.grid[row][col]
  return piece;
};

/**
 * finds all the pieces associated with this color
 */
Board.prototype.findAll = function (color) {
  let pieces = {};
  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      let piece = this.grid[i][j];
      if(piece != null && piece.color == color) pieces[piece] = [i,j];
    }
  }
  return pieces;
};
/**
 * check is there is a valid move on the left of the piece @ pos
 */
Board.prototype.checkLeft = function (color,row, col) {
  if(this.isInBound(row,col -1)){
    let piece = this.grid[row][col -1];
    if (piece == null || piece.color == color) return false;
  }

  for (let i = row -2; i > -1; i--){
    let piece = this.grid[row][i];
    if(piece == null) return true;
    if(piece.color == color) return false;
  }
  return false
};
/**
 * check is there is a valid move on the left of the piece @ pos
 */
Board.prototype.checkRight = function (color,row, col) {
  if(this.isInBound(row,col +1)){
    let piece = this.grid[row][col +1];
    if (piece == null || piece.color == color) return false;
  }

  for (let i = row +2; i < 8; i++){
    let piece = this.grid[row][i];
    if(piece == null) return true;
    if(piece.color == color) return false;
  }
  return false
};

/**
 * check is there is a valid move on the left of the piece @ pos
 */
Board.prototype.checkDown = function (color,row, col) {
  if(this.isInBound(row -1,col)){
    let piece = this.grid[row -1][col];
    if (piece == null || piece.color == color) return false;
  }

  for (let i = col -2; i > -1; i--){
    let piece = this.grid[i][col];
    if(piece == null) return true;
    if(piece.color == color) return false;
  }
  return false
};

/**
 * check if there is a valid move on the left of the piece @ pos
 */
Board.prototype.checkUp = function (color,row, col) {
  if(this.isInBound(row +1,col)){
    let piece = this.grid[row +1][col];
    if (piece == null || piece.color == color) return false;
  }

  for (let i = col +2; i < 8; i++){
    let piece = this.grid[i][col];
    if(piece == null) return true;
    if(piece.color == color) return false;
  }
  return false
};

/**
 * check is there is a valid horizontal move using the piece @pos
 */
Board.prototype.hasValidHorizontalMove = function (color, pos) {
  let row = pos[0];
  let col = pos[1];
  return this.checkRight(color, row, col) ||
         this.checkLeft(color, row, col);
};
/**
 * check is there is a valid horizontal move using the piece @pos
 */
Board.prototype.hasValidVerticalMove = function (color, pos) {
  let row = pos[0];
  let col = pos[1];
  return this.checkUp(color, row, col) ||
         this.checkDown(color, row, col);
};
/**
 * check is there is a valid diagonal move using the piece @pos
 */
Board.prototype.hasValidDiagonalMove = function (color, pos) {

};


/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  let pieces = this.findAll(color);
  let that = this;
  Object.keys(pieces).forEach(function (key) {
    let pos =pieces[key];
    if(that.hasValidDiagonalMove(key.color, pos)
       || that.hasValidHorizontalMove(key.color,pos)
       || that.hasValidVerticalMove(key.color,pos)) return true
  })
  return false;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  let piece = this.getPiece(pos);
  return (piece != null && piece.color == color);
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return this.getPiece(pos) != null;
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  for(let i=0; i < 8; i++){
    for(let j=0; j < 8; j++){
      if(this.grid[i][j] == null) return false;
    }
  }
  return true;
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  return this.isInBound(pos[0], pos[1]);
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

module.exports = Board;
