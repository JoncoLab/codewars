import { sortTheInnerContent } from './sort-word-inner-content'
import { assert } from 'chai'

describe('Sort the word inner content', function () {
  it('Example tests', function () {
    assert.equal(
      sortTheInnerContent('sort the inner content in descending order'),
      'srot the inner ctonnet in dsnnieedcg oredr'
    )
    assert.equal(sortTheInnerContent('wait for me'), 'wiat for me')
    assert.equal(sortTheInnerContent('this kata is easy'), 'tihs ktaa is esay')
  })
})
