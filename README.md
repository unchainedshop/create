[![Codeship Status for unchainedshop/create](https://app.codeship.com/projects/2f18b4a0-57dc-0138-8b6d-4230a644a556/status?branch=master)](https://app.codeship.com/projects/391300)

# Unchained E-Commerce Storefront template

## Prerequisites

- Node.js >= v14

## Quickstart

Welcome to your new e-commerce online experience! To get started, simply run:

```bash
mkdir your-awesome-ecommerce-project
cd your-awesome-ecommerce-project
npm init @unchainedshop storefront
npm run install
npm run dev
```

Get a fully managed trial instance of unchained engine here: https://unchained-test.ucc.dev/login 

Now you have a fully running Unchained E-Commerce storefront environment running locally. Check it out by browsing to the following URLs:

- <http://localhost:3000> to see the front-end (storefront)
- <http://localhost:3000/api/graphql> to see the Unchained GraphQL Playground

Go to [docs.unchained.shop](https://docs.unchained.shop) for more further information.


### Theming

App Theming works like this:

- The theme is read from the environment variable `UNCHAINED_CREATE_THEME` or
  provided as a path to `UNCHAINED_CREATE_THEME_FILE`. By default theme.json is
  loaded via `UNCHAINED_CREATE_THEME_FILE=theme.json`
- The theme is defined as a json (see theme.json for a complete example)
- From environment it is then provided to the whole next app on runtime by using
  next/config's publicRuntimeConfig feature. The page /api/theme generates CSS
  variable's out of the rootProperties object, the other properties are used
  throughout the app to translate certain content, configure logos and icons.


#### Setup Datatrans

Set <https://ROOT_URL/graphql/datatrans> as POST URL in the Datatrans Admin interface.

Go to UPP Verwaltung -> UPP Daten in the Datatrans Admin interface and get the "Merchant-ID". Use that as Datatrans Plugin configuration variable "merchantId". Use that as env DATATRANS_MERCHANT_ID for seed payment plugin setup, else configure via API.

Get the private key (password) from UPP Verwaltung -> Sicherheit -> Server-to-Server services security. Use that as DATATRANS_SECRET.

In UPP Verwaltung -> Sicherheit set "Wichtige Parameter werden digital unterschrieben und die Unterschrift (HMAC-SHA256) in der Zahlungsmeldung mitgeschickt" and generate a new sign, use that as ENV DATATRANS_SIGN_KEY.

More information you can find on docs.datatrans.com.

Enjoy your UNCHAINED App!

## Contribute

See [contributing.md](./contributing.md)
