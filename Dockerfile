# bookworm images are more secure compared to alpine
FROM node:slim as build

ENV NODE_ENV=production 

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

# pnpm must be installed as it doesn't come with the default image
RUN npm i -g pnpm
RUN pnpm i

COPY . ./
RUN pnpm build

FROM node:slim

WORKDIR /usr/src/app
# install conversion utils
RUN mkdir uploadbox
RUN mkdir uploadbox/tmp
RUN mkdir uploadbox/converted
RUN apt update
RUN apt install -y calibre

COPY --from=build /usr/src/app .
EXPOSE 3000

CMD ["node","build"]