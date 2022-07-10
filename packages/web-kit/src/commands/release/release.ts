import type { Package } from '@manypkg/get-packages'
import { getPackages } from '@manypkg/get-packages'
import { version } from './version'
import { commit, push } from './git'
import { publish } from './publish'
import consola from 'consola'
import outdent from 'outdent'
import colors from 'picocolors'
import isCI from 'is-ci'

interface ReleaseOptions {
  pre: string
  publish: boolean
  push: boolean
  commit: boolean
  ci: boolean
  snapshot: boolean
}

export async function release({
  pre,
  commit: isCommit,
  publish: isPublish,
  push: isPush,
  ci,
  snapshot,
}: ReleaseOptions) {
  if (!ci && !isCI) {
    consola.error('Releases can only be done in a CI environment.')
    process.exit(1)
  }

  const cwd = process.cwd()
  const { packages } = await getPackages(cwd)

  const publicPackages: Package[] = []
  packages.forEach((pkg) => {
    const { packageJson } = pkg
    if (!packageJson.private) {
      publicPackages.push(pkg)
    }
  })

  const pkgs = getNeedPublishPackages(publicPackages)

  // 生成版本号
  const results = await version({ pkgs, pre, snapshot })

  if (isCommit) {
    let message = `chore: release\n\n`
    results.forEach((result) => {
      message += `${result.name} v${result.version}\n`
    })

    await commit(cwd, message)

    const commintLines = results
      .map((release) => `  ${release.name}@${release.version}`)
      .join('\n')

    const text = outdent`
    ${colors.cyan('RELEASING')}: ${colors.green(
      `Commit ${colors.white(results.length)} package(s)`,
    )}

    ${colors.blue('Commit')}:
    ${commintLines}
`
    consola.info(text)
  } else {
    return
  }

  if (isPublish) {
    consola.log(' ')
    const result = await publish(cwd)

    const err = result.stderr?.toString()

    if (result.code !== 0 || err.includes('npm ERR')) {
      consola.error(`\n${colors.red('packages failed to publish:\n\n' + err)}`)
      process.exit(1)
    } else {
      consola.log(' ')
      consola.success(colors.green('packages published successfully.'))
    }
  }

  if (isPush) {
    consola.log(' ')
    const success = await push(cwd)
    if (success) {
      consola.success(colors.green('packages pushed successfully.'))
    } else {
      consola.error(colors.red('packages pushed failed.'))
      process.exit(1)
    }
  }
}

// TODO 只修改有变动的包
function getNeedPublishPackages(packages: Package[]) {
  return packages
}
