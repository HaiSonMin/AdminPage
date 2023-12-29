FROM node:20-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

# Remove the existing build folder
RUN rm -rf build

# # Run the build command
RUN npm run build

CMD [ "npm","run","start" ]
