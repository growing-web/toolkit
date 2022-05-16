import fs from 'fs-extra'
import path from 'node:path'
import { findWorkspacePackages, findMonorepoRoot } from './monorepo'

const MONOREPO_CODE_WORKSPACE_FILE = 'monorepo.code-workspace'

export async function generatorCodeWorksapceFolders(cwd = process.cwd()) {
  const root = await findMonorepoRoot(cwd)

  const packageRoots = await findWorkspacePackages(root || cwd)

  const folders = await Promise.all(
    packageRoots.map((pkg) => {
      const json = fs.readJSONSync(path.join(pkg, 'package.json'), {
        encoding: 'utf-8',
      })
      return {
        name: json.name,
        path: path.relative(root || cwd, pkg),
      }
    }),
  )
  return folders
}

export async function createCodeWorksapceFile(cwd: string) {
  const folders = await generatorCodeWorksapceFolders(cwd)

  fs.outputJSONSync(
    path.join(cwd, MONOREPO_CODE_WORKSPACE_FILE),
    { folders },
    { encoding: 'utf-8' },
  )
}
