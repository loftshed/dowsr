// from https://stackoverflow.com/questions/38511976/how-can-i-export-socket-io-into-other-modules-in-nodejs

// Since app.js is usually kind of the main initialization module in your app, it will typically both initialize the web server and socket.io and will load other things that are needed by the app. As such, a typical way to share io with other modules is by passing them to the other modules in that (index.js) module's constructor function. That would work like this:

// in index.js:
const server = require("http").createServer(app);
const io = require("socket.io")(server);
// load consumer.js and pass it the socket.io object
require("./consumer.js")(io);

// then, in consumer.js:
// define constructor function that gets `io` sent to it
module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("message", (message) => {
      logger.log("info", message.value);
      socket.emit("ditConsumer", message.value);
      console.log("from console", message.value);
    });
  });
};

//

// how to socket.io:

socket.emit("message", "this is a test"); //sending to sender-client only

socket.broadcast.emit("message", "this is a test"); //sending to all clients except sender

socket.broadcast.to("game").emit("message", "nice game"); //sending to all clients in 'game' room(channel) except sender

socket.to("game").emit("message", "enjoy the game"); //sending to sender client, only if they are in 'game' room(channel)

socket.broadcast.to(socketid).emit("message", "for your eyes only"); //sending to individual socketid

io.emit("message", "this is a test"); //sending to all clients, include sender

io.in("game").emit("message", "cool game"); //sending to all clients in 'game' room(channel), include sender

io.of("myNamespace").emit("message", "gg"); //sending to all clients in namespace 'myNamespace', include sender

socket.emit(); //send to all connected clients

socket.broadcast.emit(); //send to all connected clients except the one that sent the message

socket.on(); //event listener, can be called on client to execute on server

io.sockets.socket(); //for emiting to specific clients

io.sockets.emit(); //send to all connected clients (same as socket.emit)

io.sockets.on(); //initial connection from a client.
