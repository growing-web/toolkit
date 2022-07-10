import { execa } from 'execa'
// eslint-disable-next-line
import { createRequire } from 'module'
import dayjs from 'dayjs'

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

/**
 * Using version as 0.0.0 so that it does not hinder with other version release
 * For example;
 * if user has a regular pre-release at 1.0.0-beta.0 and then you had a snapshot pre-release at 1.0.0-canary-git-hash
 * and a consumer is using the range ^1.0.0-beta, most people would expect that range to resolve to 1.0.0-beta.0
 * but it'll actually resolve to 1.0.0-canary-hash. Using 0.0.0 solves this problem because it won't conflict with other versions.
 *
 * You can set `useCalculatedVersionForSnapshots` flag to true to use calculated versions if you don't care about the above problem.
 */
export function getSnapshotSuffix(
  snapshot: string | boolean = true,
): string | undefined {
  if (snapshot === undefined) {
    return
  }

  const dateAndTime = dayjs().format('YYYYMMDDHHmmssSSS')

  let tag = ''

  if (typeof snapshot === 'string') tag = `-${snapshot}`

  return `${tag}-${dateAndTime}`
}

// function createHash(hashLength) {
//   // 默认长度 24
//   return Array.from(Array(Number(hashLength) || 24), () =>
//     Math.floor(Math.random() * 36).toString(36),
//   ).join('')
// }
