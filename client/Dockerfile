# build environment
FROM node:20-alpine AS build

WORKDIR /src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# production environment
FROM nginx:stable-alpine

# WORKDIR /usr/share/nginx/html
# # # # Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html

# # # # Copy config nginx
COPY --from=build /src/app/dist /usr/share/nginx/html

COPY --from=build /src/app/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

