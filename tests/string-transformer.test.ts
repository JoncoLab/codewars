import { assert } from 'chai'
import { stringTransformer } from '../katas/string-transformer'

describe('Fixed tests', function () {
  it('Testing for "Example Input"', () =>
    assert.strictEqual(stringTransformer('Example Input'), 'iNPUT eXAMPLE'))
  it('Testing for ""', () => assert.strictEqual(stringTransformer(''), ''))
  it('Testing for "To be OR not to be That is the Question"', () =>
    assert.strictEqual(
      stringTransformer('To be OR not to be That is the Question'),
      'qUESTION THE IS tHAT BE TO NOT or BE tO'
    ))
  it('Testing for "You Know When  THAT  Hotline Bling"', () =>
    assert.strictEqual(
      stringTransformer('You Know When  THAT  Hotline Bling'),
      'bLING hOTLINE  that  wHEN kNOW yOU'
    ))
  it('Testing for " A b C d E f G "', () =>
    assert.strictEqual(stringTransformer(' A b C d E f G '), ' g F e D c B a '))
})
