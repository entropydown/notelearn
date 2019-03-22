FROM node:9

WORKDIR /usr/src/app

COPY package*.json ./
COPY js/ ./js
RUN npm install --only=production
RUN npm install -g browserify
RUN npm run build
COPY index.html ./
COPY server.js ./
EXPOSE 8080
CMD [ "npm", "start" ]
