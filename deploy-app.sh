#!/bin/bash

# If you want to change the greet.proto file, you need to re-compile the gRPC-web client libraries
# Run the command 'npm install -g protoc-gen-grpc-web' to globally install the tool and then run the following command
export GRPC_OUTPUT_PATH=./ClientApp/src/grpc-compiled
protoc -I=./Protos greet.proto --js_out=import_style=commonjs,binary:$GRPC_OUTPUT_PATH --grpc-web_out=import_style=typescript,mode=grpcweb:$GRPC_OUTPUT_PATH

# Builds frontend from source
cd ./ClientApp/
npm install .
npm run build

# Copies frontend to wwwroot, where ASP.NET Core will look for static files
cd ../
rm -r ./wwwroot/*
cp -r ./ClientApp/build/* ./wwwroot/

# Publishes backend
dotnet publish --configuration Release

# Launches container
sudo docker compose up