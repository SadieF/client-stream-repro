// package: example
// file: service.proto

var service_pb = require("./service_pb");
var example_pb = require("./example_pb");
var grpc = require("grpc-web-client").grpc;

var Ping = (function () {
  function Ping() {}
  Ping.serviceName = "example.Ping";
  return Ping;
}());

Ping.PingMe = {
  methodName: "PingMe",
  service: Ping,
  requestStream: false,
  responseStream: false,
  requestType: example_pb.PingMessage,
  responseType: example_pb.PongMessage
};

Ping.StreamIn = {
  methodName: "StreamIn",
  service: Ping,
  requestStream: true,
  responseStream: false,
  requestType: example_pb.PingMessage,
  responseType: example_pb.PingCountMessage
};

Ping.StreamBack = {
  methodName: "StreamBack",
  service: Ping,
  requestStream: false,
  responseStream: true,
  requestType: example_pb.PingCountMessage,
  responseType: example_pb.PingMessage
};

Ping.StreamPing = {
  methodName: "StreamPing",
  service: Ping,
  requestStream: true,
  responseStream: true,
  requestType: example_pb.PingMessage,
  responseType: example_pb.PongMessage
};

exports.Ping = Ping;

function PingClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PingClient.prototype.pingMe = function pingMe(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Ping.PingMe, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

PingClient.prototype.streamIn = function streamIn(metadata) {
  var listeners = {
    end: [],
    status: []
  };
  var client = grpc.client(Ping.StreamIn, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.end.forEach(function (handler) {
      handler();
    });
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      if (!client.started) {
        client.start(metadata);
      }
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

PingClient.prototype.streamBack = function streamBack(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Ping.StreamBack, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.end.forEach(function (handler) {
        handler();
      });
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

PingClient.prototype.streamPing = function streamPing(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(Ping.StreamPing, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.end.forEach(function (handler) {
      handler();
    });
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.PingClient = PingClient;

