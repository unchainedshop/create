FROM geoffreybooth/meteor-base as bundler

ADD . /source
WORKDIR /source

RUN cp -R /source/common/packages /source/packages

RUN meteor npm install && \
  meteor build --server-only --allow-superuser --directory /bundle


FROM node:12 as runtime
# Unchained specific
RUN mkdir /unchained-uploads
RUN chmod 777 /unchained-uploads
VOLUME /unchained-uploads
RUN apt-get update

RUN useradd -u 501 -d /home/meteor meteor
COPY --from=bundler /bundle/bundle /webapp
WORKDIR /webapp/programs/server
RUN npm install && npm run install --production
WORKDIR /webapp
ENV PORT 3000
ENV NODE_ENV production
EXPOSE 3000
USER meteor
CMD node main.js
