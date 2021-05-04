[![Codeship Status for unchainedshop/create](https://app.codeship.com/projects/2f18b4a0-57dc-0138-8b6d-4230a644a556/status?branch=master)](https://app.codeship.com/projects/391300)

# Unchained E-Commerce Scaffold

## Prerequisites

- [Currently, you have to have Meteor installed locally](https://www.meteor.com/install).
- Node.js >= v12

## Quickstart

Welcome to your new e-commerce online experience! To get started, simply run:

```bash
mkdir your-awesome-ecommerce-project
cd your-awesome-ecommerce-project
npm init @unchainedshop
npm run install-all
npm run dev
```

Now you have a fully running Unchained E-Commerce environment running locally. Check it out by browsing to the following URLs:

- <http://localhost:3000> to see the front-end (storefront)
- <http://localhost:4010> to see the control panel. Login with username: admin@unchained.local / password: password
- <http://localhost:4010/graphql> to see the Unchained GraphQL Playground

Go to [docs.unchained.shop](https://docs.unchained.shop) for more further information.

## Deploy with Docker

### Step 1: Provision a VM with Docker installed

You need to get a VM or Managed Docker Environment from a local cloud provider. For Switzerland we can recommend one of the following (there are many more of course):

<https://www.exoscale.com/compute/>
<https://www.metanet.ch/server/cloud-server>
<https://www.nine.ch/de/produkte/root-server-datacenter-infrastructure/cloudserver>

Or you just go and install a Linux distro on any hardware you have sitting around On Premise style.

We recommend Ubuntu as Operating System, as it's best supported for Docker.

Once you have a running virtual server in the cloud or a physical one, connect to the Server with sudo rights and install the Docker Community edition, please follow these setup instructions here:

<https://docs.docker.com/install/linux/docker-ce/ubuntu/>

Once docker engine is running, please activate swarm mode:

```bash
docker swarm init
```

### Step 2: DNS

Get a domain name and a DNS server, now setup DNS records for your-website.ch, so your provisioned server is reachable at a certain domain:

```
. IN A IP.OF.YOUR.SERVER
cms IN CNAME your-website.ch
engine IN CNAME your-website.ch
```

It is really important that you set these DNS records early enough so they propagate through the world wide web, UNCHAINED uses letsencrypt to automatically provision SSL certificates for your page. Letsencrypt needs to validate that the server is reachable via the domain provided in the configuration (Step 3, env variable DOMAIN).

### Step 3: Deploy the UNCHAINED Stack

We assume that you have already forked this repository and conducted the "contributing.md" file which tells you how to change the styles, markup, images and logos to suit your business's CI/CD.

So next please connect to the Docker Engine server and git pull your repository.

Now you have to configure all needed environment variables and store them in a .env file inside the checked out repository. We made a nice table so you can actually find out how to get all that data together:

```
cp .env.schema .env
nano -w .env
```

| Environment variable     | Where to get and how to set?                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MAIL_URL`               | Use any smtp server that you have access to and correctly set it in connection url style like here: <https://nodemailer.com/smtp/>                                       |
| `EMAIL_FROM`             | noreply@your-website.ch                                                                                                                                                  |
| `EMAIL_WEBSITE_NAME`     | The Name of your Website                                                                                                                                                 |
| `WEBSITE_DOMAIN`         | The Root domain of your website, like: your-website.ch                                                                                                                   |
| `HTTP_METHOD`            | HTTP Method can be http or https                                                                                                                                         |
| `ADMIN_ACCESS_SECRET`    |  A random string, DANGER: if you don't set this env variable your whole system can be accessed via the default secret (is known by anybody who looks at the source code) |
| `DATATRANS_MERCHANT_ID`: | Datatrans Merchant ID (see Datatrans specific documentation below)                                                                                                       |
| `DATATRANS_SECRET`       | Datatrans Secret (see Datatrans specific documentation below)                                                                                                            |
| `DATATRANS_SIGN_KEY`     | Datatrans Sign Key (see Datatrans specific documentation below)                                                                                                          |
| `DATATRANS_API_ENDPOINT` | If not set, this will default to the sandbox endpoint, so please set to "https://api.datatrans.com"                                                                      |
| `MONGO_VERSION`          | The MongoDB Version, use 4.2 if you're unsure                                                                                                                            |
| `COOKIE_DOMAIN`          | The cookie domain, set to the domain the app is running on                                                                                                               |

When all the parameters are set, you can run:

```
./docker-deploy.sh
```

It will build and create a docker stack out of the docker-compose.production.yml file and the environment variables in the .env file.

#### Setup Datatrans

Set <https://ROOT_URL/graphql/datatrans> as POST URL in the Datatrans Admin interface.

Go to UPP Verwaltung -> UPP Daten in the Datatrans Admin interface and get the "Merchant-ID". Use that as Datatrans Plugin configuration variable "merchantId". Use that as env DATATRANS_MERCHANT_ID for seed payment plugin setup, else configure via API.

Get the private key (password) from UPP Verwaltung -> Sicherheit -> Server-to-Server services security. Use that as DATATRANS_SECRET.

In UPP Verwaltung -> Sicherheit set "Wichtige Parameter werden digital unterschrieben und die Unterschrift (HMAC-SHA256) in der Zahlungsmeldung mitgeschickt" and generate a new sign, use that as ENV DATATRANS_SIGN_KEY.

More information you can find on docs.datatrans.com.

Enjoy your UNCHAINED App!

## Contribute

See [contributing.md](./contributing.md)
