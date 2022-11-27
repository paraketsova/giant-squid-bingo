let drawNumbers = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1];

let boards = [
  [
    [22,13,17,11,0],
    [8,2,23,4,24],
    [21,9,14,16,7],
    [6,10,3,18,5],
    [1,12,20,15,19]
  ],

  [
    [3,15,0,2,22],
    [9,18,13,17,5],
    [19,8,7,25,23],
    [20,11,10,24,4],
    [14,21,16,12,6],
  ],

  [
    [14,21,17,24,4],
    [10,16,15,9,19],
    [18,8,23,26,20],
    [22,11,13,6,5],
    [2,0,12,3,7],
  ],
];

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
