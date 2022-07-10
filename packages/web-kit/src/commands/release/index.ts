import { CAC } from 'cac'
import consola from 'consola'
import { release } from './release'

consola.wrapConsole()

export function initReleaseCommand(cli: CAC) {
  cli
    .command('release')
    .usage('发布版本')
    .option('--pre [string]', '发版环境')
    .option('--snapshot', 'version是否为hash值')
    .option('--publish', '是否发布到npm')
    .option('--commit', '是否创建commit')
    .option('--push', '是否提交到到远程仓库')
    .option('--ci', '是否为ci环境')
    .action(release)
}
