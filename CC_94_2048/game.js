function operate(row) {
  row = slide(row);
  row = combine(row);
  row = slide(row);
  return row;
}

// making new array
function slide(row) {
  let arr = row.filter(function(val){return val});
  let missing = 4 - arr.length;
  // let zeros = Array(missing).fill(0);
  let zeros = []; for(let i = 0; i < missing; i++) {zeros[i] = 0;}
  console.log(zeros)
  arr = zeros.concat(arr);
  return arr;
}

// operating on array itself
function combine(row) {
  for (let i = 3; i >= 1; i--) {
    let a = row[i];
    let b = row[i - 1];
    if (a == b) {
      row[i] = a + b;
      score += row[i];
      row[i - 1] = 0;
    }
  }
  return row;
}

function isGameWon() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 2048) {
        return true;
      }
    }
  }
  return false;
}


function isGameOver() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 0) {
        return false;
      }
      if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
        return false;
      }
      if (j !== 3 && grid[i][j] === grid[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
}
