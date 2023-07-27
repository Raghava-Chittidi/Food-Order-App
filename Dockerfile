FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY app ./app
COPY models ./models
COPY components ./components
COPY store ./store
COPY util ./util
COPY public ./public
COPY __tests__ ./__tests__
COPY next.config.js .
COPY jsconfig.json .
COPY jest.config.mjs .

CMD ["npm", "start"]