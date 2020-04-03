FROM pozylon/meteor-docker-auto as bundler
ADD . /source
WORKDIR /source
ENV METEOR_ALLOW_SUPERUSER true

RUN meteor npm install && \
  meteor build --server-only --directory /bundle

FROM node:12-alpine as rebuilder
RUN apk add --no-cache make gcc g++ python sudo
RUN adduser -D -u 501 -h /home/meteor meteor
COPY --from=bundler /bundle /rebuild
WORKDIR /rebuild/bundle/programs/server
RUN npm install && npm run install --production

FROM node:12-alpine as runtime

# Unchained specific
RUN mkdir /unchained-uploads
RUN chmod 777 /unchained-uploads
VOLUME /unchained-uploads

RUN adduser -D -u 501 -h /home/meteor meteor
COPY --from=rebuilder /rebuild/bundle /webapp
WORKDIR /webapp
ENV PORT 3000
ENV NODE_ENV production
RUN chmod -R +w /webapp/programs/server/

EXPOSE 3000
# USER meteor
CMD node main.js
