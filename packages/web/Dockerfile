FROM node:13-stretch as build-stage
ARG RPSLS_ENDPOINT
ENV RPSLS_ENDPOINT $RPSLS_ENDPOINT
RUN mkdir -p /packages/web
WORKDIR /packages/web
COPY ./package.json ./yarn.lock /packages/web/
RUN yarn install
ENV NODE_ENV=production
COPY .babelrc.js webpack.config.js /packages/web/
COPY ./src /packages/web/src/
RUN yarn build

FROM nginx:1.17.5-alpine
COPY container /
COPY --from=build-stage /packages/web/bin/ /packages/web/bin/
