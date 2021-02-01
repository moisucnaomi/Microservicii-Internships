# Youbrary

The system consists of 4 projects:
- authentication-microservice
- book-microservice
- user-microservice
- youbrary-client

### Technologies

- Nestjs microservices on TCP:8875
- Mongodb
- Docker

## Order Web

A Single Page Application developed using Angular which is the client-side interface for users to manage and to check the orders.
A user can see the list of orders, check their statuses in real-time (websocket), and create or cancel an order.

### Technologies

- Angular
- Socket-io
- Rxjs
- Docker

## Running the app

Install Docker Desktop if you do not have it. Run docker package using docker-compose command

$ docker-compose up 

Then browse http://localhost:8085/orders

Web Api can be checked through http://localhost:8877/api/orders and you can access api documentation through http://localhost:8877/doc

Note: port 8875 and 8876 are not exposed by default in docker-compose.yml configuration. If you need them, you easily can change the config.