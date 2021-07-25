import chalk from 'chalk'

export const instruction = (template) => {
    console.log(chalk.green(`
    Template generated successfully follow this next few steps to fire it up.

    `))
    
    console.log(chalk.blueBright(`
            Install dependencies by runing.
    `))
    switch (template) {
        case 'boilerplate':
        console.log(chalk.cyan(`
            npm install

            Add required enviroment variable under by creating .env file

            SUPPRESS_ENV_ERRORS=false

            Start up the engine by runing

            npm run dev
        `));
        break;
        case 'storefront':
        console.log(chalk.cyan(`
            npm install

            Add required enviroment variable under by creating .env file

            UNCHAINED_ENDPOINT=http|s://unchained-engine-instace-url/graphql

            Start up the frontend by runing

            npm run dev
        `));
        break;
        default:
               
           console.log(
               chalk.cyan (`
            npm install

            if you have issue with the above command you can navigate to each directory separatly and run

            npm install
    
            Add required enviroment vatiable under by
            creating .env files inside each directory accordingly

            storefront/
            UNCHAINED_ENDPOINT=http://localhost:4010/graphql

            engine/
            SUPPRESS_ENV_ERRORS=false

            Finally from the root directory run the following command to start both
            storefront and engine

            npm run dev

            if you have issue with the above command you can navigate to each directory separatly and run

            npm run dev
            `));
           
        
    }

    console.log(chalk.bgBlue.white (`\n Thank you for choosing unchained engine ENJOY!!! `)) 

}