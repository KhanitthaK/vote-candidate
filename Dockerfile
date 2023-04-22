FROM node:14.20-alpine3.15
RUN apk add -qU openssh git
WORKDIR /var/www/nest/cms-service
COPY . .
RUN rm yarn.lock
RUN yarn install
RUN yarn run build
CMD [ "yarn", "migration" ]