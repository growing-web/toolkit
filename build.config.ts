import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  entries: ['src/index', 'src/cli'],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  externals: ['picocolors'],
})
