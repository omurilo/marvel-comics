FROM node:alpine

WORKDIR /app

EXPOSE ${PORT}

ADD package.json /app

COPY . /app

RUN npm install --ignore-engines --silent

CMD ["npm", "run", "start"]