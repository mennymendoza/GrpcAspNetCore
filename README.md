# Sample project using gRPC, ASP.NET Core and React SPA
This is a sample project for deploying an ASP.NET Core application with gRPC Services with a React SPA frontend. A couple of things to note:
* This project doesn't require a proxy, since it uses gRPC-Web. [More info](https://learn.microsoft.com/en-us/aspnet/core/grpc/grpcweb?view=aspnetcore-7.0)
* It configures the ASP.NET Core server to support HTTP/1.1 alongside HTTP/2; gRPC-Web specifically uses HTTP/1.1 for transmitting messages.
* Because the React SPA app is hosted on the same server as our gRPC services, this doesn't require any additional CORS configuration.
* It uses gRPC-Web, and thus doesn't support client-side streaming and bi-directional streaming.
## Dependencies
In order to deploy this application as it is, you need to install the following dependencies: node/npm, the .NET SDK and the Protobuf compiler.
### Installing node and npm
* This allows you to build a production-ready version of the frontend and to launch a frontend dev server if you'd like.
* Here's a link for installing NodeJs and NPM: [Installation Guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
### Installing the .NET 6 sdk
* This allows you to build dev and prod versions of the backend gRPC ASP.NET Core server
* I built this using .NET 6; it's advised to install the same version of the .NET SDK
* Here's a link for installing the .NET SDK: [Installation Guide](https://learn.microsoft.com/en-us/dotnet/core/install/)

## Deployment

To deploy the application, you can use the `deploy-app.sh` convenience script.

The script uses node, npm, the .NET 6 SDK and the Protobuf compiler. Make sure you have all of these installed before attempting to run this convenience script.

The script also attempts to run the application inside of a Docker container, but you can just comment this out if you don't have the Docker Engine and Docker Compose installed and don't plan to use them.

```
# sudo docker compose up
```

To run the application directly on your machine rather than within a Docker container, simply navigate to the `publish` directory and use the `dotnet` command to run the `GrpcAspNetCore.dll` application. At the minimum, you must have the .NET 6 Runtime installed. The .NET 6 SDK should do fine as well.
```
cd ./bin/Release/net6.0/publish
dotnet GrpcAspNetCore.dll
```
