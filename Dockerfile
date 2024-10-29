FROM bitnami/node:latest

COPY ./app /app

WORKDIR /app

CMD npm run start
