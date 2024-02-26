import { useState } from 'react';
import { client } from '../index';
import { ServerEventsRequest } from '../grpc-compiled/greet';

export const useMessageStream = () => {
  const [message, setMessage] = useState("");
  
  const readStream = async () => {
    try {
      var serverEventsRequest = ServerEventsRequest.create();
      var call = client.serverEvents(serverEventsRequest);
      for await (let response of call.responses) {
        setMessage(response.message);
      }
    }
    catch (err: any) {
      if (err.code != "INTERNAL") {
        console.log(err);
      }
    }
  };

  return {
    message,
    readStream
  };
}
  
