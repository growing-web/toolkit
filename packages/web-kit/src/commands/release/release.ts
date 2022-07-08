import type { Package } from '@manypkg/get-packages'
import { getPackages } from '@manypkg/get-packages'

interface ReleaseOptions {
  env: 'dev' | 'fat' | 'rc' | 'prod'
}

export async function release({ env }: ReleaseOptions) {
  if (!['dev', 'fat', 'rc', 'prod'].includes(env)) {
    env = 'prod'
  }

  const appDir = process.cwd()
  const { packages } = await getPackages(appDir)

  const publicPackages: Package[] = []
  packages.forEach((pkg) => {
    const { packageJson } = pkg
    if (!packageJson.private) {
      publicPackages.push(pkg)
    }
  })

  console.log(publicPackages)
  console.log(111, env)
}
