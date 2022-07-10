import type { Package } from '@manypkg/get-packages'
import { getSnapshotSuffix } from '../utils'
import semver from 'semver'
import fs from 'fs-extra'
import path from 'node:path'

interface VersionOptions {
  pre: string
  pkgs: Package[]
  snapshot: boolean
}

export async function version({ pkgs, pre, snapshot }: VersionOptions) {
  const results = await Promise.all(
    pkgs.map((pkg) => {
      const oldVersion = pkg.packageJson.version
      if (!oldVersion) {
        return null
      }
      const version = generateVersion(pkg.packageJson.version, pre, snapshot)
      const pkgPath = path.join(pkg.dir, 'package.json')
      let pkgStr = fs.readFileSync(pkgPath, { encoding: 'utf-8' })
      pkgStr = pkgStr.replace(
        new RegExp(`"version": "${oldVersion}"`),
        `"version": "${version}"`,
      )
      fs.writeFileSync(pkgPath, pkgStr, { encoding: 'utf-8' })
      return {
        name: pkg.packageJson.name,
        version,
        pre,
      }
    }),
  )
  return results.filter(Boolean)
}

function generateVersion(version: string, pre: string, snapshot: boolean) {
  // 快照，随机生成版本
  if (snapshot) {
    return `0.0.0${getSnapshotSuffix(pre)}`
  }

  if (!pre) {
    return semver.inc(version, 'patch')
  }

  return semver.inc(version, 'prerelease', pre)
}
