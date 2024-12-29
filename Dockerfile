# bookworm images are more secure compared to alpine
FROM node:bookworm-slim as build

ENV NODE_ENV=production 

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

# pnpm must be installed as it doesn't come with the default image
RUN npm i -g pnpm
COPY . ./

RUN pnpm i
RUN pnpm build

FROM node:bookworm-slim

WORKDIR /usr/src/app
# install conversion utils
RUN mkdir uploadbox
RUN mkdir uploadbox/tmp
RUN mkdir uploadbox/converted
RUN apt update
RUN apt install -y calibre

COPY --from=build /usr/src/app .
# ENV HOST is not though you can uncomment if if needed
# ENV HOST=0.0.0.0
EXPOSE 4173

CMD ["node","build"]