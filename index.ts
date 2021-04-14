import fs from 'fs'
import readline from 'readline'
import runKata from './scripts/runKata'

const KataLang = {
  JavaScript: 'JavaScript',
  TypeScript: 'TypeScript',
} as const

const consoleStream = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const opts = ['test', 'kataName']
const availableOptions = Object.fromEntries(opts.map(opt => [opt, `--${opt}`]))
const kataFiles = fs
  .readdirSync('./katas')
  .filter(kata => !kata.endsWith('d.ts'))
const katas: Array<Kata> = kataFiles.map(kata => {
  const ext = kata.slice(-2)

  return {
    name: kata.replace(/\.(js|ts)/, ''),
    lang: ext === 'ts' ? KataLang.TypeScript : KataLang.JavaScript,
  }
})

function main(...args: string[]): void | Promise<void> {
  let kataName: string,
    kataLang: keyof typeof KataLang,
    options: string[] = []

  const getOptionValue = (opt: string): string =>
    args[args.indexOf(availableOptions[opt]) + 2]

  try {
    if (!args.length) return promptSelectKata()

    if (args[0].startsWith('--')) {
      kataName = getOptionValue(availableOptions.kataName)
      options = args.filter(arg => arg.startsWith('--'))

      if (!options.includes(availableOptions.kataName))
        return promptSelectKata(options)
    } else {
      kataName = args[0]
      options = [...args.slice(1)]
    }

    const kata = katas.find(({ name }) => name === kataName)
    kataLang = kata ? kata.lang : KataLang.JavaScript

    return runKata(kataName, kataLang, options)
  } catch (err) {
    console.error(err)
  }
}

main(...process.argv.slice(2))

function promptSelectKata(options: string[] = []) {
  console.log('No kata name were passed.\nPlease, select a kata to work on:')
  console.table(katas)

  return consoleStream.question('(index): ', answer => {
    const { name, lang } = katas[parseInt(answer)]
    runKata(name, lang, options)
  })
}

// TODO: sriprs for creating katas (folder, index, codewars tests & source code, maybe description.md file)
// TODO: investigate Codewars API docs
