[![Codeship Status for unchainedshop/currybag-website](https://app.codeship.com/projects/2f18b4a0-57dc-0138-8b6d-4230a644a556/status?branch=master)](https://app.codeship.com/projects/391300)

# Unchained Food Delivery (UDF)

Benefits:

- 100% Open Source
- Total data ownership and no FAGA
- Contains a CMS to edit content
- Contains a scalable Enterprise Shop Engine (https://unchained.shop)
- Simple logistics process for a restaurant pre-implemented digitally

## How to contribute

See [contributing.md](./contributing.md)

## How to deploy UDF

### Step 1: Provision a VM with Docker installed

You need to get a VM or Managed Docker Environment from a local cloud provider, for Switzerland we can recommendone of the following (there are many more of course):

https://www.exoscale.com/compute/
https://www.metanet.ch/server/cloud-server
https://www.nine.ch/de/produkte/root-server-datacenter-infrastructure/cloudserver

Or you just go and install a Linux distro on any hardware you have sitting around On Premise style.

We recommend Ubuntu as Operating System, as it's best supported for Docker.

Once you have a running virtual server in the cloud or a physical one, connect to the Server with sudo rights and install the Docker Community edition, please follow these setup instructions here:

https://docs.docker.com/install/linux/docker-ce/ubuntu/

Once docker engine is running, please activate swarm mode:

```
docker swarm init
```

### Step 2: DNS

Get a domain name and a DNS server, now setup DNS records for your-website.ch, so your provisioned server is reachable at a certain domain:

```
. IN A IP.OF.YOUR.SERVER
cms IN CNAME your-website.ch
engine IN CNAME your-website.ch
```

It is really important that you set these DNS records early enough so they propagate through the world wide web, UDF uses letsencrypt to automatically provision SSL certificates for your page. Letsencrypt needs to validate that the server is reachable via the domain provided in the configuration (Step 3, env variable DOMAIN).

### Step 3: Deploy the UDF Stack

We assume that you have already forked this repository and conducted the "contributing.md" file which tells you how to change the styles, markup, images and logos to suit your business's CI/CD.

So next please connect to the Docker Engine server and git pull your repository.

Now you have to configure all needed environment variables and store them in a .env file inside the checked out repository. We made a nice table so you can actually find out how to get all that data together:

```
cp .env.schema .env
nano -w .env
```

| Environment variable     | Where to get and how to set?                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MAIL_URL`               | Use any smtp server that you have access to and correctly set it in connection url style like here: https://nodemailer.com/smtp/                                         |
| `EMAIL_FROM`             | noreply@your-website.ch                                                                                                                                                  |
| `EMAIL_WEBSITE_NAME`     | The Name of your Website                                                                                                                                                 |
| `UDF_DOMAIN`             | The Root domain of your website, like: your-website.ch                                                                                                                   |
| `UDF_HTTP_METHOD`        | HTTP Method can be http or https                                                                                                                                         |
| `ADMIN_ACCESS_SECRET`    |  A random string, DANGER: if you don't set this env variable your whole system can be accessed via the default secret (is known by anybody who looks at the source code) |
| `GETCOCKPIT_TOKEN`       | Token generated via the CMS UI (see Step 3), set later                                                                                                                   |
| `DATATRANS_MERCHANT_ID`: | Datatrans Merchant ID (see Datatrans specific documentation below)                                                                                                       |
| `DATATRANS_SECRET`       | Datatrans Secret (see Datatrans specific documentation below)                                                                                                            |
| `DATATRANS_SIGN_KEY`     | Datatrans Sign Key (see Datatrans specific documentation below)                                                                                                          |
| `DATATRANS_API_ENDPOINT` | If not set, this will default to the sandbox endpoint, so please set to "https://api.datatrans.com"                                                                      |
| `MONGO_VERSION`          | The MongoDB Version, use 4.2 if you're unsure                                                                                                                            |
| `COOKIE_DOMAIN`          | The cookie domain, set to the domain the app is running on, currybag.ch?                                                                                                 |

When all the parameters are set, you can run:

```
./docker-deploy.sh
```

It will build and create a docker stack out of the docker-compose.production.yml file and the environment variables in the .env file.

#### Setup Datatrans

Set https://ROOT_URL/graphql/datatrans as POST URL in the Datatrans Admin interface.

Go to UPP Verwaltung -> UPP Daten in the Datatrans Admin interface and get the "Merchant-ID". Use that as Datatrans Plugin configuration variable "merchantId". Use that as env DATATRANS_MERCHANT_ID for seed payment plugin setup, else configure via API.

Get the private key (password) from UPP Verwaltung -> Sicherheit -> Server-to-Server services security. Use that as DATATRANS_SECRET.

In UPP Verwaltung -> Sicherheit set "Wichtige Parameter werden digital unterschrieben und die Unterschrift (HMAC-SHA256) in der Zahlungsmeldung mitgeschickt" and generate a new sign, use that as ENV DATATRANS_SIGN_KEY.

More information you can find on docs.datatrans.com.

### Step 4: Setup Cockpit & Unchained

Now you have a running UDF Stack, but data is still missing, visit the URL's:

https://cms.your-website.ch
Please call the install URL: https://cms.your-website.ch/install to generate an admin user, then
generate a new access key, adjust the env variable for the cockpit token and redeploy the UDF stack (Step 2)

https://engine.your-website.ch
Please login as admin and change the password:

```
User: admin@localhost
Password: password
```

Enjoy your UDF App!
