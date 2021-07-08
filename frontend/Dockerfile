FROM node:14.16.0

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . /app

EXPOSE 3000

CMD ["yarn", "start"]