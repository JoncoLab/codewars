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

const vectorLength = 4
let field = Array(vectorLength).fill(Array(vectorLength).fill('-'))

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function solvePuzzle(clues) {
  console.group('Initial data:')
  console.log('Clues: ', clues, '\n')
  renderTable(clues)

  const cluesMap = {
    1: clueIndex => {
      const targetPosition = getVector(clueIndex)[0].pos
      updateField(targetPosition, 4)
    },
    2: clueIndex => {
      const oppositeClue = clues[getOppositeClueIndex(clueIndex)]
      const vector = getVector(clueIndex)

      if (oppositeClue === 1 || vector[3].val === 4)
        updateField(vector[0].pos, 3)

      if (vector[0].val === 1) updateField(vector[1].pos, 4)

      if (vector[2].val === 4 && vector[3].val === 1) {
        updateField(vector[0].pos, 3)
        updateField(vector[1].pos, 2)
      }

      completeVectorWithOneMissing(vector)
    },
    3: clueIndex => {
      const vector = getVector(clueIndex)

      if (vector[2].val === 3 && vector[3].val === 4) {
        updateField(vector[0].pos, 2)
        updateField(vector[1].pos, 1)
      }

      if (vector[0].val === 2 && vector[2].val === 4) {
        updateField(vector[1].pos, 3)
        updateField(vector[3].pos, 1)
      }

      if (vector[2].val === 4 && vector[3].val === 3) {
        updateField(vector[0].pos, 1)
        updateField(vector[1].pos, 2)
      }

      completeVectorWithOneMissing(vector)
    },
  }

  clues.forEach((clue, index) => {
    cluesMap[clue](index)
  })

  clues.forEach((clue, index) => {
    cluesMap[clue](index)
  })

  clues.forEach((clue, index) => {
    cluesMap[clue](index)
  })

  renderTable(clues)
}

export { testCases }
export default solvePuzzle

function renderTable(clues) {
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

function updateField(coordinates, value) {
  field = field.map((row, index) =>
    index === coordinates[0]
      ? row.map((col, index) => (index === coordinates[1] ? value : col))
      : row
  )
}

function getVector(clueIndex) {
  const isVectorHorizontal = Math.floor(clueIndex / vectorLength) % 2
  const isVectorReversed =
    vectorLength <= clueIndex && clueIndex <= 15 - vectorLength

  const rowIdxs = isVectorHorizontal
    ? Array(vectorLength).fill(
        !isVectorReversed
          ? vectorLength - (clueIndex % vectorLength) - 1
          : clueIndex % vectorLength
      )
    : isVectorReversed
    ? [3, 2, 1, 0]
    : [0, 1, 2, 3]

  const colIdxs = isVectorHorizontal
    ? isVectorReversed
      ? [3, 2, 1, 0]
      : [0, 1, 2, 3]
    : Array(vectorLength).fill(
        isVectorReversed
          ? vectorLength - (clueIndex % vectorLength) - 1
          : clueIndex % vectorLength
      )

  return [0, 1, 2, 3].map(n => ({
    pos: [rowIdxs[n], colIdxs[n]],
    val: field[rowIdxs[n]][colIdxs[n]],
  }))
}

function getOppositeClueIndex(clueIndex) {
  const isVectorHorizontal = Math.floor(clueIndex / vectorLength) % 2

  return (
    15 - clueIndex + (isVectorHorizontal ? vectorLength : -1 * vectorLength)
  )
}

function completeVectorWithOneMissing(vector) {
  const values = vector.map(({ val }) => val)
  if (values.filter(v => v !== '-').length === 3)
    updateField(
      vector[values.indexOf('-')].pos,
      [1, 2, 3, 4].filter(n => !values.includes(n))[0]
    )
}

// TODO: Add skipIndexes array
// TODO: Move "1" case from cluesMap into separate function inside forEach
// TODO: Look for new patterns
// TODO: Generalize where possible
// TODO: Add isSolved validator and create loop to iterate through clues until field is solved
