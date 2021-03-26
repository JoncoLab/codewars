let sum = 0

export function add(n: number): ReturnType<typeof _add> {
  function _add(...args: number[]) {
    if (args.length > 0) sum += args[0]

    return sum
  }

  return _add(n)
}
