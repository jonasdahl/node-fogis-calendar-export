FROM node:13.8.0

WORKDIR /app

# Install app dependencies
COPY package.json package.json
COPY .yarn .yarn
COPY yarn.lock yarn.lock
COPY .yarnrc.yml .yarnrc.yml
COPY .pnp.js .pnp.js

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 4001

ENV NODE_ENV=production

CMD [ "yarn", "run", "serve" ]