declare interface TestCase {
  input: unknown
  expectedOutput: unknown
}

declare interface KataFile {
  default: CallableFunction
  testCases: Array<TestCase>
}

declare type KataLang = 'JavaScript' | 'TypeScript'

declare interface Kata {
  name: string
  lang: KataLang
}
