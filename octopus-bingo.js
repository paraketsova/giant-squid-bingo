// PARSING

const fs = require('fs');
const data = fs.readFileSync('input-test.txt', { encoding: 'utf8' });

const chunks = data.trim().split(/\r?\n\r?\n/);

const drawNumbers = chunks[0].split(",").map(el => Number(el));

const boards = chunks.slice(1)
  .map(board => board.split(/\r?\n/)
    .map(row => row.split(/\s+/g)
      .map(num => +(num))));

console.log(drawNumbers);
console.log(boards);

// PROCESSING

const getWorstBoard = (boards, turns) => {
  for (const t of turns) {
    if (boards.length > 1) {
      boards = boards.filter((board) => {
        updateBoard(board, t);
        return !checkIfBingo(board);
      });
    } else {
      const lastBoard = boards[0];
      updateBoard(lastBoard, t);
      if (checkIfBingo(lastBoard)) {
        return getScore(lastBoard, t);
      }
    }
  }
};

const updateBoard = (board, t) => {
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (board[y][x] === t) {
        board[y][x] = true;
        return;
      }
    }
  }
};

const checkIfBingo = (board) => {
  for (let y = 0; y < 5; y++) {
    let counter = 0;

    for (let x = 0; x < 5; x++) {
      if (board[y][x] === true) {
        counter++;
      }
    }

    if (counter === 5) {
      return true;
    }
  }

  for (let x = 0; x < 5; x++) {
    let counter = 0;

    for (let y = 0; y < 5; y++) {
      if (board[y][x] === true) {
        counter++;
      }
    }

    if (counter === 5) {
      return true;
    }
  }

  return false;
};

const getScore = (lastBoard, t) =>
  t * lastBoard
    .flat()
    .filter(el => el !== true)
    .reduce((acc, n) => acc + n, 0);

console.log(
  getWorstBoard(boards, drawNumbers)
);
