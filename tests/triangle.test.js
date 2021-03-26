import { expect } from 'chai'

import triangle from '../katas/triangles.js'

const basicCases = [
  ['B', 'B'],
  ['GB', 'R'],
  ['RRR', 'R'],
  ['RGBG', 'B'],
  ['RBRGBRB', 'G'],
  ['RBRGBRBGGRRRBGBBBGG', 'G'],
  ['BBBRRRBBB', 'G'],
  ['BRBRRRBRB', 'B'],
]

// const randomTest = powerOf10 =>
//   new Array(10 ** powerOf10)
//     .fill(null)
//     .map(() => ["R", "G", "B"][Math.floor(Math.random() * 3)])
//     .join("")

// const randomCases = [4, 3]
//   .map(power => randomTest(power))
//   .map(test => [test, triangle(test)])

describe('Insane Coloured Triangles', () => {
  //   randomCases.forEach(test =>
  //     it(`Testing length of ${test[0].length}`, () =>
  //       expect(triangle(test[0])).to.equal(test[1], "Error ~>"))
  //   )

  basicCases.forEach(test =>
    it(`Testing ${test[0]}`, () =>
      expect(triangle(test[0])).to.equal(
        test[1],
        `Expected: ${test[0]} to equal ${test[1]};`
      ))
  )
})
