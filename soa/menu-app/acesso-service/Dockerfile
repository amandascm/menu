FROM node:16

# Create app directory
WORKDIR /usr/menu-app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY tsconfig.json ./

# Bundle app source
COPY src ./src
RUN npm install

# Expose port where app will run
EXPOSE 5000

# Run the app
CMD ["npm","run","start"]
