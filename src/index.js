import {readFileSync} from 'fs'
import {resolve} from 'path'
import {exec} from 'child_process'

const cwd = process.cwd()
let [rootPath = '', configPath = __dirname + '/stc.config.js'] = process.argv.slice(2)

rootPath = resolve(cwd, rootPath)
configPath = resolve(cwd, configPath)


runCode(configPath)

function runCode(path) {
  process.chdir(rootPath)
  const p = exec(`node ${path}`)
  p.stderr.pipe(process.stderr)
  p.stdout.pipe(process.stdout)
}
