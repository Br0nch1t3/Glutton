FROM node:lts-alpine

WORKDIR /source

COPY . .

RUN apk add --no-cache chromium git gcompat glib nss libxcb libgcc chromium-chromedriver &&\
    git config --global --add safe.directory /source &&\
    npm install &&\
    chown -R node:node node_modules