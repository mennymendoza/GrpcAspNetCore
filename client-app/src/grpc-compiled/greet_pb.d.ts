import * as jspb from 'google-protobuf'



export class HelloRequest extends jspb.Message {
  getName(): string;
  setName(value: string): HelloRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelloRequest.AsObject;
  static toObject(includeInstance: boolean, msg: HelloRequest): HelloRequest.AsObject;
  static serializeBinaryToWriter(message: HelloRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelloRequest;
  static deserializeBinaryFromReader(message: HelloRequest, reader: jspb.BinaryReader): HelloRequest;
}

export namespace HelloRequest {
  export type AsObject = {
    name: string,
  }
}

export class HelloReply extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): HelloReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelloReply.AsObject;
  static toObject(includeInstance: boolean, msg: HelloReply): HelloReply.AsObject;
  static serializeBinaryToWriter(message: HelloReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelloReply;
  static deserializeBinaryFromReader(message: HelloReply, reader: jspb.BinaryReader): HelloReply;
}

export namespace HelloReply {
  export type AsObject = {
    message: string,
  }
}

export class ServerEventsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServerEventsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ServerEventsRequest): ServerEventsRequest.AsObject;
  static serializeBinaryToWriter(message: ServerEventsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServerEventsRequest;
  static deserializeBinaryFromReader(message: ServerEventsRequest, reader: jspb.BinaryReader): ServerEventsRequest;
}

export namespace ServerEventsRequest {
  export type AsObject = {
  }
}

export class ServerEventsMessage extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): ServerEventsMessage;

  getSeverity(): string;
  setSeverity(value: string): ServerEventsMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServerEventsMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ServerEventsMessage): ServerEventsMessage.AsObject;
  static serializeBinaryToWriter(message: ServerEventsMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServerEventsMessage;
  static deserializeBinaryFromReader(message: ServerEventsMessage, reader: jspb.BinaryReader): ServerEventsMessage;
}

export namespace ServerEventsMessage {
  export type AsObject = {
    message: string,
    severity: string,
  }
}

