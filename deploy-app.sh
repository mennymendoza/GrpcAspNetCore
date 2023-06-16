#!/bin/bash

export GRPC_OUTPUT_PATH=./client-app/src/grpc-compiled

# Recompiles greet.proto file into Typescript/Javascript
protoc -I=./Protos greet.proto --js_out=import_style=commonjs:$GRPC_OUTPUT_PATH --grpc-web_out=import_style=typescript,mode=grpcwebtext:$GRPC_OUTPUT_PATH

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