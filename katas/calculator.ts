const testCases = [
  {
    input: '',
    expectedOutput: '',
  },
]

declare type operadns = string | string[] | number | number[]

declare type CalculatorConstructor = NewableFunction & {
  evaluate(_str: string): number
}

function Calculator(this: CalculatorConstructor): void {
  this.evaluate = (str: string): number => {
    const additors: operadns = str.replace(/\s/g, '').split('+')

    additors.forEach((add, a_index) => {
      const reducers: operadns = add.split('-')

      reducers.forEach((red, r_index) => {
        const multiplicators: operadns = red.split('*')

        multiplicators.forEach((mult, m_index) => {
          const dividers: operadns = mult.split('/')

          if (dividers.length > 1)
            multiplicators[m_index] = dividers.reduce((x, y) =>
              (parseFloat(x) / parseFloat(y)).toString()
            )
        })

        if (multiplicators.length > 1)
          reducers[r_index] = multiplicators.reduce((x, y) =>
            (parseFloat(x) * parseFloat(y)).toString()
          )
        else reducers[r_index] = multiplicators[0]
      })

      if (reducers.length > 1)
        additors[a_index] = reducers.reduce((x, y) =>
          (parseFloat(x) - parseFloat(y)).toString()
        )
      else additors[a_index] = reducers[0]
    })

    return parseFloat(
      additors.reduce((x, y) => (parseFloat(x) + parseFloat(y)).toString())
    )
  }
}

export { testCases }
export default Calculator
