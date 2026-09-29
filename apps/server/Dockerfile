FROM node:23-alpine

WORKDIR /ape
COPY dist dist
COPY node_modules node_modules
COPY assets assets
COPY package.json ./

EXPOSE 10018
CMD ["npm", "run", "start:dist"]
