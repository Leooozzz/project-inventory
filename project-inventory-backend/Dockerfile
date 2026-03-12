FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache \
    netcat-openbsd \
    postgresql-client 

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["sh", "./entrypoint.sh"]