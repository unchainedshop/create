## Setup for development

Prerequisites:

1. Install Meteor
2. Install Docker

## Run the Engine and the Storefront next to each other in Dev Mode

```
npm run dev
```

## Run the Shop Engine in Dev Mode

```
cd engine
npm run dev
```

## Run the Storefront in Dev Mode

Set the UNCHAINED_ENDPOINT env in storefront/.env to the correct shop engine

```
cd storefront
npm run dev
```

For more information about developing the storefront see: [storefront/README.md](./storefront/README.md)

## Use a locally deployed CMS

```
cd cms
docker build . -t cms
docker run cms
```

Now use the host and port as GETCOCKPIT_ENDPOINT env in storefront/.env. Also set the GETCOCKPIT_TOKEN
