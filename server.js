const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middleware = jsonServer.defaults();
const LOCAL_SERVER_PATH = "192.168.0.2";
const port = process.env.PORT || 3000;
const CONNECTION_URL = `http://${LOCAL_SERVER_PATH}:${3000}`;

server.use(middleware);
server.use(router);

server.listen(port);
