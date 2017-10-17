# Blockchain 4.0

## Description
Frontend and Backend 
## Setup the Project 
the setup of the project contains 3 step which include the Ethereum client to running up to provide the test account to the backend and backend api will be proived the data to the frontend.

## 1.Run Etherum Client
`testrpc`
(normally starts at localhost:8545)

## 2.Start Backend
Navigate to backend/applet and

Change the entry ETHEREUM_CLIENT_IP in docker-compose.yml to your local IP (ip testrpc is running on) and build docker to Run the Backend

`docker-compose up --build`
## 3.Start Frontend

provide the AEC Block Chain backend API_URL in angular rest-api provide:


`src->app->restapi.service.ts`

`public _url:string ="http://localhost:8080";`

Run `ng serve` for a dev server. 

Navigate to `http://localhost:4200/`. 

The app will automatically reload if you change any of the source files.
or
App can be run using the docker 

`docker-compose up --build`