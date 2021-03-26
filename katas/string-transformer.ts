export const stringTransformer = (str: string): string =>
  str
    .split(' ')
    .reverse()
    .join(' ')
    .split('')
    .map(char =>
      char.toLowerCase() === char ? char.toUpperCase() : char.toLowerCase()
    )
    .join('')
