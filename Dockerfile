FROM node:14-slim

WORKDIR /app

RUN mkdir -p /opt/node_modules

COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm install

COPY . /app

EXPOSE 3001

CMD ["npm", "run", "dev"]