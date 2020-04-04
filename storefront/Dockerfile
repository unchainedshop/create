FROM node:12-alpine

ENV NODE_ENV production

# ENV CMS_ENDPOINT http://cms
# ENV SHOP_GRAPHQL_ENDPOINT http://engine/graphql

# ENV ASSET_URL_PREFIX http://localhost:3010
# ENV GRAPHQL_ENDPOINT http://localhost:3000/graphql

ENV MAIL_SENDER=io@unchained.shop
ENV MAIL_RECIPIENT=io@unchained.shop

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app
RUN NODE_ENV=development npm install
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]
