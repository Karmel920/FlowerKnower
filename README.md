# FlowerKnower

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Usage](#usage)


## General Information
- Web application to classify flowers from photos


## Technologies Used
- React JS
- Python
- FastAPI
- PostgreSQL
- Spring
- Docker


## Features
List the ready features here:
- Identifying flowers from uploaded photos
- Adding discovery location
- Displaying number of uniqe discoveries
- Login in app
- Register in app
- Password changing
- Email changing


## Screenshots
![image](https://github.com/Karmel920/FlowerKnower/assets/91915476/68ad5520-8731-406b-a165-ee8f12c391ed)
![image](https://github.com/Karmel920/FlowerKnower/assets/91915476/4a3db39f-2792-4aba-80c6-2c9095bbca7c)
![image](https://github.com/Karmel920/FlowerKnower/assets/91915476/16f9967a-a517-4f3f-a293-2856b165402e)
![image](https://github.com/Karmel920/FlowerKnower/assets/91915476/666b05c2-1f08-4ea9-ab4a-656aec048811)
![image](https://github.com/Karmel920/FlowerKnower/assets/91915476/b05902f7-dd61-4a29-9b35-ddfcda2ed760)


## Usage
### Setup
1. Copy .env.sample to .env
2. Set values in .env file
3. Contact Valerii Pukas to get your access keys
4. Set keys in backend\src\main\resources\application.properties

### Run
1. Start docker containers in app root directory
  ```
  docker-compose up
  ```
When you made some changes in config docker file - use additional flag
  ```
  docker-compose up --build
  ```
Backend API >> `localhost:8080`<br>
Ml model API >> `localhost:5000`<br>
Client >> `localhost:9090`
