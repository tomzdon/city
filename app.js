const express = require("express");
const app = express();
const url = require("url");
let http = require("http").Server(app);
const io = require("socket.io")(http);
const RTCMultiConnectionServer = require("rtcmulticonnection-server");

var isUseHTTPs = false;

const jsonPath = {
  config: "config.json",
  logs: "logs.json",
};

app.use(express.static("./public/"));
app.use(express.static("./public/libs"));
app.use(express.static("./public/assets"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "./public/index.html");
});

const BASH_COLORS_HELPER = RTCMultiConnectionServer.BASH_COLORS_HELPER;
const getValuesFromConfigJson =
  RTCMultiConnectionServer.getValuesFromConfigJson;
const getBashParameters = RTCMultiConnectionServer.getBashParameters;
const resolveURL = RTCMultiConnectionServer.resolveURL;

var config = getValuesFromConfigJson(jsonPath);
config = getBashParameters(config, BASH_COLORS_HELPER);

if (isUseHTTPs === false) {
  isUseHTTPs = config.isUseHTTPs;
}

io.sockets.on("connection", function (socket) {
  socket.userData = { x: 0, y: 0, z: 0, heading: 0 }; //Default values;

  console.log(`${socket.id} connected`);
  socket.emit("setId", { id: socket.id });

  socket.on("disconnect", function () {
    socket.broadcast.emit("deletePlayer", { id: socket.id });
  });

  RTCMultiConnectionServer.addSocket(socket, config);

  const params = socket.handshake.query;

  if (!params.socketCustomEvent) {
    params.socketCustomEvent = "custom-message";
  }

  socket.on(params.socketCustomEvent, function (message) {
	console.log(`${params.socketCustomEvent} params ${message}`);
    socket.broadcast.emit(params.socketCustomEvent, message);
  });

  socket.on("init", function (data) {
    console.log(`socket.init ${data.model}`);
    socket.userData.model = data.model;
    socket.userData.colour = data.colour;
    socket.userData.x = data.x;
    socket.userData.y = data.y;
    socket.userData.z = data.z;
    socket.userData.heading = data.h;
    (socket.userData.pb = data.pb), (socket.userData.action = "Idle");
  });

  socket.on("update", function (data) {
    socket.userData.x = data.x;
    socket.userData.y = data.y;
    socket.userData.z = data.z;
    socket.userData.heading = data.h;
    (socket.userData.pb = data.pb), (socket.userData.action = data.action);
  });

  socket.on("chat message", function (data) {
    console.log(`chat message:${data.id} ${data.message}`);
    io.to(data.id).emit("chat message", {
      id: socket.id,
      message: data.message,
    });
  });
  
  socket.on("chat voice", function (data) {
    console.log(`chat voice:${data.id}`);
    io.to(data.id).emit("chat voice", {
      id: socket.id,
      message: 'open',
    });
  });
});

RTCMultiConnectionServer.beforeHttpListen(http, config);
http = http.listen(
  process.env.PORT || 5000,
  process.env.IP || "0.0.0.0",
  function () {
    RTCMultiConnectionServer.afterHttpListen(http, config);
  }
);
setInterval(function () {
  const nsp = io.of("/");
  let pack = [];

  for (let id in io.sockets.sockets) {
    const socket = nsp.connected[id];
    //Only push sockets that have been initialised
    if (socket.userData.model !== undefined) {
      pack.push({
        id: socket.id,
        model: socket.userData.model,
        colour: socket.userData.colour,
        x: socket.userData.x,
        y: socket.userData.y,
        z: socket.userData.z,
        heading: socket.userData.heading,
        pb: socket.userData.pb,
        action: socket.userData.action,
      });
    }
  }
  if (pack.length > 0) io.emit("remoteData", pack);
}, 40);
