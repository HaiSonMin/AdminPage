FROM node:20-alpine AS build

WORKDIR /src/app

COPY package*.json .

RUN npm install 

COPY . .

FROM nginx:stable-alpine

# WORKDIR /usr/share/nginx/html
# # # # Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d/default.conf

# # # # Copy config nginx
COPY --from=build /src/app/dist /usr/share/nginx/html

COPY --from=build /src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]

