import React, { useEffect, useState } from 'react';

import { Button, TextField } from '@mui/material';
import { useMessageStream } from '../custom-hooks/useMessageStream';
import { useSayHello } from '../custom-hooks/useSayHello';

export default function App(): JSX.Element {
  const [username, setUsername] = useState<string>("");

  const { message, readStream } = useMessageStream();
  const { helloResponse, sayHello } = useSayHello();

  const buttonHandler = async () => {
    await sayHello(username);
  };

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

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
      <p>Unary Response: {helloResponse}</p>
      <h2>Server Side Streaming gRPC</h2>
      <p>Server Message: {message}</p>
    </div>
  );
};
