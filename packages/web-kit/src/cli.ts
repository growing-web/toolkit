import { cac } from 'cac'
import pkg from '../package.json'
import { initCommands } from './commands'

const CLI_NAME = 'web-kit'

async function bootstrap() {
  const cli = cac(CLI_NAME)
  initCommands(cli)

  cli.version(pkg.version)
  cli.usage(CLI_NAME)
  cli.help()
  cli.parse()
}

bootstrap().catch(() => {
  process.exit(1)
})
