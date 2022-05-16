import { describe, expect, test } from 'vitest'
import { jsoncParse } from '../'

describe('jsoncParse().', () => {
  test('works fine.', async () => {
    expect(jsoncParse(`{}`)).toEqual({})
    expect(jsoncParse(`{a:"1"}`)).toEqual({ a: '1' })
    expect(jsoncParse(`{a:"1"}}`)).toEqual({})
  })
})
