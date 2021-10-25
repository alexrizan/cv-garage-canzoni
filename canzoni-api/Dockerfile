FROM node:alpine

WORKDIR /api
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY configs.ts ./

RUN npm install

COPY src /api/src

RUN npm run build

EXPOSE 9090

CMD ["npm", "run", "debug"]
