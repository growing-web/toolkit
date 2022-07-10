import { getPackages } from '@manypkg/get-packages'
import { execWithOutput } from './git'
import consola from 'consola'

export async function publish(cwd: string) {
  const { tool } = await getPackages(cwd)
  if (tool !== 'pnpm') {
    consola.error('Currently only pnpm is supported.')
    return
  }

  const envOverride = {
    npm_config_registry: getCorrectRegistry(),
  }
  const pnpmCdm = await execWithOutput(
    'pnpm',
    ['-r', 'publish', '--access', 'public', '--no-git-checks'],
    {
      cwd,
      env: Object.assign({}, process.env, envOverride),
    },
  )

  return pnpmCdm
}

function getCorrectRegistry(): string {
  const registry = ''
  return !registry || registry === 'https://registry.yarnpkg.com'
    ? 'https://registry.npmjs.org'
    : registry
}
