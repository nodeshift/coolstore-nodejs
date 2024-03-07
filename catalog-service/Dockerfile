FROM registry.access.redhat.com/ubi8/nodejs-20:latest

# Copy package.json and package-lock.json
COPY package.json ./

# Install npm production packages
RUN npm install

COPY . /opt/app-root/src

EXPOSE 7072

CMD ["npm", "start"]