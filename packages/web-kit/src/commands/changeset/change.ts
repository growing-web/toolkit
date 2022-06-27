import { getPackages } from '@manypkg/get-packages'
import { CHANGESET_PATH, execaWithStreamLog } from '../utils'
import logger from 'consola'

interface ChangeOptions {
  empty: boolean
  open: boolean
}

export async function change(options: ChangeOptions) {
  const appDir = process.cwd()
  const { packages } = await getPackages(appDir)
  if (packages.length === 0) {
    logger.warn('未找到子项目，请先创建子项目.')
    return
  }
  const { empty, open } = options
  const params = [CHANGESET_PATH, 'add']
  if (empty) {
    params.push('--empty')
  }

  if (open) {
    params.push('--open')
  }

  await execaWithStreamLog(process.execPath, params)
}
