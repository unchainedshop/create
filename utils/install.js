import spawn from 'cross-spawn'


export async function install(
  dependencies,
  {  devDependencies = false }
){
  return new Promise((resolve, reject) => {
    let args = ['install']
    let command = 'npm'

    if (dependencies && dependencies.length) {
        args.push(devDependencies ? '--save-dev' : '--save')
        args.push(...dependencies)
    }   
    const child = spawn(command, args, {
      stdio: 'inherit',
      env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
    })
    
    child.on('close', (code) => {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(' ')}` })
        return
      }
      resolve()
    })
  })
}
