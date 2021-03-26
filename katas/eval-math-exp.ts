/**
 * ### Evaluate mathematical expression
 * @param expression - mathematical expression to evaluate
 * @returns result as a string
 */

const evaluate = (expression: string): string => {
  const additors: string[] = expression
    .replace(/\s/g, '') // get rid of whitespaces
    .replace(/--/g, '+') // replace double negative with '+'
    .replace(/\+\+/g, '+') // get rid of double positive as a result of above
    .replace(/\/\+/g, '/') // remove unnecessary '+' operators
    .replace(/\*\+/g, '*') // remove unnecessary '+' operators
    .split('+') // get an array of additors
    .map(add => {
      if (add.includes('*-')) return `-${add.replace(/\*-/g, '*')}`
      // handle multiplying by negative
      else if (add.includes('/-')) return `-${add.replace(/\/-/g, '/')}`
      // handle dividing by negative
      else return add
    })

  additors.forEach((add, a_index) => {
    const reducers: string[] = add.split('-') // get reducers in all additors

    reducers.forEach((red, r_index) => {
      const multiplicators: string[] = red.split('*') // get multiplicators in all reducers

      multiplicators.forEach((mult, m_index) => {
        const dividers: string[] = mult.split('/') // get dividers in each multiplicator

        if (dividers.length > 1)
          // divide...
          multiplicators[m_index] = dividers.reduce((x, y) =>
            ((x === '' ? 1 : parseFloat(x)) / parseFloat(y)).toString()
          )
        else multiplicators[m_index] = dividers[0] // ... or pass value
      })

      if (multiplicators.length > 1)
        // multiply...
        reducers[r_index] = multiplicators.reduce((x, y) =>
          ((x === '' ? 1 : parseFloat(x)) * parseFloat(y)).toString()
        )
      else reducers[r_index] = multiplicators[0] /// ... or pass value
    })

    if (reducers.length > 1)
      // reduce...
      additors[a_index] = reducers.reduce((x, y) =>
        ((x === '' ? 0 : parseFloat(x)) - parseFloat(y)).toString()
      )
    else additors[a_index] = reducers[0] // ... or pass value
  })

  return additors.reduce((x, y) =>
    ((x === '' ? 0 : parseFloat(x)) + (y === '' ? 0 : parseFloat(y))).toString()
  ) // add
}

/**
 * Check if array has nested parentheses in it.
 * @param arr - an array of string characters with parentheses represented as lower dimension arrays.
 * @returns boolean
 */
const hasParentheses = (arr: string[]): boolean =>
  arr.some(char => typeof char !== 'string')

/**
 * ### Break mathematical expression into an array of chars where parentheses represented as lower dimension arrays.
 * @param {string} exp - Mathematical expression to brake into array.
 * @returns multidimensional array.
 */
const nestedParthIntoMultidimArr = (exp: string): string[] => {
  const str = exp.replace(/\s/g, '') // trim whitespaces
  let i = 0

  const addDimension = (): string[] => {
    const arr: Array<string | string[]> = []
    let startIndex = i

    /**
     * Add the next char to the current dimension
     */
    const addChar = (): void => {
      if (i - 1 >= startIndex) {
        arr.push(str.slice(startIndex, i))
      }
    }

    while (i < str.length) {
      const nextChar = str[i++] // get next char

      switch (nextChar) {
        case '(': // if next char opens parenthes start adding into a new dimension
          arr.push(addDimension())
          startIndex = i
          continue
        case ')': // if next char closes parenthes end current dimension
          return arr as string[]
        default:
          // handle routine char by char adding
          addChar()
          startIndex = i
          continue
      }
    }

    addChar()

    return arr as string[]
  }

  return addDimension()
}

/**
 * ### Evaluate parentheses dimension by dimension.
 * @param arr - array of chars where parentheses represented as lower dimension arrays.
 * @returns evaluated array reduced to a string result.
 */
const evalParenthes = (arr: string[]): string => {
  let result: string | string[] = arr

  if (hasParentheses(arr)) {
    // if given array still has nested parentheses...
    const pIndex = arr.findIndex(char => typeof char !== 'string')

    result[pIndex] = evalParenthes((result[pIndex] as unknown) as string[]) // ... evaluate the first occurrence recursively...
    result = evalParenthes(result) // ... and try once more
  } else result = evaluate(arr.join(' '))

  return result
}

/**
 * ### Given a mathematical expression as a string returns the result as a number.
 * @param expression - Number may be both whole numbers and/or decimal numbers. The same goes for the returned result.
 * Supports the following mathematical operators:
    - Multiplication `*`
    - Division `/` (as true division)
    - Addition `+`
    - Subtraction `-`
 *
 * Operators are always evaluated from left-to-right, and * and / must be evaluated before + and -.
 * Supports multiple levels of nested parentheses, ex. `(2 / (2 + 3.33) * 4) - -6`
 * @returns result as a number
 */

export const testCases = [
  { input: '1 + 2 / 8 - 100 * 89364', expectedOutput: -8936398.75 },
]

export default (expression: string): number =>
  parseFloat(
    // get result as a float
    evalParenthes(
      // handle nested parentheses
      nestedParthIntoMultidimArr(
        // break expression into char array
        expression
      )
    )
  )
