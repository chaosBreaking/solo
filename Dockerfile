FROM node:12.19.0-alpine

# Set a working directory
WORKDIR /usr/src/solo

# Install Node.js dependencies
RUN yarn install --production --no-progress

# Copy application files
COPY ./build .

# Set permissions for "node" user
RUN chown -R node:node /usr/src/solo
RUN chmod 755 /usr/src/solo

# Run the container under "node" user by default
USER node

# Set NODE_ENV env variable to "production" for faster expressjs
ENV NODE_ENV production

CMD [ "npm", "run build" ]
