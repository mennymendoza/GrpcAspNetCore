import { useState } from 'react';
import { client } from '../index';
import { HelloRequest } from '../grpc-compiled/greet';

export const useSayHello = () => {
  const [helloResponse, setHelloResponse] = useState("");
  
  const sayHello = async (username: string) => {
    try {
      var helloRequest = HelloRequest.create({
        name: username
      });
      var { response } = await client.sayHello(helloRequest);
      setHelloResponse(response.message);
    }
    catch (err) {
        console.log(err);
    }
  };

  return {
    helloResponse,
    sayHello
  };
}