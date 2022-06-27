import { cac } from 'cac'
import colors from 'picocolors'
import consola from 'consola'
import pkg from '../package.json'
import {
  createCodeWorksapceFile,
  MONOREPO_CODE_WORKSPACE_FILE,
} from './create-code-workspace'

const NAME = 'codemod'

type CodeModType = 'create-code-workspace'

consola.wrapConsole()
async function bootstrap() {
  const cli = cac(NAME)
  consola.info(`${pkg.name} v${pkg.version}`)

  cli
    .command('[type]')
    .usage('ability to create.')
    .action(async (type: CodeModType) => {
      switch (type) {
        case 'create-code-workspace':
          await createCodeWorksapceFile(process.cwd())
          consola.success(
            colors.green(`${MONOREPO_CODE_WORKSPACE_FILE} is created!`),
          )
          break

        default:
          consola.error(
            colors.red(`Invalid transform choice, pick one of:
          - create-code-workspace
          `),
          )
      }
    })

  cli.version(pkg.version)
  cli.usage(NAME)
  cli.help()
  cli.parse()
}

bootstrap().catch((err: unknown) => {
  consola.error(err)
  process.exit(1)
})
