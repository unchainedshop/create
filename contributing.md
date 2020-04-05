## Setup for development

Prerequisits:

1. Install Meteor
2. Install Docker

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

## Use a locally deployed CMS

```
cd cms
docker build . -t cms
docker run cms
```

Now use the host and port as GETCOCKPIT_ENDPOINT env in storefront/.env. Also set the GETCOCKPIT_TOKEN


## Working with Git Subtree (pulling in newest version of unchained or a fork)

**Setup Engine integration through git subtree**

cd into root

```
  git remote add subtree_unchained git@github.com:unchainedshop/unchained.git
  git subtree add --prefix=engine/common --squash subtree_unchained currybag
```

**Pull most recent version of unchained engine into this project**

```
  git subtree pull --prefix=engine/common --squash subtree_unchained currybag
```

**Push back the changes to unchained engine from this project**

```
  git subtree push --prefix=engine/common subtree_unchained currybag
```
