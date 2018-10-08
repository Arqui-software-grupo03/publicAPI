FROM node:7
WORKDIR /app2
COPY package.json /app2
RUN npm install
COPY . /app2
CMD npm start
EXPOSE 3000