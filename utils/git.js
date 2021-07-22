/* eslint-disable import/no-extraneous-dependencies */
import { execSync } from 'child_process'
import path from 'path'
import rimraf from 'rimraf'

const isInGitRepository = () => {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    console.log('is a git repo')
    return true
  } catch (_) {
    console.log(_)
  }
  return false
}

const isInMercurialRepository = () => {
  try {
    execSync('hg --cwd . root', { stdio: 'ignore' })
    console.log('is a Mercural repo')
    return true
  } catch (_) {
    console.log(_)
  }
  return false
}

export const tryGitInit = (root) => {
  let didInit = false
  try {
    execSync('git --version', { stdio: 'ignore' })
    if (isInMercurialRepository()) {
      console.log('isInGitRepository() || isInMercurialRepository()')
      return false
    }
  console.log("    execSync('git init', { stdio: 'ignore' })")
    execSync('git init', { stdio: 'ignore' })
    didInit = true
    console.log("execSync('git checkout -b main', { stdio: 'ignore' })")
    execSync('git checkout -b main', { stdio: 'ignore' })
    console.log("execSync('git add -A', { stdio: 'ignore' })")  
    execSync('git add -A', { stdio: 'ignore' })
    console.log("execSync('git commit -m \"Initial commit from Create Next App\"', {")
    execSync('git commit -m "Initial commit from unchained template generator App"', {
      stdio: 'ignore',
    })
    return true
  } catch (e) {
    console.log(e);
    if (didInit) {
      try {
        rimraf.sync(path.join(root, '.git'))
      } catch (_) {}
    }
    return false
  }
}
