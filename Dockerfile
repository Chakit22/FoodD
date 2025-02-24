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
RUN npm run build

# Expose port 3000 (default port for Next.js)
EXPOSE 3000

# Start the Next.js production server
# CMD ["npm", "run", "start"]

# Start the Next.js development server
CMD ["npm", "run", "dev"]