FROM node:12.2.0-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN npm install --silent
RUN npm install react-script@3.0.1 -g --silent

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]