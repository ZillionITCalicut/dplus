FROM node:18.16.0


WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
RUN npm cache clean --force


RUN npm rebuild

#RUN npm install mdb-react-ui-kit@6.3.0
RUN npm install @fortawesome/fontawesome-free
RUN npm install bootstrap
RUN npm install react-bootstrap
RUN npm install @mui/material
RUN npm install @emotion/react @emotion/styled
RUN npm install @mui/x-data-grid
RUN npm install animate.css --save
RUN npm install axios
RUN npm install jquery
RUN npm install swiper
RUN npm install qrcode.react
RUN npm install react-image-lightbox
RUN npm install --save react-grid-gallery

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]