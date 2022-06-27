import fs from 'fs-extra'
import path from 'node:path'
import { getPackages } from '@manypkg/get-packages'

export const MONOREPO_CODE_WORKSPACE_FILE = 'monorepo.code-workspace'

export async function generatorVscodeCodeWorksapceFile(cwd = process.cwd()) {
  const { packages, root } = await getPackages(cwd)

  const folders = packages.map((pkg) => {
    return {
      name: pkg.packageJson.name,
      path: path.relative(root.dir || cwd, pkg.dir),
    }
  })
  folders.filter(Boolean)

  folders.push({
    name: 'root',
    path: '.',
  })
  return folders
}

export async function createCodeWorksapceFile(cwd: string) {
  const folders = await generatorVscodeCodeWorksapceFile(cwd)

  fs.outputJSONSync(
    path.join(cwd, MONOREPO_CODE_WORKSPACE_FILE),
    { folders },
    { encoding: 'utf-8', spaces: 2 },
  )
}
