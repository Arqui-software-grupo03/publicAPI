FROM node:8.9.0

RUN mkdir /src

RUN npm install nodemon@1.18.4 -g

WORKDIR /src

ADD package.json /src/package.json

RUN npm install

ADD nodemon.json /src/nodemon.json

# ADD run.sh /src/run.sh
EXPOSE 3000

CMD npm start

# RUN chmod +x /src/run.sh

# CMD [ "/bin/sh", "/src/run.sh" ]

# FROM node:7
# WORKDIR /app
# COPY . /app
# RUN npm install
# CMD npm start
# EXPOSE 3000