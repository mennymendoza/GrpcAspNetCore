#!/bin/bash

export GRPC_OUTPUT_PATH=./client-app/src/grpc-compiled
# If you want to change the greet.proto file, you need to re-compile the gRPC-web client libraries
# Follow the following steps:
# 1. Run the command 'sudo npm install -g protoc-gen-grpc-web' to globally install the grpc tool
# 2. Uncomment the following command and re-run this script
# protoc -I=./Protos greet.proto --js_out=import_style=commonjs,binary:$GRPC_OUTPUT_PATH --grpc-web_out=import_style=typescript,mode=grpcweb:$GRPC_OUTPUT_PATH

# Builds frontend from source
cd ./client-app/
npm install .
npm run build

# Copies frontend to wwwroot, where ASP.NET Core will look for static files
cd ../
rm -r ./wwwroot/*
cp -r ./client-app/build/* ./wwwroot/

# Publishes backend
dotnet publish --configuration Release

# Launches container
sudo docker compose up