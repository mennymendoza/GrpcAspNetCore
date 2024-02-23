import React, { useEffect, useState } from 'react';

import { HelloRequest, ServerEventsRequest } from '../grpc-compiled/greet.ts';
import { Button, TextField } from '@mui/material';
import {client} from '../index.tsx';

export default function App(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [unaryResponse, setUnaryResponse] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const buttonHandler = async () => {
    let request: HelloRequest = HelloRequest.create({
      name: username
    });
    let  { response } = await client.sayHello(request);
    let unaryResponseMessage = response.message;
    console.log(`Unary response message: ${unaryResponseMessage}`);
    setUnaryResponse(unaryResponseMessage);
  };

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const readStream = async () => {
    var serverEventsRequest = ServerEventsRequest.create();
    var call = client.serverEvents(serverEventsRequest, {});
    
    console.log("Requesting stream from the backend server.");
    
    for await (let response of call.responses) {
      console.log("got response message: ", response);
    }

    console.log("Done setting up streaming.")
  };

  // runs on startup
  useEffect(() => {

    readStream();
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
