import * as git from '@changesets/git'
import spawn from 'spawndamnit'
import os from 'os'
import colors from 'picocolors'

export async function commit(cwd = process.cwd(), message: string) {
  await git.add('.', cwd)
  await git.commit(message, cwd)
}

export async function push(cwd: string) {
  const currentBranch = await getCurrentBranch(cwd)
  const gitCmd = await execWithOutput(
    'git',
    ['push', 'origin', currentBranch],
    {
      cwd,
    },
  )
  return gitCmd.code === 0
}

export async function getCurrentBranch(cwd: string) {
  const { stdout } = await execWithOutput(
    'git',
    ['rev-parse', '--abbrev-ref', 'HEAD'],
    { cwd },
  )
  return stdout.trim()
}

export async function execWithOutput(
  command: string,
  args: string[],
  options: {
    ignoreReturnCode?: boolean
    cwd: string
    env?: Record<string, any>
  },
) {
  process.stdout.write(
    `${colors.cyan(`Running:`)} ${colors.white(
      `${command} ${args.join(' ')}`,
    )}` + os.EOL,
  )
  const childProcess = spawn(command, args, {
    cwd: options.cwd,
    env: options.env,
  })
  childProcess.on('stdout', (data) => process.stdout.write(data))
  childProcess.on('stderr', (data) => process.stderr.write(data))
  const result = await childProcess
  if (!options?.ignoreReturnCode && result.code !== 0) {
    throw new Error(
      `The command "${command} ${args.join(' ')}" failed with code ${
        result.code
      }\n${result.stdout.toString('utf8')}\n${result.stderr.toString('utf8')}`,
    )
  }
  return {
    code: result.code,
    stdout: result.stdout.toString('utf8'),
    stderr: result.stderr.toString('utf8'),
  }
}
