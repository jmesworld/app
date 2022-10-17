const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middleware = jsonServer.defaults();
const LOCAL_SERVER_PATH = "0.0.0.0";
//const LOCAL_SERVER_PATH = "192.168.0.8";
const port = process.env.PORT || 3000;
const CONNECTION_URL = `http://${LOCAL_SERVER_PATH}:${3000}`;

server.use(middleware);
server.use(router);

server.listen(port, LOCAL_SERVER_PATH);
