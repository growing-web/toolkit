import { cac } from 'cac'
import colors from 'picocolors'
import consola from 'consola'
import { createCodeWorksapceFile } from '@growing-web/toolkit'
import pkg from '../package.json'

const NAME = 'web-toolkit'

type CreateType = 'code-workspace'

async function bootstrap() {
  const cli = cac(NAME)

  cli
    .command('create [type]')
    .usage('ability to create.')
    .action(async (type: CreateType) => {
      switch (type) {
        case 'code-workspace':
          await createCodeWorksapceFile(process.cwd())
          break

        default:
          consola.error(colors.red(`Invalid create [${type}]!`))
      }
    })

  // Invalid command
  cli.on('command:*', function () {
    consola.error(colors.red('Invalid command!'))
    process.exit(1)
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
