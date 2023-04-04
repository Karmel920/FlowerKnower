# FlowerKnower

### Setup
1. Copy .env.sample to .env
2. Set values in .env file

### Run
1. Start docker containers in app root directory
  ```
  docker-compose up
  ```
When you made some changes in config docker file - use additional flag
  ```
  docker-compose up --build
  ```

API >> `localhost:8080`<br>
Client >> `localhost:9090`
