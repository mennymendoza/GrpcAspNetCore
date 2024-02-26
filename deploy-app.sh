#!/bin/bash

export GRPC_OUTPUT_PATH=./client-app/src/grpc-compiled

# Installs npm dependencies
cd ./client-app/
npm install .

# Recompiles greet.proto file into Typescript/Javascript
npm run gen:protobuf-ts

# Builds frontend from source
npm run build

# Copies frontend to wwwroot, where ASP.NET Core will look for static files
cd ../
rm -r ./wwwroot/*
cp -r ./client-app/dist/* ./wwwroot/

# Publishes backend
dotnet publish --configuration Release

# Launches container
sudo docker compose up