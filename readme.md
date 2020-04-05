[![Codeship Status for unchainedshop/currybag-website](https://app.codeship.com/projects/2f18b4a0-57dc-0138-8b6d-4230a644a556/status?branch=master)](https://app.codeship.com/projects/391300)

# Currybag: DIY Home Food Delivery Business (HFD)

Benefits:
- 100% Open Source
- Total data ownership and no FAGA
- Contains a CMS to edit content
- Contains a scalable Enterprise Shop Engine (https://unchained.shop)
- Simple logistics process for a restaurant pre-implemented digitally


## How to deploy HFD

### Step 1: Provision a VM with Docker installed

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

### Step 2: Setup a production HFD Stack

We assume that you have already forked this repository and conducted the "contributing.md" file which tells you how to change the styles, markup, images and logos to suit your business's CI/CD.

So next please connect to the Docker Engine server and git pull your repository.

Now you have to configure all needed environment variables and store them in a .env file inside the checked out repository. We made a nice table so you can actually find out how to get all that data together:

```
cp .env.schema .env
nano -w .env
```

When all the parameters are set, you can run:

```
./docker-deploy
```

It will create a docker stack out of the docker-compose.production.yml file and the environment variables in the .env file.

5. Run npm run deploy which calls “./docker-deploy.sh”

6. Configure Cockpit & Unchained (setup admin users, build catalog, products, content)

7. Enjoy your page
