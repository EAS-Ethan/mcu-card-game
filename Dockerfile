FROM node:alpine
COPY ./node_app /app
WORKDIR /app
RUN npm install
CMD ["node", "index.js"]
