import spawn from 'cross-spawn'


export async function install(
  dependencies,
  {  devDependencies }
){

  const npmFlags = []
  return new Promise((resolve, reject) => {
    let args
    let command = 'npm'

    if (dependencies && dependencies.length) {
    
        args = ['install']
        args.push(devDependencies ? '--save-dev' : '--save')
        args.push(...dependencies)
    }   

      args.push(...npmFlags)
      console.log(args)
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
