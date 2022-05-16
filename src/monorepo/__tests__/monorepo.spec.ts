import { describe, expect, test } from 'vitest'
import {
  isLerna,
  isPnpmWorkspace,
  isYarnWorkspace,
  isMonorepo,
  findMonorepoRoot,
  findWorkspacePackages,
} from '../'
import path from 'path'

describe('monorepo kit test', () => {
  test('isLerna().', async () => {
    const root = path.join(__dirname, './fixtures/monorepo/lerna/')
    const ret = isLerna(root)
    expect(ret).toBeTruthy()
  })

  test('isPnpmWorkspace().', async () => {
    const root = path.join(__dirname, './fixtures/monorepo/pnpm/')
    const ret = isPnpmWorkspace(root)
    expect(ret).toBeTruthy()
  })

  test('isYarnWorkspace().', async () => {
    const root = path.join(__dirname, './fixtures/monorepo/yarn/')
    const ret = isYarnWorkspace(root)
    expect(ret).toBeTruthy()
  })

  test('isMonorepo().', async () => {
    const roots = ['yarn', 'lerna', 'pnpm'].map((item) =>
      path.join(__dirname, `./fixtures/monorepo/${item}/`),
    )
    roots.forEach((root) => {
      const ret = isMonorepo(root)
      expect(ret).toBeTruthy()
    })
  })

  test('findMonorepoRoot().', async () => {
    const root = path.join(__dirname, `./fixtures/monorepo/find-root/sub/sub`)

    const ret = await findMonorepoRoot(root)

    expect(ret).toEqual(path.join(__dirname, `./fixtures/monorepo/find-root`))
  })
})

describe('findWorkspacePackages()', () => {
  test('find yarn workspace packages.', async () => {
    const root = path.join(__dirname, `./fixtures/monorepo/find-pkgs/yarn`)
    const ret = await findWorkspacePackages(root, false)

    expect(ret).toEqual(['pkg', 'pkg-1/sub-1', 'pkg-1/sub-2'])
  })

  test('find yarn2 workspace packages.', async () => {
    const root = path.join(__dirname, './fixtures/monorepo/find-pkgs/yarn2/')
    const ret = await findWorkspacePackages(root, false)
    expect(ret).toEqual(['pkg', 'pkg-1/sub-1', 'pkg-1/sub-2'])
  })

  test('find lerna workspace packages.', async () => {
    const root = path.join(__dirname, './fixtures/monorepo/find-pkgs/lerna/')
    const ret = await findWorkspacePackages(root, false)
    expect(ret).toEqual(['pkg', 'pkg-1/sub-1', 'pkg-1/sub-2'])
  })

  test('find pnpm workspace packages.', async () => {
    const root = path.join(__dirname, './fixtures/monorepo/find-pkgs/pnpm/')
    const ret = await findWorkspacePackages(root, false)
    expect(ret).toEqual(['pkg-1/sub-1', 'pkg-1/sub-2', 'pkg'])
  })
})
