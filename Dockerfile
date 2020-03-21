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

EXPOSE 4001

CMD [ "yarn", "run", "start" ]