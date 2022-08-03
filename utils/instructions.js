import chalk from 'chalk'

export const instruction = (template) => {
    console.log(chalk.green(`
    Template generated successfully follow this next few steps to fire it up.

    `))
    
    console.log(chalk.blueBright(`
            Install dependencies by running.
    `))
    switch (template) {
        case 'kitchensink':
        console.log(chalk.cyan(`
            npm install

            Add required environment variables under by creating .env file

            SUPPRESS_ENV_ERRORS=false

            Start up the engine by running

            npm run dev
        `));
        break;
        case 'storefront':
        console.log(chalk.cyan(`
            npm install

            Add required environment variable under by creating .env file

            UNCHAINED_ENDPOINT=http|s://unchained-engine-instance-url/graphql

            Start up the frontend by running

            npm run dev
        `));
        break;
        default:
               
           console.log(
               chalk.cyan (`
            npm install

            if you have issue with the above command navigate to each directory separately and run

            npm install
    
            Add required environment variables under each directory (storefront & engine) 
            by creating .env file

            storefront/
            UNCHAINED_ENDPOINT=http://localhost:4010/graphql

            engine/
            SUPPRESS_ENV_ERRORS=false

            Finally from the root directory run the following command to start both
            storefront and engine

            npm run dev

            if you have issue with the above command navigate to each directory separately and run

            npm run dev
            `));
           
        
    }

    console.log(chalk.bgBlue.white (`\n Thank you for choosing unchained engine ENJOY!!! `)) 

}