describe('Skyscrapers', function () {
  it('can solve 4x4 puzzle 1', function () {
    const clues = [2, 2, 1, 3, 2, 2, 3, 1, 1, 2, 2, 3, 3, 2, 1, 3]
    const expected = [
      [1, 3, 4, 2],
      [4, 2, 1, 3],
      [3, 4, 2, 1],
      [2, 1, 3, 4],
    ]
    const actual = solvePuzzle(clues)
    assert(expected, actual)
  })

  it('can solve 4x4 puzzle 2', function () {
    const clues = [0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0]
    const expected = [
      [2, 1, 4, 3],
      [3, 4, 1, 2],
      [4, 2, 3, 1],
      [1, 3, 2, 4],
    ]
    const actual = solvePuzzle(clues)
    assert(expected, actual)
  })
})

function assert(expected, actual) {
  Test.assertEquals(actual.length, 4)
  for (let i = 0; i < 4; i++) {
    Test.assertEquals(actual[i].toString(), expected[i].toString())
  }
}
