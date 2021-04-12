/*
  * In a grid of 4 by 4 squares you want to place a skyscraper in each square with only some clues:

  * The height of the skyscrapers is between 1 and 4
  * No two skyscrapers in a row or column may have the same number of floors
  * A clue is the number of skyscrapers that you can see in a row or column from the outside
  * Higher skyscrapers block the view of lower skyscrapers located behind them

  * Can you write a program that can solve this puzzle?

  * Finish:
  * function solvePuzzle(clues)
  * Pass the clues in an array of 16 items. This array contains the clues around the clock, index:

  !  	  0	  1	  2   3
  ! 15	  	  	   	   4
  ! 14	  	  	  	   5
  ! 13	  	  	  	   6
  ! 12	  	  	  	   7
  !  	  11	10	9	  8

  * If no clue is available, add value `0`
  * Each puzzle has only one possible solution
  * `solvePuzzle()` returns matrix `int[][]`. The first indexer is for the row, the second indexer for the column. (Python: returns 4-tuple of 4-tuples, Ruby: 4-Array of 4-Arrays)

  * If you finished this kata you can use your solution as a base for the more challenging kata: 6 By 6 Skyscrapers
  ! Similar katas collection
*/

export const testCases = [
  {
    input: [2, 2, 1, 3, 2, 2, 3, 1, 1, 2, 2, 3, 3, 2, 1, 3],
    expectedOutput: [
      [1, 3, 4, 2],
      [4, 2, 1, 3],
      [3, 4, 2, 1],
      [2, 1, 3, 4],
    ],
  },
  {
    input: [0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0],
    expectedOutput: [
      [2, 1, 4, 3],
      [3, 4, 1, 2],
      [4, 2, 3, 1],
      [1, 3, 2, 5],
    ],
  },
]

/**
 * @function solvePuzzle
 * @param {string[]} clues - Pass the clues in an array of 16 items. This array contains the clues around the clock. If no clue is available, add value 0.
 * @returns {number[][]} The first indexer is for the row, the second indexer for the column.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

// If the index of the clue is 5 then we're wroking with the right edge of the matrix
// thus on this side it's true index is 1
function getCluesEdgeIndex(clueIdx) {
  return clueIdx % 4;
}

function getVectorDirection(clueIdx) {
  return Math.floor(clueIdx / 4) % 2;
}

function getTopLevelMatrixIdx(clueIdx) {
  const vectorDirection = getVectorDirection(clueIdx);

  if (!!vectorDirection) {
    if (clueIdx > 7) { // on the left edge
      return Math.abs(getCluesEdgeIndex(clueIdx) - 3);  
    }
    return getCluesEdgeIndex(clueIdx); // on the right edge
  }

  if (clueIdx > 3) { // on the bottom edge
    return 3;
  }

  return 0; // on the top edge
}

function matrixNavigation(clueIdx) {
  const vectorDirection = getVectorDirection(clueIdx)
}

export default function solvePuzzle(clues) {
  const field = Array(4).fill(Array(4).fill('-'))

  console.group('Initial data:')
  console.log('Clues: ', clues)
  console.log('\r\nField:')
  console.log('  ', [0, 1, 2, 3].map(n => clues[n]).join('  '))
  field.forEach((row, index) =>
    console.log(
      String(clues[15 - index]),
      '',
      row.join('  '),
      '',
      String(clues[4 + index])
    )
  )
  console.log('  ', [8, 9, 10, 11].map(n => clues[n]).join('  '))

  //? First step: check if there are `1` among clues
  clues.forEach((clue, idx) => {
    // console.log("Clue row/col index: ", getCluesFaceIndex(idx))
    console.log("Top matrix edge index: ", getTopLevelMatrixIdx(idx))
  })
}
