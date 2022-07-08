import { CAC } from 'cac'
import { release } from './release'

export function initReleaseCommand(cli: CAC) {
  cli
    .command('release')
    .usage('发布版本')
    .option('--env', '发版环境', { default: 'prod' })
    .action(release)
}
