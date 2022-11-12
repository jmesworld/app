const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middleware = jsonServer.defaults();
const LISTENING_SERVER_PATH = "0.0.0.0";
//const LISTENING_SERVER_PATH = "192.168.0.8";
const port = process.env.PORT || 3001;
const CONNECTION_URL = `http://${LISTENING_SERVER_PATH}:${port}`;

server.use(middleware);
server.use(router);
console.log(`server listening on ${CONNECTION_URL}`);
server.listen(port, LISTENING_SERVER_PATH);
