// package: example
// file: example.proto

import * as example_pb from "./example_pb";
import {grpc} from "grpc-web-client";

type PingPingMe = {
  readonly methodName: string;
  readonly service: typeof Ping;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof example_pb.PingMessage;
  readonly responseType: typeof example_pb.PongMessage;
};

type PingStreamIn = {
  readonly methodName: string;
  readonly service: typeof Ping;
  readonly requestStream: true;
  readonly responseStream: false;
  readonly requestType: typeof example_pb.PingMessage;
  readonly responseType: typeof example_pb.PingCountMessage;
};

type PingStreamBack = {
  readonly methodName: string;
  readonly service: typeof Ping;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof example_pb.PingCountMessage;
  readonly responseType: typeof example_pb.PingMessage;
};

type PingStreamPing = {
  readonly methodName: string;
  readonly service: typeof Ping;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof example_pb.PingMessage;
  readonly responseType: typeof example_pb.PongMessage;
};

export class Ping {
  static readonly serviceName: string;
  static readonly PingMe: PingPingMe;
  static readonly StreamIn: PingStreamIn;
  static readonly StreamBack: PingStreamBack;
  static readonly StreamPing: PingStreamPing;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }
export type ServiceClientOptions = { transport: grpc.TransportConstructor; debug?: boolean }

interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: () => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<T> {
  write(message: T): BidirectionalStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): BidirectionalStream<T>;
  on(type: 'end', handler: () => void): BidirectionalStream<T>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<T>;
}

export class PingClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: ServiceClientOptions);
  pingMe(
    requestMessage: example_pb.PingMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: example_pb.PongMessage|null) => void
  ): void;
  pingMe(
    requestMessage: example_pb.PingMessage,
    callback: (error: ServiceError, responseMessage: example_pb.PongMessage|null) => void
  ): void;
  streamIn(metadata?: grpc.Metadata): RequestStream<example_pb.PingCountMessage>;
  streamBack(requestMessage: example_pb.PingCountMessage, metadata?: grpc.Metadata): ResponseStream<example_pb.PingMessage>;
  streamPing(metadata?: grpc.Metadata): BidirectionalStream<example_pb.PongMessage>;
}

