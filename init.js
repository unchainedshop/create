#!/usr/bin/env node
import { createApp, DownloadError } from "./utils/create-app.js";
import prompts from "prompts";
import chalk from "chalk";
import { instruction } from "./utils/instructions.js";

const onCancel = () => {
  process.exit(1);
};
let template = null;
async function start() {
  const res = await prompts(
    [
      {
        type: "autocomplete",
        name: "templateType",
        message: "What type of template do you want",
        format: (val) => val || "full_stack",
        choices: [
          { title: "Full Stack E-Commerce", value: "full_stack" },
          { title: "Basic Storefront", value: "storefront" },
          { title: "Kitchensink Backend", value: "kitchensink" },
        ],
      },
      {
        type: (prev) => (prev == "full_stack" ? "text" : null),
        name: "projectName",
        format: (val) => (val || " ").trim().replace(/\W/g, "-"),
        message: "Name of project",
      },
      {
        type: "text",
        name: "directoryPath",
        format: (val) => (val || " ").trim(),
        message:
          "Directory name relative to current directory \n (press Enter to use current directory)",
      },
      {
        type: "toggle",
        name: "initGit",
        message: "Do you want Initialize git?",
        initial: false,
        active: "yes",
        inactive: "no",
      },
    ],
    { onCancel },
  );
  try {
    await createApp({ ...res });
  } catch (reason) {
    if (!(reason instanceof DownloadError)) {
      throw reason;
    }
  }
  template = res.templateType;
}

start()
  .then(() => {
    instruction(template);
    console.log("Inside that directory, you can run several commands:");
    console.log(
      "Explore all of the commands available under package.json scripts",
    );
  })
  .catch(async (reason) => {
    console.log();
    console.log("Aborting installation.");
    if (reason.command) {
      console.log(`  ${chalk.cyan(reason.command)} has failed.`);
    } else {
      console.log(chalk.red("Unexpected error. Please report it as a bug:"));
      console.log(reason);
    }
    console.log();
    process.exit(1);
  });
