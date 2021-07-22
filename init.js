#!/usr/bin/env node
import { createApp, DownloadError } from "./utils/create-app.js"
import prompts from 'prompts'
import chalk from "chalk"


async function start() {

  const res = await prompts({
    type: 'autocomplete',
    name: 'value',
    message: 'What type of template do you want',
    choices: [
      { title: 'full stack e-commerce', value: 'full_stack' },
      { title: 'Storefront template', value: 'storefront' },
      { title: 'Unchained engine template', value: 'minimal' },
    ]
  })

  try {
    await createApp({ example: res.value })
  } catch (reason) {
    if (!(reason instanceof DownloadError)) {
      throw reason
    }
  }
}



start()
  .then((data) => {console.log(data)})
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
