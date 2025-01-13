# Step 1: Use a lightweight Node.js image
FROM node:20-alpine as build

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and yarn.lock to the working directory
COPY ../../application/spa/package.json .
COPY ../../application/spa/yarn.lock .

# Step 5: Install dependencies
RUN yarn install

COPY ../../application/spa/. .

# Step 6: Build the React application
RUN yarn build

# Step 7: Serve the app using a lightweight web server (e.g., serve)
FROM nginx:alpine

# Step 8: Copy the build files from the previous stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Step 9: Expose port 80
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]