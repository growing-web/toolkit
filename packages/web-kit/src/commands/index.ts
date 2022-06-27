import type { CAC } from 'cac'
import { initChangesetCommand } from './changeset'

export function initCommands(cli: CAC) {
  initChangesetCommand(cli)
}
