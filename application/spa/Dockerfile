# Step 1: Use a lightweight Node.js image
FROM node:20-alpine as build

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and yarn.lock to the working directory
COPY package.json .
COPY yarn.lock .

# Step 5: Install dependencies
RUN yarn install

COPY . .

# Step 6: Build the React application
RUN yarn build

# Step 7: Serve the app using a lightweight web server (e.g., serve)
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 8: Copy the build files from the previous stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

