export const sortTheInnerContent = (words: string): string =>
  words
    .split(' ')
    .map(word =>
      word.replace(new RegExp(word.charAt(0), 'g'), '').length === 0
        ? word.charAt(0)
        : `${word.charAt(0)}${word
            .substring(1, word.length - 1)
            .split('')
            .sort()
            .reverse()
            .join('')}${word.charAt(word.length - 1)}`
    )
    .join(' ')
