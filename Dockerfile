# Use the official Node.js 19 Alpine image
FROM node:19-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the Next.js app for production
# RUN npm run build

# Expose port 3000 (default port for Next.js)
EXPOSE 3000

# Start the Next.js production server
# CMD ["npm", "run", "start"]

# Start the Next.js development server
CMD ["npm", "run", "dev"]

# This pulls the node:19-alpine image from docker hub
# Creates the Docker Image using the Dockerfile
# This actually packs all of the libraries and stuff inside the image and then we can push and deploy it anywhere, even on AWS lambda and then it can run and execute the image.
# docker run -p [HOST_CONTAINER_PORT]:[DOCKER_CONTAINER_PORT] food-delivery-app
# Basically inside the docker container the application is running on DOCKER_CONTAINER_PORT but on the host machine it is running on
# HOST_CONTAINER_PORT