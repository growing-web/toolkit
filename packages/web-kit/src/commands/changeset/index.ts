import { CAC } from 'cac'
import { bump } from './bump'
import { change } from './change'
import { pre } from './pre'
import { release } from './publish'
import { status } from './status'

export function initChangesetCommand(cli: CAC) {
  cli
    .command('change')
    .usage('创建变更集')
    .option('--empty', '创建空变更集')
    .option('--open', '使用编辑器中打开创建的变更集')
    .action(change)

  cli
    .command('bump')
    .usage('使用变更集自动更新发布版本和变更日志')
    .option('--preid <tag>', '在对预发布版本进行版本控制时指定标识符')
    .option('--snapshot [snapshot]', '创建一个特殊版本进行测试')
    .option('--canary', '创建一个预发布版本进行测试')
    .action(bump)

  cli.command('pre').usage('进入和退出预发布模式').action(pre)

  cli
    .command('publish')
    .usage('发布 npm 包')
    .option('--tag', '发布 npm 包使用特定的 tag')
    .option(
      '--ignore-scripts',
      '发布时忽略 package.json 中的 scripts 命令，仅支持在 pnpm monorepo 中使用',
    )
    .option('--dry-run', '除了不会正式发布到npm，其余都保持不变')
    .option(
      '--no-git-checks',
      '发布命令忽略检查当前分支是否是发布分支，干净且最新，仅支持在 pnpm monorepo 中使用',
    )
    .action(release)

  cli.command('change-status').usage('查询changesets当前状态').action(status)
}
