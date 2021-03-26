import { calc } from '../katas/eval-math-exp'
import { expect } from 'chai'

const tests: [string, number][] = [
  ['1+1', 2],
  ['1 - 1', 0],
  ['1* 1', 1],
  ['1 /1', 1],
  ['-123', -123],
  ['123', 123],
  ['2 /2+3 * 4.75- -6', 21.25],
  ['12* 123', 1476],
  ['2 / (2 + 3) * 4.33 - -6', 7.732],
  ['(2 + (3 / 2 + 4.5) + 2) * 4 - -6', 46],
  ['12/-1', -12],
  ['12* 123/-(-5 + 2)', 492],
  ['(1 - 2) + -(-(-(-4)))', 3],
]

describe('Evaluate math expression', () => {
  tests.forEach(test => {
    const expression = test[0]
    const result = test[1]

    it(`Should evaluate correctly: ${expression} = ${result}`, () => {
      const evalExp = calc(expression)
      expect(evalExp).to.equal(
        result,
        `Expected: ${expression} to equal ${result};\r\nInstead got: ${evalExp}`
      )
    })
  })
})
