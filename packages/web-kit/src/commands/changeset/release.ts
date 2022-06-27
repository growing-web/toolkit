import path from 'path'
import fs from 'fs-extra'
import { tag as gitTag } from '@changesets/git'
import { execaWithStreamLog } from '../utils'

interface ReleaseOptions {
  tag: string
  ignoreScripts: boolean
  gitChecks: boolean
  dryRun: boolean
}

export async function release(options: ReleaseOptions) {
  const appDir = process.cwd()

  const params = ['-r', 'publish', '--access', 'public']

  const { tag, ignoreScripts, gitChecks = false, dryRun = false } = options

  if (tag) {
    params.push('--tag')
    params.push(tag)
  }

  params.push('--report-summary')

  if (ignoreScripts) {
    params.push('--ignore-scripts')
  }

  if (dryRun) {
    params.push('--dry-run')
  }

  if (ignoreScripts) {
    params.push('--ignore-scripts')
  }

  if (!gitChecks) {
    params.push('--no-git-checks')
  }

  await execaWithStreamLog('pnpm', params)

  const pnpmPublishSummaryFile = path.join(appDir, 'pnpm-publish-summary.json')
  if (fs.existsSync(pnpmPublishSummaryFile)) {
    const publishInfo: {
      publishedPackages: Array<{ name: string; version: string }>
    } = await fs.readJSON(pnpmPublishSummaryFile, 'utf-8')

    await Promise.all(
      (publishInfo.publishedPackages || []).map((pkg) =>
        gitTag(`${pkg.name}@${pkg.version}`, appDir),
      ),
    )

    await fs.remove(pnpmPublishSummaryFile)
  }
}
