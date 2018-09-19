import { PingClient } from "./grpc/example_pb_service";
import { PingMessage, PingCountMessage } from "./grpc/example_pb";
import { grpc } from "grpc-web-client";

// Unary Request - This Works
const query = new PingMessage();
query.setGreeting("Meow");

const c = new PingClient("https://example.bibabots.com:4443");
c.pingMe(query, null, (err, response) => {
  console.log(response, err);
  //   console.log("Hello client ", response.toObject().response);
});

// Server Streaming = This works
const queryBack = new PingCountMessage();
queryBack.setCount(10);
queryBack.setMessage("cat");

const b = new PingClient("https://example.bibabots.com:4443");
var stream = b.streamBack(queryBack, null, (err, response) => {});
stream.on("data", function(response) {
  console.log("Streaming works: ", response.toObject());
});
stream.on("end", (resp, err) => {
  console.log("status", resp, err);
});

//Client Streaming
const queryIn = new PingMessage();
queryIn.setGreeting("meerkat");

const n = new PingClient("https://example.bibabots.com:4443");
var stream = n.streamIn(queryIn, null, (err, response) => {});
stream.on("data", function(response) {
  console.log("Streaming works: ", response.toObject());
});
stream.on("end", (resp, err) => {
  console.log("status", resp, err);
});

const test = () => {
  var msg = {};

  return msg;
};
export default test;
