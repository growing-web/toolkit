import type { CAC } from 'cac'
import { initChangesetCommand } from './changeset'
import { initReleaseCommand } from './release'

export function initCommands(cli: CAC) {
  Promise.all([initChangesetCommand(cli), initReleaseCommand(cli)])
}
