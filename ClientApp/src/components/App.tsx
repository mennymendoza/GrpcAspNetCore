import React from 'react';
import { GreeterClient } from '../grpc-compiled/GreetServiceClientPb';
import { HelloRequest, HelloReply } from '../grpc-compiled/greet_pb';
import { Button } from '@mui/material';

export default function App(): JSX.Element {
  let client: GreeterClient = new GreeterClient("/");

  const buttonHandler = async () => {
    let request: HelloRequest = new HelloRequest();
    request.setName("Juan");
    let response: HelloReply = await client.sayHello(request, {});
    console.log(response.getMessage());
  }

  return (
    <div>
      <h1>Welcome to My React App</h1>
      <p>This is the starting point of your React application.</p>
      <Button onClick={buttonHandler}>Send gRPC Request</Button>
    </div>
  );
};
