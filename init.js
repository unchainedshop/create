#!/usr/bin/env node
import { createApp, DownloadError } from "./utils/create-app.js"
import prompts from 'prompts'
import chalk from "chalk"

const onCancel = prompt => {
  process.exit(1);
}
async function start() {

  const res = await prompts([{
    type: 'autocomplete',
    name: 'templateType',
    message: 'What type of template do you want',
    choices: [
      { title: 'Full stack e-commerce', value: 'full_stack' },
      { title: 'Storefront', value: 'storefront' },
      { title: 'Unchained engine', value: 'boilerplate' },
    ]
  },
  {
    type: prev => prev == 'full_stack' ? 'text' : null,
    name: 'projectName',
    message: 'Name of project'
  },
  {
    type: (_, answers) => answers.templateType !== 'full_stack' ? 'text' : null,
    name: 'directoryPath',
    message: 'Directory name relative to current directory \n (press Enter to use current directory)',
  }
], {onCancel})
console.log( res)
  try {
    await createApp({ ...res })
  } catch (reason) {
    if (!(reason instanceof DownloadError)) {
      throw reason
    }
  }
}



start()
  .then(() => {console.log()})
  .catch(async (reason) => {
    console.log()
    console.log('Aborting installation.')
    if (reason.command) {
      console.log(`  ${chalk.cyan(reason.command)} has failed.`)
    } else {
      console.log(chalk.red('Unexpected error. Please report it as a bug:'))
      console.log(reason)
    }
    console.log()
    process.exit(1)
  })
