[![Codeship Status for unchainedshop/currybag-website](https://app.codeship.com/projects/2f18b4a0-57dc-0138-8b6d-4230a644a556/status?branch=master)](https://app.codeship.com/projects/391300)

## How to deploy a Home Food Delivery Shop

1. Get some VM

2. Install Docker

3. Fork Repository and checkout inside VM

4. Build up .env for production (needs documentation on how to to that and .env.schema)

5. Run npm run deploy which calls “./docker-deploy.sh”

6. Configure Cockpit & Unchained (setup admin users, build catalog, products, content)

7. Enjoy your page
