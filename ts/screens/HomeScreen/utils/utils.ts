import {BoardType} from '../../../types/types';
import {ROWS, COLS} from '../../../constants/contants';

const checkVertical = (board: BoardType) => {
  // Check only if row is 3 or greater
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board && board[r][c]) {
        if (board[r][c] === board[r - 1][c] && board[r][c] === board[r - 2][c] && board[r][c] === board[r - 3][c]) {
          return board[r][c];
        }
      }
    }
  }
};

const checkDiagonalRight = (board: BoardType) => {
  // Check only if row is 3 or greater AND column is 3 or less
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board && board[r][c]) {
        if (board[r][c] === board[r - 1][c + 1] && board[r][c] === board[r - 2][c + 2] && board[r][c] === board[r - 3][c + 3]) {
          return board[r][c];
        }
      }
    }
  }
};

const checkDiagonalLeft = (board: BoardType) => {
  // Check only if row is 3 or greater AND column is 3 or greater
  for (let r = 3; r < ROWS; r++) {
    for (let c = 3; c < COLS; c++) {
      if (board && board[r][c]) {
        if (board[r][c] === board[r - 1][c - 1] && board[r][c] === board[r - 2][c - 2] && board[r][c] === board[r - 3][c - 3]) {
          return board[r][c];
        }
      }
    }
  }
};

const checkHorizontal = (board: BoardType) => {
  // Check only if column is 3 or less
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board && board[r][c]) {
        if (board[r][c] === board[r][c + 1] && board[r][c] === board[r][c + 2] && board[r][c] === board[r][c + 3]) {
          return board[r][c];
        }
      }
    }
  }
};

const checkDraw = (board: BoardType) => {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board && board[r][c] === '') {
        return false;
      }
    }
  }
  return 'drow';
};

export const checkGameStatus = (board: BoardType) => {
  return checkVertical(board) || checkDiagonalRight(board) || checkDiagonalLeft(board) || checkHorizontal(board) || checkDraw(board);
};
