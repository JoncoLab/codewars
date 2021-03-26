import fs from 'fs'
import readline from 'readline'

interface TestCase {
  input: unknown
  expectedOutput: unknown
}

interface KataFile {
  default: CallableFunction
  testCases: Array<TestCase>
}

enum KataLang {
  JavaScript = 'JavaScript',
  TypeScript = 'TypeScript',
}

interface Kata {
  name: string
  lang: keyof typeof KataLang
}

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

function main(...args: string[]) {
  let kataName: string,
    kataLang: keyof typeof KataLang,
    options: string[] = []

  function getOptionValue(opt: string): string {
    return args[args.indexOf(availableOptions[opt])]
  }

  try {
    if (args.length) {
      if (!args[0].startsWith('--')) {
        kataName = args[0]

        const kata = katas.find(({ name }) => name === kataName)
        kataLang = kata ? kata.lang : KataLang.JavaScript
        options = [...args.slice(1)]

        return runKata(kataName, kataLang, options)
      } else {
        options = args
          .filter(arg => arg.startsWith('--'))
          .map(opt => opt.replace('--', ''))

        if (options.includes(availableOptions.kataName))
          kataName = getOptionValue(availableOptions.kataName)
        else {
          console.log(
            'No additional arguments were passed.\nPlease, select a kata to work on:'
          )
          console.table(katas)

          return consoleStream.question('(index): ', answer => {
            const { name, lang } = katas[parseInt(answer)]
            runKata(name, lang, options)
          })
        }
      }
    }
  } catch (err) {
    console.error(err)
  }
}

main(...process.argv.slice(2))

async function runKata(
  kataName: string,
  kataLang: keyof typeof KataLang,
  options: string[]
) {
  console.log('\n\n------- Codewars Katas by JoncoLab -------\n')
  console.log(`kata name: ${kataName}`)
  console.log(`options: ${options}`)

  try {
    const { default: solve, testCases } = (await import(
      `./katas/${kataName}.${kataLang === 'TypeScript' ? 'ts' : 'js'}`
    )) as KataFile

    solve(testCases[0].input)
  } catch (err) {
    console.error(err)
    console.log(`No kata named "${kataName}" was found`)
  }
}

// TODO: add TypeScript support
// TODO: sriprs for creating katas (folder, index, codewars tests & source code, maybe description.md file)
// TODO: investigate Codewars API docs
// TODO: running a kata by passing it's name as an arg
