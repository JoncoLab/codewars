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

const testCases = [
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

// If the index of the clue is 5 then we're working with the right edge of the matrix
// thus on this side it's true index is 1
function getCluesEdgeIndex(clueIndex) {
  return clueIndex % 4
}

function getVectorDirection(vectorIndex) {
  return vectorIndex % 2
}

function reverseIndex(index, vectorLength) {
  return Math.abs(index - (vectorLength - 1))
}

function getMatrixCoordinatesFormulas(trueIndex, vectorIndex, vectorLength) {
  const formulas = {
    0: [vectorIndex, trueIndex],
    1: [trueIndex, vectorLength - 1],
    2: [vectorLength - 1, reverseIndex(trueIndex, vectorLength)],
    3: [reverseIndex(trueIndex, vectorLength), 0],
  }

  return formulas
}

function getMatrixCoordinates(clueIndex, vectorIndex, vectorLength) {
  const _vectorDirection = getVectorDirection(vectorIndex)
  const trueIndex = getCluesEdgeIndex(clueIndex)

  return getMatrixCoordinatesFormulas(trueIndex, vectorIndex, vectorLength)[
    vectorIndex
  ]
}

// WIP, but i think this functionality is redundant so I'm not gonna finish that
function _getOppositeEdgeCoordinates(
  clueIndex,
  cluesLength,
  vectorIndex,
  vectorLength
) {
  const oppositeClueIndex = cluesLength - clueIndex - 1
  const oppositeVectorIndex = Math.floor(oppositeClueIndex / vectorLength)
  const trueIndex = getCluesEdgeIndex(clueIndex)
  const oppositeTrueIndex = getCluesEdgeIndex(oppositeClueIndex)
  const reversedOppositeTrueIndex = reverseIndex(
    oppositeTrueIndex,
    vectorLength
  ) // yeah, I know...
  const vectorDirection = getVectorDirection(vectorIndex)

  if (!vectorDirection) {
    return [oppositeVectorIndex, trueIndex]
  }

  return [reversedOppositeTrueIndex]
}

// give it a coordinates where to start from,
// tell what direction the vector is facing and say how far you need to go
//                         [ 3, 2 ]           0              3
function vectorNavigation(coordinates, vectorDirection, targetIndex = null) {
  const targetCoordinates = [...coordinates]
  targetCoordinates[vectorDirection] = Math.abs(
    targetCoordinates[vectorDirection] -
      (targetIndex ? targetIndex : targetCoordinates[vectorDirection])
  )

  return targetCoordinates
}

function _vectorProgress(
  field,
  coordinates,
  vectorDirection,
  vectorLength,
  progress = []
) {
  if (progress.length === vectorLength) {
    const validProgress = progress.filter(n => Number.isInteger(n)).length
    return {
      vector: {
        start: coordinates,
        direction: vectorDirection,
      },
      data: {
        total: validProgress.length,
        missing: [...new Set([...validProgress, [1, 2, 3, 4]])],
      },
    }
  }

  const nextProgress = [...progress]
  const [_x, _y] = vectorNavigation(coordinates, vectorDirection)
  nextProgress.push()
}

// const navigationTest = vectorNavigation([0, 3], 1, 3)
// console.log(navigationTest)

function renderTable(clues, field) {
  console.log('Field:')
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
  console.log('  ', [11, 10, 9, 8].map(n => clues[n]).join('  '))
}

// TODO: create function* cycleThroughClues() generator and yield on patterns

/**
 * @param {number[]} clues
 * @returns void
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function solvePuzzle(clues) {
  const vectorLength = 4
  let field = Array(vectorLength).fill(Array(vectorLength).fill('-'))

  console.group('Initial data:')
  console.log('Clues: ', clues, '\n')
  renderTable(clues, field)

  //? First step: check if there are `1` among clues
  clues.forEach((clue, clueIndex) => {
    const vectorIndex = Math.floor(clueIndex / vectorLength)
    const [outterIdx, innerIdx] = getMatrixCoordinates(
      clueIndex,
      vectorIndex,
      vectorLength
    )

    switch (clue) {
      case 1:
        console.log(
          `\n===>> set cell (r${outterIdx}:c${innerIdx}) to a value 4`
        )

        field = field.map((row, index) =>
          index !== outterIdx
            ? row
            : row.map((cell, index) => (index !== innerIdx ? cell : 4))
        )

        renderTable(clues, field)
        clues[clueIndex] = '-'
        break
      case 2:
      // TODO: create a function to get vector in [clue, [vector values: [coordinates], value], clue] format
      case 3:
      case 4:
      default:
        console.log('===>> no pattern')
    }
  })
}

export { testCases }
export default solvePuzzle

function _getVector(clueIndex) {
  const vectorLength = 4
  const vectorDirection = Math.floor(clueIndex / vectorLength) % 2
  const isVectorReversed = vectorLength <= clueIndex <= 15 - vectorLength
  const verticalIdxs = isVectorReversed ? [3, 2, 1, 0] : [0, 1, 2, 3]
  const horizontalIdxs = Array(4).fill(clueIndex)
  const oppositeClueIndex =
    15 - clueIndex + (vectorDirection ? vectorLength : -1 * vectorLength)
  const row = vectorDirection ? verticalIdxs : horizontalIdxs
  const col = vectorDirection ? horizontalIdxs : verticalIdxs

  return [
    clues[clueIndex],
    [0, 1, 2, 3].map(n => [row[n], col[n]], field[row[n]][col[n]]),
    clues[oppositeClueIndex],
  ]
}
