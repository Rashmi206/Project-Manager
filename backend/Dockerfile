# Create image based on the official Node 6 image from dockerhub
FROM node:11 as node

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/backend

ENV MONGO_URL=mongodb://mongo:27017/ProjectManager

# Copy dependency definitions
COPY package*.json ./

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . .

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]