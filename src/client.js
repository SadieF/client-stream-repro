import { PingClient } from "./grpc/example_pb_service";
import { PingCountMessage, PingMessage } from "./grpc/example_pb";

const url = "http://localhost:90";
const c = new PingClient(url);

// // Unary Request -- works fine
// // rpc PingMe(PingMessage) returns (PongMessage) {}
const query = new PingMessage();
query.setGreeting("Meow");
c.pingMe(query, null, (err, response) => {
  if (err) {
    console.log("pingMe request error: ", err);
  } else {
    console.log("pingMe request response: ", response.toObject());
  }
});

// //Server streaming -- this works fine
// // rpc StreamBack(PingCountMessage) returns (stream PingMessage) {}
const queryBack = new PingCountMessage();
queryBack.setCount(2);
queryBack.setMessage("cat");

var streamBack = c.streamBack(queryBack, null);
streamBack.on("data", function(response) {
  console.log("stream back response data: ", response.toObject());
});
streamBack.on("end", () => {
  console.log("stream back end");
});

// bidirectional streaming
// rpc StreamPing(stream PingMessage) returns (stream PongMessage) {}
var bidiStream = c.streamPing();
bidiStream.on("data", resp => {
  console.log("bidi stream mesg: ", resp.toObject());
});
bidiStream.on("status", resp => {
  console.log("bidi stream status: ", resp);
});
bidiStream.on("end", () => {
  console.log("bidi stream over");
});

query.setGreeting("Meow 1 ");
bidiStream.write(query);
query.setGreeting("Meow 2");
bidiStream.write(query);
query.setGreeting("Meow 3");
bidiStream.write(query);
bidiStream.end();

// // Client Streaming
// // rpc StreamIn(stream PingMessage) returns (PingCountMessage) {}
var stream2 = c.streamIn();
stream2.on("status", (a, b, c) => {
  console.log("stream in status: ", a, b, c);
});
stream2.on("end", () => {
  console.log("stream in end");
});

query.setGreeting("Bark 1");
stream2.write(query);
query.setGreeting("Bark 2");
stream2.write(query);
query.setGreeting("Bark 3");
stream2.write(query);
query.setGreeting("Bark 4");
stream2.write(query);
stream2.end();
// how to get returned PingCountMessage that server returns?

export default "various GRPC calls";
