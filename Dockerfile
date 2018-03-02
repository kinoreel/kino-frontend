FROM node:latest

# Install and configure `serve`.
RUN npm install -g serve
CMD serve -s src
EXPOSE 5000

# Install all dependencies of the current project.
COPY package.json package.json
RUN npm install

# Copy all local files into the image.
COPY . .

RUN npm run build