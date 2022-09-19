# menu-app-soa

This is a node.js app developed to represent a subset of use-cases from the proposed menu system design using the microservices architecture.

## Running the project

Build each service's Docker image

```bash
$ docker build -t menu-app/main-service ./main-service
$ docker build -t menu-app/acesso-service ./acesso-service
$ docker build -t menu-app/login-externo-service ./login-externo-service
```

Run all containers with docker compose

```bash
$ docker-compose up
```
