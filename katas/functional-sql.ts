// task: https://www.codewars.com/kata/545434090294935e7d0010ab
class Query {
  protected data = []

  protected selectField = undefined
  protected filters = []
  protected groups = []

  protected selectStack = 0
  protected fromStack = 0
  protected orderByStack = 0
  protected groupByStack = 0

  select = (selectField?: (element: unknown) => unknown) => {
    this.selectStack++
    this.selectField = selectField
    return this
  }

  from = (...args: unknown[]) => {
    this.fromStack++
    if (args.length > 0) this.data = args.flat()
    return this
  }

  where = (...args: unknown[]) => {
    if (args.length > 0) args.forEach(arg => this.filters.push(arg))
    return this
  }

  orderBy = (...args: unknown[]) => {
    this.orderByStack++
    console.log(args)
    return this
  }

  groupBy = (...args: unknown[]) => {
    this.groupByStack++
    if (args.length > 0) args.forEach(arg => this.groups.push(arg))
    return this
  }

  having = (...args: unknown[]) => {
    console.log(args)
    return this
  }

  execute = () => {
    if (this.selectStack > 1) throw new Error('Duplicate SELECT')
    if (this.fromStack > 1) throw new Error('Duplicate FROM')
    if (this.orderByStack > 1) throw new Error('Duplicate ORDERBY')
    if (this.groupByStack > 1) throw new Error('Duplicate GROUPBY')

    if (this.filters.length > 0)
      this.filters.forEach(filter => {
        this.data = this.data.filter(filter)
      })

    if (this.groups.length > 0) {
      const groupData = (
        data: unknown[],
        groupFunc: (entry: unknown) => void
      ) => {
        const groups = []

        data
          .map(entry => groupFunc(entry))
          .reduce((a: unknown[], b) => (a.includes(b) ? a : [...a, b]), [])
          .forEach((element: unknown) => groups.push([element, []]))

        data.forEach(entry => {
          entry &&
            groups[groups.findIndex(g => g[0] === groupFunc(entry))][1].push(
              entry
            )
        })

        return groups
      }

      this.data = groupData(this.data, this.groups[0])
    }

    if (this.selectField)
      this.data =
        this.groups.length > 0
          ? this.data.map(group => [group[0], group[1].map(this.selectField)])
          : this.data.map(this.selectField)

    return this.data
  }
}

export const query = (): Query => new Query()
