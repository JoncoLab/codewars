export const getLastDigit = (x: string, y: string): number => {
  let result = 1
  const numberLastDigit = parseInt(x.substr(-1))
  const powerLastDigits = parseInt(y.substr(-2))

  switch (y) {
    case '0':
      break
    case '1':
      result = numberLastDigit
      break
    default:
      switch (numberLastDigit) {
        case 0:
          result = 0
          break
        case 1:
          break
        case 2:
          switch (powerLastDigits % 4) {
            case 0:
              result = 6
              break
            case 1:
              result = 2
              break
            case 2:
              result = 4
              break
            case 3:
              result = 8
              break
          }
          break
        case 3:
          switch (powerLastDigits % 4) {
            case 0:
              break
            case 1:
              result = 3
              break
            case 2:
              result = 9
              break
            case 3:
              result = 7
              break
          }
          break
        case 4:
          if (powerLastDigits % 2) result = 4
          else result = 6
          break
        case 5:
          result = 5
          break
        case 6:
          result = 6
          break
        case 7:
          switch (powerLastDigits % 4) {
            case 0:
              break
            case 1:
              result = 7
              break
            case 2:
              result = 9
              break
            case 3:
              result = 3
              break
          }
          break
        case 8:
          switch (powerLastDigits % 4) {
            case 0:
              result = 6
              break
            case 1:
              result = 8
              break
            case 2:
              result = 4
              break
            case 3:
              result = 2
              break
          }
          break
        case 9:
          if (powerLastDigits % 2) result = 9
          break
      }
  }

  return result
}
