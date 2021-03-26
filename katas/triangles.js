const triangle = row => {
  const colors = ['R', 'G', 'B']
  let result = row.split('')

  console.log(result.join(' '))

  while (result.length > 1) {
    result = new Array(result.length - 1).fill().map((_, i) => {
      const a = result[i]
      const b = result[i + 1]

      return a === b ? a : colors.find(color => a !== color && b !== color)
    })
    console.log(
      new Array(row.length - result.length).fill(' ').join('') +
        result.join(' ')
    )
  }

  return result[0]
}

module.exports = triangle
