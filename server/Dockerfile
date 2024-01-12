# Use a specific Node.js version
FROM node:20-alpine

# Set working directory
WORKDIR /src/app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install typescript@latest --save-dev
RUN npm install 
# RUN npm install -g npm@10.2.5

# Copy the rest of the application files
COPY . .

# Expose port 9000
EXPOSE 9000

# Remove the existing build folder
RUN rm -rf /src/app/build

# Run the build command
RUN npm run build 

# Start the application
CMD ["npm", "run", "start"]

