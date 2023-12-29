FROM node:18.16.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Install global dependencies
RUN npm install -g nodemon

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm rebuild

# Install the bcrypt module from source
RUN npm install express mongoose cors
RUN npm install dotenv
RUN npm install jsonwebtoken
RUN npm install bcrypt
RUN npm install express-rate-limit
RUN npm install multer



RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Expose a port (e.g., 3000) that your application will listen on
EXPOSE 5000

# Define the command to start your application
CMD ["nodemon", "server.js"]