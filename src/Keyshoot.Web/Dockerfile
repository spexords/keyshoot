FROM node:18
RUN npm install -g @angular/cli 
WORKDIR /app
EXPOSE 4200
COPY ["src/Keyshoot.Web/", "."]
RUN npm install
CMD ["ng","serve","--host", "0.0.0.0", "--disable-host-check"]
