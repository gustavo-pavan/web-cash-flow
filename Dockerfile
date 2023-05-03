FROM node:18-alpine3.15
WORKDIR /app
COPY package*.json ./
RUN npm install -f
COPY . ./
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]
