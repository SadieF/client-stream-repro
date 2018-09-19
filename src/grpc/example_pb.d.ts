/* eslint-disable */
// package: api
// file: example.proto

import * as jspb from "google-protobuf";

export class PingMessage extends jspb.Message {
  getGreeting(): string;
  setGreeting(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingMessage.AsObject;
  static toObject(includeInstance: boolean, msg: PingMessage): PingMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PingMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingMessage;
  static deserializeBinaryFromReader(message: PingMessage, reader: jspb.BinaryReader): PingMessage;
}

export namespace PingMessage {
  export type AsObject = {
    greeting: string,
  }
}

export class PongMessage extends jspb.Message {
  getResponse(): string;
  setResponse(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PongMessage.AsObject;
  static toObject(includeInstance: boolean, msg: PongMessage): PongMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PongMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PongMessage;
  static deserializeBinaryFromReader(message: PongMessage, reader: jspb.BinaryReader): PongMessage;
}

export namespace PongMessage {
  export type AsObject = {
    response: string,
  }
}

export class PingCountMessage extends jspb.Message {
  getCount(): number;
  setCount(value: number): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingCountMessage.AsObject;
  static toObject(includeInstance: boolean, msg: PingCountMessage): PingCountMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PingCountMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingCountMessage;
  static deserializeBinaryFromReader(message: PingCountMessage, reader: jspb.BinaryReader): PingCountMessage;
}

export namespace PingCountMessage {
  export type AsObject = {
    count: number,
    message: string,
  }
}

export class StreamPingMessage extends jspb.Message {
  getCount(): number;
  setCount(value: number): void;

  getMsg(): string;
  setMsg(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamPingMessage.AsObject;
  static toObject(includeInstance: boolean, msg: StreamPingMessage): StreamPingMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StreamPingMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamPingMessage;
  static deserializeBinaryFromReader(message: StreamPingMessage, reader: jspb.BinaryReader): StreamPingMessage;
}

export namespace StreamPingMessage {
  export type AsObject = {
    count: number,
    msg: string,
  }
}

