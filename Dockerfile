FROM node:lts

WORKDIR /app
COPY ./package.json /app/
COPY . /app/
RUN npm install
ENV NODE_ENV docker
EXPOSE 3000
CMD [ "npm", "run", "start" ]
