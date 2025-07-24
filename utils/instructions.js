import chalk from "chalk";

export const instruction = (template) => {
  console.log(chalk.green(`Project generated successfully.`));
  console.log(
    chalk.blueBright(`
Install dependencies by running \`npm install\` first. Next steps:`),
  );
  switch (template) {
    case "kitchensink":
      console.log(
        chalk.cyan(`
After installing the dependencies, 
start up the engine in dev mode by running

\`npm run dev\`

Then open http://localhost:4010 in your browser.`),
      );
      break;
    case "storefront":
      console.log(
        chalk.cyan(`
After installing the dependencies, 
first set the environment variable to point to an 
Unchained Engine GraphQL Endpoint, for example:

UNCHAINED_ENDPOINT=http://localhost:4010/graphql

You can do this by creating a .env file in the root of the storefront directory.

Then, you can start the storefront in dev mode by running

\`npm run dev\``),
      );
      break;
    default:
      console.log(
        chalk.cyan(`
After installing the dependencies, 
start up both the engine and the storefront by running

\`npm run dev\`

In the root directory of the project.

Then open http://localhost:4010 in your browser to setup your store.
The storefront will be available at http://localhost:3000.`),
      );
  }
};
