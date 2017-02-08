let util = require("util"),
  EventEmitter = require("events").EventEmitter,
  CONNECTING = 0,
  OPENED = 1,
  CLOSED = 3;

function WSClientMock() {
  EventEmitter.call(this);
  this.messages = []; // output
  this.readyState = CONNECTING;
}

util.inherits(WSClientMock, EventEmitter);

WSClientMock.prototype.send = function send(msg) {
  this.messages.push(msg);
};

WSClientMock.prototype.close = function close() {
  this.readyState = CLOSED;
};

WSClientMock.prototype.open = function open() {
  this.readyState = OPENED;
};

WSClientMock.prototype.sendMsgToServer = function sendMsgToServer(msg) {
  this.emit("message", msg);
};

WSClientMock.prototype.closeConnection = function closeConnection() {
  this.close();
  this.emit("close", []);
};

module.exports = WSClientMock;
