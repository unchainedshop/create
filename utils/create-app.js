import retry from 'async-retry'
import chalk from 'chalk'
import fs from 'fs'
import os from 'os'
import path from 'path'

import { makeDir } from './make-dir.js'
import { downloadAndExtractExample, downloadAndExtractStorefront, getRepoInfo, isFolderEmpty } from './helpers.js'
import { isWriteable } from './is-writeable.js'
import { tryGitInit } from './git.js'

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
      const STOREFRONT_DIR = `${root}/storerfont`;
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
      version: '0.1.0',
      private: false,
      scripts: {
        "install:storefront": "cd storefront && npm install",
        "install:engine": "cd engine && npm install",
        "dev:engine": "cd engine && npm run dev",
        "dev:storefront": "cd storefront && npm run dev:local"
      },
    }

    fs.writeFileSync(
      path.join(root, 'package.json'),
      JSON.stringify(packageJson, null, 2) + os.EOL
    )

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
