import retry from 'async-retry'
import chalk from 'chalk'
import fs from 'fs'
import cpy from 'cpy'
import os from 'os'
import path from 'path'

import { makeDir } from './make-dir.js'
import { downloadAndExtractExample, downloadAndExtractStorefront, getRepoInfo, isFolderEmpty } from './helpers.js'
import { isWriteable } from './is-writeable.js'
import { tryGitInit } from './git.js'
import { install } from './install.js'

export class DownloadError extends Error {}


export async function createApp({
  templateType,
  directoryPath,
  projectName,
  initGit,
}){
let repoInfo;

console.log(chalk.blueBright(`
_____ _____ _____ _____ _____ _____ _____ _____ ____
|  |  |   | |     |  |  |  _  |     |   | |   __|    \\
|  |  | | | |   --|     |     |-   -| | | |   __|  |  |
|_____|_|___|_____|__|__|__|__|_____|_|___|_____|____/


`));


  const root = directoryPath ? path.resolve(directoryPath) : process.cwd();

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(chalk.red( 'The application path is not writable, please check folder permissions and try again.'))
    console.error(chalk.white(
      'It is likely you do not have write permissions for this folder.'
    )
    )
    process.exit(1)
  }
  const appName = path.basename(root)

  await makeDir(root)

  if (!isFolderEmpty(root, appName)) {
    process.exit(1)
  }

  if(templateType === 'boilerplate') {
    repoInfo = await getRepoInfo('unchained')
  }
  
    try {
      const STOREFRONT_DIR = `${root}/storefront`;
      const ENGINE_DIR = `${root}/engine`
      console.log(`${chalk.cyan('Downloading files from repo . This might take a moment... \n' )}`);
      if(templateType === 'full_stack') {
        await makeDir(STOREFRONT_DIR)
        console.log(`Creating a new Unchainedshop storefront template in ${chalk.green(STOREFRONT_DIR)}.`);        
        await retry(() => downloadAndExtractStorefront(STOREFRONT_DIR), {
          retries: 3,
        })
        await makeDir(ENGINE_DIR)
        console.log(`Creating a new Unchainedshop engine template in ${chalk.green(ENGINE_DIR)}.`)
        
        await retry(() => downloadAndExtractExample(ENGINE_DIR, 'minimal'), {
          retries: 3,
        });

    /**
     * Create a package.json for the new project.
    */
    const packageJson = {
      name: projectName || 'my-unchained',
      description: "Full stack unchained e-commerce boilerplate",
      version: '0.0.1',
      license: "EUPL-1.2",
      private: false,
      scripts: {
        "install": "run-p --print-label install:*",
        "install:storefront": "cd storefront && npm install",
        "install:engine": "cd engine && npm install",
        "dev": "run-p --print-label dev:*",
        "dev:engine": "cd engine && npm run dev",
        "dev:storefront": "cd storefront && npm run dev"
      },
    }
  

    fs.writeFileSync(
      path.join(root, 'package.json'),
      JSON.stringify(packageJson, null, 2) + os.EOL
    )
    const orginalRoot = process.cwd();
    process.chdir(root)

    const dependencies = []
    const devDependencies = ['npm-run-all'];

    if (dependencies.length) {
      console.log('Installing dependencies:')
      for (const dependency of dependencies) {
        console.log(`- ${chalk.cyan(dependency)}`)
      }

      await install(dependencies)
    }
    if (devDependencies.length) {
      console.log()
      console.log('Installing devDependencies:')
      for (const devDependency of devDependencies) {
        console.log(`- ${chalk.cyan(devDependency)}`)
      }
      await install(devDependencies, { devDependencies: true })
    }

  console.log('Generating default configuration files');

    await cpy('**', root, {
      cwd: path.join(orginalRoot, 'configs'),
      filter: ({name}) => {
        if(!initGit && name === 'gitignore') return false
        else return true
      },
      rename: (name) => {
        switch (name) {
          case 'gitignore':
          case 'eslintrc': {
            return '.'.concat(name)
          }
          default: {
            return name
          }
        }
      },
    })

      } else {
          if (!repoInfo) {
            console.log()
            await retry(() => downloadAndExtractStorefront(root), {
              retries: 3,
            })
          } else {
            await retry(() => downloadAndExtractExample(root, templateType), {
              retries: 3,
            })
          }
    }
    if (initGit && tryGitInit(root)) {
      console.log('Initialized a git repository.')
      console.log()
    }
    } catch (reason) {
      throw new DownloadError(reason)
    }

}
