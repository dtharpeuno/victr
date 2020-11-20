# pull official base image
FROM node:12.12-stretch
RUN useradd -ms /bin/bash victr
RUN mkdir /opt/app
RUN chown victr /opt/app
WORKDIR /opt/app
USER victr
ENV PATH /dist/app/node_modules/.bin:$PATH
COPY --chown=victr package.json ./
RUN npm install
COPY --chown=victr . ./
EXPOSE 3000

# start app
CMD ["npm", "start"]