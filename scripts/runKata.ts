export default async function runKata(
  kataName: string,
  kataLang: KataLang,
  options: string[]
): Promise<void> {
  console.log('\n\n------- Codewars Katas by JoncoLab -------\n')
  console.log(`kata name: ${kataName}`)
  console.log(`options: ${options}`)

  try {
    const { default: solve, testCases } = (await import(
      `../katas/${kataName}.${kataLang === 'TypeScript' ? 'ts' : 'js'}`
    )) as KataFile

    solve(testCases[0].input)
  } catch (err) {
    console.error(err)
    console.log(`No kata named "${kataName}" was found`)
  }
}
