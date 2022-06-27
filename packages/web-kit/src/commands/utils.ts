import { execa } from 'execa'
// eslint-disable-next-line
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
export const CHANGESET_PATH = require.resolve('@changesets/cli')

export function execaWithStreamLog(command: string, args: string[]) {
  const promise = execa(command, args, {
    stdin: 'inherit',
    stdout: 'inherit',
    stderr: 'inherit',
  })
  return promise
}
