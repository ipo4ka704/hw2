FROM node:lts

WORKDIR /app
COPY ./package.json /app/
COPY . /app/
RUN npm install
RUN #npm run create
ENV NODE_ENV docker
EXPOSE 3007
CMD [ "npm", "run", "create" ]
