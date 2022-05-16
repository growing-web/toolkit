import { describe, test, expect } from 'vitest'
import { generatorCodeWorksapceFolders } from '../'
import path from 'path'

describe('createCodeWorksapce().', () => {
  test('find pnpm workspace folders.', async () => {
    const root = path.join(__dirname, `./fixtures/create/pnpm`)
    const ret = await generatorCodeWorksapceFolders(root)

    expect(ret).toEqual([
      { name: 'sub-1', path: 'pkg-1/sub-1' },
      { name: 'sub-2', path: 'pkg-1/sub-2' },
      { name: 'pkg', path: 'pkg' },
    ])
  })

  test('find yarn workspace folders.', async () => {
    const root = path.join(__dirname, `./fixtures/create/yarn`)
    const ret = await generatorCodeWorksapceFolders(root)

    expect(ret).toEqual([
      { name: 'pkg', path: 'pkg' },
      { name: 'sub-1', path: 'pkg-1/sub-1' },
      { name: 'sub-2', path: 'pkg-1/sub-2' },
    ])
  })
})
