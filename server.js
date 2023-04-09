const { spawn } = require('child_process')

const jsonServer = spawn('json-server', ['--watch', 'database/db.json'])
const vue = spawn('npm', ['run', 'dev'])

jsonServer.stdout.on('data', (data) => {
  console.log(`JSON-Server: ${data}`)
})

jsonServer.stderr.on('data', (data) => {
  console.error(`JSON-Server: ${data}`)
})

vue.stdout.on('data', (data) => {
  console.log(`VueJS: ${data}`)
})

vue.stderr.on('data', (data) => {
  console.error(`VueJS: ${data}`)
})

process.on('SIGTERM', () => {
  jsonServer.kill()
  vue.kill()
})
