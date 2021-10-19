FROM node:14.15.3 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run test

RUN npm run build

FROM node:14.15.3-alpine AS runner

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json .
COPY --from=builder /app/node_modules/ .

EXPOSE 3001

ENTRYPOINT ["npm"]

CMD ["run", "start:prod"]