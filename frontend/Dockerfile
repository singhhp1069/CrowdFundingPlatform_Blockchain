FROM node:6.9.4

#Maintainer
MAINTAINER HAR PREET SINGH singh.1@campus.tu-berlin.de 

# Create app directory

RUN mkdir -p /frontapp
WORKDIR /frontapp
COPY package.json /frontapp
RUN npm install
COPY . /frontapp


EXPOSE 4200

#run the project
CMD [ "npm", "start" ]
