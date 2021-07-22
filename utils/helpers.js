/* eslint-disable import/no-extraneous-dependencies */

import chalk from 'chalk';
import fs from 'fs'
import got from 'got';
import path from 'path'
import tar from 'tar';

import { Stream } from 'stream'
import { promisify } from 'util'

const pipeline = promisify(Stream.pipeline)


export const getRepoInfo = async (repoName) => {    
    const infoResponse = await got(
      `https://api.github.com/repos/unchainedshop/${repoName}`
    ).catch((e) => e)
    if (infoResponse.statusCode !== 200) {
      return
    }
    const {default_branch: branch, name } = JSON.parse(infoResponse.body)

    return { branch, name }
}

export const isUrlOk = async (url) => {
  const res = await got.head(url).catch((e) => e)
  return res.statusCode === 200
}

export const hasExample = (name) => {
  return isUrlOk(
    `https://api.github.com/repos/unchainedshop/unchained/contents/examples/${encodeURIComponent(
      name
    )}/package.json`
  )
}

export const isFolderEmpty = (root, name) => {
    const validFiles = [
      '.DS_Store',
      '.git',
      '.gitattributes',
      '.gitignore',
      '.gitlab-ci.yml',
      '.hg',
      '.hgcheck',
      '.hgignore',
      '.idea',
      '.npmignore',
      '.travis.yml',
      'LICENSE',
      'Thumbs.db',
      'docs',
      'mkdocs.yml',
      'npm-debug.log',
      'yarn-debug.log',
      'yarn-error.log',
    ]
  
    const conflicts = fs
      .readdirSync(root)
      .filter((file) => !validFiles.includes(file))
      .filter((file) => !/\.iml$/.test(file))
  
    if (conflicts.length > 0) {
      console.log(
        `The directory ${chalk.green(name)} contains files that could conflict:`
      )
      console.log()
      for (const file of conflicts) {
        try {
          const stats = fs.lstatSync(path.join(root, file))
          if (stats.isDirectory()) {
            console.log(`  ${chalk.blue(file)}/`)
          } else {
            console.log(`  ${file}`)
          }
        } catch {
          console.log(`  ${file}`)
        }
      }
      console.log()
      console.log(
        'Either try using a new directory name, or remove the files listed above.'
      )
      console.log()
      return false
    }
  
    return true
  }
  

 export const downloadAndExtractExample =  (
    root,
    name
  ) => {
  
    return pipeline(
      got.stream('https://codeload.github.com/unchainedshop/unchained/tar.gz/master'),
      tar.extract({ cwd: root, strip: 3 }, [`unchained-master/examples/${name}`])
    )
  }

  export const downloadAndExtractStorefront = ( root ) => {
    return pipeline(
      got.stream(
        `https://codeload.github.com/unchainedshop/storefront/tar.gz/main`
      ),
      tar.extract({ cwd: root, strip: 1 },  [`storefront-main`])
    )
  }