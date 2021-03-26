import { query } from '../katas/functional-sql'
import { expect } from 'chai'

describe('SQL tests', function () {
  it('Basic SELECT tests', () => {
    const numbers = [1, 2, 3]
    expect(query().select().from(numbers).execute()).to.deep.equal(numbers)
    expect(query().select().execute()).to.deep.equal(
      [],
      'No FROM clause produces empty array'
    )
    expect(query().from(numbers).execute()).to.deep.equal(
      numbers,
      'SELECT can be omitted'
    )
    expect(query().execute()).to.deep.equal([])
    expect(query().from(numbers).select().execute()).to.deep.equal(
      numbers,
      'The order does not matter'
    )
  })

  it('Basic SELECT and WHERE over objects', () => {
    const persons = [
      {
        name: 'Peter',
        profession: 'teacher',
        age: 20,
        maritalStatus: 'married',
      },
      {
        name: 'Michael',
        profession: 'teacher',
        age: 50,
        maritalStatus: 'single',
      },
      {
        name: 'Peter',
        profession: 'teacher',
        age: 20,
        maritalStatus: 'married',
      },
      {
        name: 'Anna',
        profession: 'scientific',
        age: 20,
        maritalStatus: 'married',
      },
      {
        name: 'Rose',
        profession: 'scientific',
        age: 50,
        maritalStatus: 'married',
      },
      {
        name: 'Anna',
        profession: 'scientific',
        age: 20,
        maritalStatus: 'single',
      },
      {
        name: 'Anna',
        profession: 'politician',
        age: 50,
        maritalStatus: 'married',
      },
    ]

    expect(query().select().from(persons).execute()).to.deep.equal(persons)

    function profession(person: Record<string, unknown>) {
      return person.profession
    }

    // SELECT profession FROM persons
    expect(query().select(profession).from(persons).execute()).to.deep.equal([
      'teacher',
      'teacher',
      'teacher',
      'scientific',
      'scientific',
      'scientific',
      'politician',
    ])
    expect(query().select(profession).execute()).to.deep.equal(
      [],
      'No FROM clause produces empty array'
    )

    function isTeacher(person: Record<string, unknown>) {
      return person.profession === 'teacher'
    }

    // SELECT profession FROM persons WHERE profession="teacher"
    expect(
      query().select(profession).from(persons).where(isTeacher).execute()
    ).to.deep.equal(['teacher', 'teacher', 'teacher'])

    // SELECT * FROM persons WHERE profession="teacher"
    expect(query().from(persons).where(isTeacher).execute()).to.deep.equal(
      persons.slice(0, 3)
    )

    function name(person: Record<string, unknown>) {
      return person.name
    }

    // SELECT name FROM persons WHERE profession="teacher"
    expect(
      query().select(name).from(persons).where(isTeacher).execute()
    ).to.deep.equal(['Peter', 'Michael', 'Peter'])
    expect(
      query().where(isTeacher).from(persons).select(name).execute()
    ).to.deep.equal(['Peter', 'Michael', 'Peter'])
  })

  it('GROUP BY tests', () => {
    const persons = [
      {
        name: 'Peter',
        profession: 'teacher',
        age: 20,
        maritalStatus: 'married',
      },
      {
        name: 'Michael',
        profession: 'teacher',
        age: 50,
        maritalStatus: 'single',
      },
      {
        name: 'Peter',
        profession: 'teacher',
        age: 20,
        maritalStatus: 'married',
      },
      {
        name: 'Anna',
        profession: 'scientific',
        age: 20,
        maritalStatus: 'married',
      },
      {
        name: 'Rose',
        profession: 'scientific',
        age: 50,
        maritalStatus: 'married',
      },
      {
        name: 'Anna',
        profession: 'scientific',
        age: 20,
        maritalStatus: 'single',
      },
      {
        name: 'Anna',
        profession: 'politician',
        age: 50,
        maritalStatus: 'married',
      },
    ]

    function profession(person: Record<string, unknown>) {
      return person.profession
    }

    // SELECT * FROM persons GROUPBY profession <- Bad in SQL but possible in JavaScript
    expect(
      query().select().from(persons).groupBy(profession).execute()
    ).to.deep.equal([
      [
        'teacher',
        [
          {
            name: 'Peter',
            profession: 'teacher',
            age: 20,
            maritalStatus: 'married',
          },
          {
            name: 'Michael',
            profession: 'teacher',
            age: 50,
            maritalStatus: 'single',
          },
          {
            name: 'Peter',
            profession: 'teacher',
            age: 20,
            maritalStatus: 'married',
          },
        ],
      ],
      [
        'scientific',
        [
          {
            name: 'Anna',
            profession: 'scientific',
            age: 20,
            maritalStatus: 'married',
          },
          {
            name: 'Rose',
            profession: 'scientific',
            age: 50,
            maritalStatus: 'married',
          },
          {
            name: 'Anna',
            profession: 'scientific',
            age: 20,
            maritalStatus: 'single',
          },
        ],
      ],
      [
        'politician',
        [
          {
            name: 'Anna',
            profession: 'politician',
            age: 50,
            maritalStatus: 'married',
          },
        ],
      ],
    ])

    function isTeacher(person: Record<string, unknown>) {
      return person.profession === 'teacher'
    }

    // SELECT * FROM persons WHERE profession='teacher' GROUPBY profession
    expect(
      query()
        .select()
        .from(persons)
        .where(isTeacher)
        .groupBy(profession)
        .execute()
    ).to.deep.equal([
      [
        'teacher',
        [
          {
            name: 'Peter',
            profession: 'teacher',
            age: 20,
            maritalStatus: 'married',
          },
          {
            name: 'Michael',
            profession: 'teacher',
            age: 50,
            maritalStatus: 'single',
          },
          {
            name: 'Peter',
            profession: 'teacher',
            age: 20,
            maritalStatus: 'married',
          },
        ],
      ],
    ])

    function professionGroup(group: unknown) {
      return group[0]
    }

    // SELECT profession FROM persons GROUPBY profession
    expect(
      query()
        .select(professionGroup)
        .from(persons)
        .groupBy(profession)
        .execute()
    ).to.deep.equal(['teacher', 'scientific', 'politician'])

    function name(person: Record<string, unknown>) {
      return person.name
    }

    // SELECT * FROM persons WHERE profession='teacher' GROUPBY profession, name
    expect(
      query().select().from(persons).groupBy(profession, name).execute()
    ).to.deep.equal([
      [
        'teacher',
        [
          [
            'Peter',
            [
              {
                name: 'Peter',
                profession: 'teacher',
                age: 20,
                maritalStatus: 'married',
              },
              {
                name: 'Peter',
                profession: 'teacher',
                age: 20,
                maritalStatus: 'married',
              },
            ],
          ],
          [
            'Michael',
            [
              {
                name: 'Michael',
                profession: 'teacher',
                age: 50,
                maritalStatus: 'single',
              },
            ],
          ],
        ],
      ],
      [
        'scientific',
        [
          [
            'Anna',
            [
              {
                name: 'Anna',
                profession: 'scientific',
                age: 20,
                maritalStatus: 'married',
              },
              {
                name: 'Anna',
                profession: 'scientific',
                age: 20,
                maritalStatus: 'single',
              },
            ],
          ],
          [
            'Rose',
            [
              {
                name: 'Rose',
                profession: 'scientific',
                age: 50,
                maritalStatus: 'married',
              },
            ],
          ],
        ],
      ],
      [
        'politician',
        [
          [
            'Anna',
            [
              {
                name: 'Anna',
                profession: 'politician',
                age: 50,
                maritalStatus: 'married',
              },
            ],
          ],
        ],
      ],
    ])

    function age(person: Record<string, unknown>) {
      return person.age
    }

    function maritalStatus(person: Record<string, unknown>) {
      return person.maritalStatus
    }

    // SELECT * FROM persons WHERE profession='teacher' GROUPBY profession, name, age
    expect(
      query()
        .select()
        .from(persons)
        .groupBy(profession, name, age, maritalStatus)
        .execute()
    ).to.deep.equal([
      [
        'teacher',
        [
          [
            'Peter',
            [
              [
                20,
                [
                  [
                    'married',
                    [
                      {
                        name: 'Peter',
                        profession: 'teacher',
                        age: 20,
                        maritalStatus: 'married',
                      },
                      {
                        name: 'Peter',
                        profession: 'teacher',
                        age: 20,
                        maritalStatus: 'married',
                      },
                    ],
                  ],
                ],
              ],
            ],
          ],
          [
            'Michael',
            [
              [
                50,
                [
                  [
                    'single',
                    [
                      {
                        name: 'Michael',
                        profession: 'teacher',
                        age: 50,
                        maritalStatus: 'single',
                      },
                    ],
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
      [
        'scientific',
        [
          [
            'Anna',
            [
              [
                20,
                [
                  [
                    'married',
                    [
                      {
                        name: 'Anna',
                        profession: 'scientific',
                        age: 20,
                        maritalStatus: 'married',
                      },
                    ],
                  ],
                  [
                    'single',
                    [
                      {
                        name: 'Anna',
                        profession: 'scientific',
                        age: 20,
                        maritalStatus: 'single',
                      },
                    ],
                  ],
                ],
              ],
            ],
          ],
          [
            'Rose',
            [
              [
                50,
                [
                  [
                    'married',
                    [
                      {
                        name: 'Rose',
                        profession: 'scientific',
                        age: 50,
                        maritalStatus: 'married',
                      },
                    ],
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
      [
        'politician',
        [
          [
            'Anna',
            [
              [
                50,
                [
                  [
                    'married',
                    [
                      {
                        name: 'Anna',
                        profession: 'politician',
                        age: 50,
                        maritalStatus: 'married',
                      },
                    ],
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
    ])

    function professionCount(group: unknown) {
      return [group[0], group[1].length]
    }

    // SELECT profession, count(profession) FROM persons GROUPBY profession
    expect(
      query()
        .select(professionCount)
        .from(persons)
        .groupBy(profession)
        .execute()
    ).to.deep.equal([
      ['teacher', 3],
      ['scientific', 3],
      ['politician', 1],
    ])

    function naturalCompare(value1: unknown, value2: unknown) {
      if (value1 < value2) {
        return -1
      } else if (value1 > value2) {
        return 1
      } else {
        return 0
      }
    }

    // SELECT profession, count(profession) FROM persons GROUPBY profession ORDER BY profession
    expect(
      query()
        .select(professionCount)
        .from(persons)
        .groupBy(profession)
        .orderBy(naturalCompare)
        .execute()
    ).to.deep.equal([
      ['politician', 1],
      ['scientific', 3],
      ['teacher', 3],
    ])
  })

  it('Number tests', () => {
    function isEven(number: number) {
      return number % 2 === 0
    }

    function parity(number: number) {
      return isEven(number) ? 'even' : 'odd'
    }

    function isPrime(number: number) {
      if (number < 2) {
        return false
      }
      let divisor = 2
      for (; number % divisor !== 0; divisor++);
      return divisor === number
    }

    function prime(number: number) {
      return isPrime(number) ? 'prime' : 'divisible'
    }

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    // SELECT * FROM numbers
    expect(query().select().from(numbers).execute()).to.deep.equal(numbers)

    // SELECT * FROM numbers GROUP BY parity
    expect(
      query().select().from(numbers).groupBy(parity).execute()
    ).to.deep.equal([
      ['odd', [1, 3, 5, 7, 9]],
      ['even', [2, 4, 6, 8]],
    ])

    // SELECT * FROM numbers GROUP BY parity, isPrime
    expect(
      query().select().from(numbers).groupBy(parity, prime).execute()
    ).to.deep.equal([
      [
        'odd',
        [
          ['divisible', [1, 9]],
          ['prime', [3, 5, 7]],
        ],
      ],
      [
        'even',
        [
          ['prime', [2]],
          ['divisible', [4, 6, 8]],
        ],
      ],
    ])

    function odd(group: unknown) {
      return group[0] === 'odd'
    }

    // SELECT * FROM numbers GROUP BY parity HAVING
    expect(
      query().select().from(numbers).groupBy(parity).having(odd).execute()
    ).to.deep.equal([['odd', [1, 3, 5, 7, 9]]])

    function descendentCompare(number1: number, number2: number) {
      return number2 - number1
    }

    // SELECT * FROM numbers ORDER BY value DESC
    expect(
      query().select().from(numbers).orderBy(descendentCompare).execute()
    ).to.deep.equal([9, 8, 7, 6, 5, 4, 3, 2, 1])

    function lessThan3(number: number) {
      return number < 3
    }

    function greaterThan4(number: number) {
      return number > 4
    }

    // SELECT * FROM number WHERE number < 3 OR number > 4
    expect(
      query().select().from(numbers).where(lessThan3, greaterThan4).execute()
    ).to.deep.equal([1, 2, 5, 6, 7, 8, 9])
  })

  it('Frequency tests', () => {
    const persons = [
      ['Peter', 3],
      ['Anna', 4],
      ['Peter', 7],
      ['Michael', 10],
    ]

    function nameGrouping(person: unknown) {
      return person[0]
    }

    function sumValues(value: unknown) {
      return [
        value[0],
        value[1].reduce(function (result: unknown, person: unknown) {
          return result + person[1]
        }, 0),
      ]
    }

    function naturalCompare(value1: unknown, value2: unknown) {
      if (value1 < value2) {
        return -1
      } else if (value1 > value2) {
        return 1
      } else {
        return 0
      }
    }

    // SELECT name, sum(value) FROM persons ORDER BY naturalCompare GROUP BY nameGrouping
    expect(
      query()
        .select(sumValues)
        .from(persons)
        .orderBy(naturalCompare)
        .groupBy(nameGrouping)
        .execute()
    ).to.deep.equal([
      ['Anna', 4],
      ['Michael', 10],
      ['Peter', 10],
    ])

    const numbers = [1, 2, 1, 3, 5, 6, 1, 2, 5, 6]

    function id(value: unknown) {
      return value
    }

    function frequency(group: unknown) {
      return {
        value: group[0],
        frequency: group[1].length,
      }
    }

    // SELECT number, count(number) FROM numbers GROUP BY number
    expect(
      query().select(frequency).from(numbers).groupBy(id).execute()
    ).to.deep.equal([
      {
        value: 1,
        frequency: 3,
      },
      {
        value: 2,
        frequency: 2,
      },
      {
        value: 3,
        frequency: 1,
      },
      {
        value: 5,
        frequency: 2,
      },
      {
        value: 6,
        frequency: 2,
      },
    ])

    function greatThan1(group: unknown) {
      return group[1].length > 1
    }

    function isPair(group: unknown) {
      return group[0] % 2 === 0
    }

    // SELECT number, count(number) FROM numbers GROUP BY number HAVING count(number) > 1 AND isPair(number)
    expect(
      query()
        .select(frequency)
        .from(numbers)
        .groupBy(id)
        .having(greatThan1)
        .having(isPair)
        .execute()
    ).to.deep.equal([
      {
        value: 2,
        frequency: 2,
      },
      {
        value: 6,
        frequency: 2,
      },
    ])
  })

  it('Join tests', () => {
    const teachers = [
      {
        teacherId: '1',
        teacherName: 'Peter',
      },
      {
        teacherId: '2',
        teacherName: 'Anna',
      },
    ]

    const students = [
      {
        studentName: 'Michael',
        tutor: '1',
      },
      {
        studentName: 'Rose',
        tutor: '2',
      },
    ]

    function teacherJoin(join: unknown) {
      return join[0].teacherId === join[1].tutor
    }

    function student(join: unknown) {
      return {
        studentName: join[1].studentName,
        teacherName: join[0].teacherName,
      }
    }

    // SELECT studentName, teacherName FROM teachers, students WHERE teachers.teacherId = students.tutor
    expect(
      query()
        .select(student)
        .from(teachers, students)
        .where(teacherJoin)
        .execute()
    ).to.deep.equal([
      {
        studentName: 'Michael',
        teacherName: 'Peter',
      },
      {
        studentName: 'Rose',
        teacherName: 'Anna',
      },
    ])

    const numbers1 = [1, 2]
    const numbers2 = [4, 5]

    expect(query().select().from(numbers1, numbers2).execute()).to.deep.equal([
      [1, 4],
      [1, 5],
      [2, 4],
      [2, 5],
    ])

    function tutor1(join: unknown) {
      return join[1].tutor === '1'
    }

    // SELECT studentName, teacherName FROM teachers, students WHERE teachers.teacherId = students.tutor AND tutor = 1
    expect(
      query()
        .select(student)
        .from(teachers, students)
        .where(teacherJoin)
        .where(tutor1)
        .execute()
    ).to.deep.equal([
      {
        studentName: 'Michael',
        teacherName: 'Peter',
      },
    ])
    expect(
      query()
        .where(teacherJoin)
        .select(student)
        .where(tutor1)
        .from(teachers, students)
        .execute()
    ).to.deep.equal([
      {
        studentName: 'Michael',
        teacherName: 'Peter',
      },
    ])
  })

  it('Duplication exception tests', () => {
    function checkError(fn: () => void, duplicate: unknown) {
      try {
        fn()
        expect(false).to.equal(false, 'An error should be throw')
      } catch (e) {
        expect(e instanceof Error).to.equal(true)
        expect(e.message).to.equal('Duplicate ' + duplicate)
      }
    }

    function id(value: unknown) {
      return value
    }

    checkError(function () {
      query().select().select().execute()
    }, 'SELECT')
    checkError(function () {
      query().select().from([]).select().execute()
    }, 'SELECT')
    checkError(function () {
      query().select().from([]).from([]).execute()
    }, 'FROM')
    checkError(function () {
      query().select().from([]).orderBy(id).orderBy(id).execute()
    }, 'ORDERBY')
    checkError(function () {
      query().select().groupBy(id).from([]).groupBy(id).execute()
    }, 'GROUPBY')
  })
})
