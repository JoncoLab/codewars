export class G964 {
  public static stat = (strg: string): string => {
    if (!Boolean(strg)) return ''

    let range = 'Range: '
    let average = 'Average: '
    let median = 'Median: '

    const getSeconds = (result: string): number => {
      const timeParts = result.split('|')

      const h_s = parseInt(timeParts[0]) * 60 * 60
      const m_s = parseInt(timeParts[1]) * 60
      const s = parseInt(timeParts[2])

      return h_s + m_s + s
    }

    const formatSeconds = (seconds: number): string => {
      let hh: number | string = Math.floor(seconds / 60 / 60)
      let mm: number | string = Math.floor((seconds - hh * 60 * 60) / 60)
      let ss: number | string = Math.floor(seconds - hh * 60 * 60 - mm * 60)

      if (hh.toString().length < 2) hh = `0${hh}`
      if (mm.toString().length < 2) mm = `0${mm}`
      if (ss.toString().length < 2) ss = `0${ss}`

      return `${hh}|${mm}|${ss}`
    }

    const data = strg
      .split(', ')
      .map(res => getSeconds(res))
      .sort((a, b) => a - b)

    range += formatSeconds(data[data.length - 1] - data[0])
    average += formatSeconds(data.reduce((a, b) => a + b) / data.length)
    median += formatSeconds(
      data.length % 2
        ? data[Math.floor(data.length / 2)]
        : (data[Math.floor(data.length / 2) - 1] +
            data[Math.floor(data.length / 2)]) /
            2
    )

    return [range, average, median].join(' ')
  }
}
