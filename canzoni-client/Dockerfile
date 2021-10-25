FROM node:alpine
WORKDIR /client
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
RUN npm install
COPY ./ ./
EXPOSE 3000
CMD ["npm", "run", "start"]
