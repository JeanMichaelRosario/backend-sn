FROM node:alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm i
RUN  npm i -g nodemon
COPY . .
EXPOSE 5000
CMD nodemon index.js