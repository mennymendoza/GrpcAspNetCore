import React, { useEffect, useState } from 'react';
import { GreeterClient } from '../grpc-compiled/GreetServiceClientPb';
import { HelloRequest, HelloReply, ServerEventsRequest, ServerEventsMessage } from '../grpc-compiled/greet_pb';
import { Button, TextField } from '@mui/material';

export default function App(): JSX.Element {
  let client: GreeterClient = new GreeterClient("/");
  const [username, setUsername] = useState<string>("");
  const [unaryResponse, setUnaryResponse] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const buttonHandler = async () => {
    let request: HelloRequest = new HelloRequest();
    request.setName(username);
    let response: HelloReply = await client.sayHello(request, {});
    let unaryResponseMessage = response.getMessage();
    console.log(`Unary response message: ${unaryResponseMessage}`);
    setUnaryResponse(unaryResponseMessage);
  };

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  // runs on startup
  useEffect(() => {
    var serverEventsRequest = new ServerEventsRequest();
    var responseStream = client.serverEvents(serverEventsRequest, {});
    
    console.log("Requesting stream from the backend server.");
    
    responseStream.on("data", (response: ServerEventsMessage) => {
      let message: string = response.getMessage() ?? "";
      console.log(`Stream response: ${message}`);
      setMessage(message);
    });

    console.log("Done setting up streaming.")

    return () => {
      responseStream.cancel();
    }
  }, []);

  return (
    <div>
      <h1>gRPC/ASP.NET Core/React Sample Application</h1>
      <h2>Unary gRPC</h2>
      <p>Type in your name and hit the button below to send a unary gRPC request to the backend server.</p>
      <TextField sx={{ display: "block" }} onChange={onTextFieldChange}/>
      <Button onClick={buttonHandler}>Send gRPC Request</Button>
      <p>Unary Response: {unaryResponse}</p>

      <h2>Server Side Streaming gRPC</h2>
      <p>Server Message: {message}</p>
    </div>
  );
};
