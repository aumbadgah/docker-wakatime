FROM node:13-alpine

RUN apk update \
    && apk add \
    curl \
    zsh
RUN yarn global add typescript

WORKDIR /app
COPY . .
RUN yarn
RUN tsc --build tsconfig.json

CMD ["node", "dist/index.js"]
