FROM node:9

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .
RUN npm install --only=production
RUN npm install -g browserify
RUN npm run build
EXPOSE 80
CMD [ "npm", "start" ]
