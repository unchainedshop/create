FROM node:12-alpine

ENV NODE_ENV production

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app
RUN npm install
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]
