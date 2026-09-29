FROM node:23-alpine

WORKDIR /generator

COPY dist dist
RUN npm install --global serve

EXPOSE 20018
CMD ["serve", "-l", "20018", "-s", "/generator/dist"]
