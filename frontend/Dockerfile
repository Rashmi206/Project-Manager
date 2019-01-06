# # Create image based on the official Node 6 image from dockerhub
# FROM node:11 as node

# # Change directory so that our commands run inside this new directory
# WORKDIR /usr/src/app

# # Copy dependency definitions
# COPY package*.json ./

# # Install dependecies
# RUN npm install

# # Get all the code needed to run the app
# COPY . .

# # Expose the port the app runs in
# EXPOSE 4200

# # Serve the app
# CMD ["npm", "start"]

# Stage 1
FROM node:11 as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Stage 2
FROM nginx:alpine

COPY --from=node /usr/src/app/dist/frontend /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80