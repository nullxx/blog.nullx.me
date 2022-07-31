FROM node:14.18.2-alpine3.15 as builder

RUN mkdir /app
WORKDIR /app
ADD . /app

RUN npm i
RUN npm run build

FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
