FROM --platform=arm64 node:18-alpine

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
RUN npm run build
EXPOSE 80

CMD ["npm", "start"]