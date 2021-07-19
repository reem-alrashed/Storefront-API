# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Dependencies 

To install the dependencies for this project, run the following command: 

```
npm install
```


## Database setup

Start using postgres:
```
psql postgres
```
Create user:
```
CREATE USER store_user WITH PASSWORD '123';
```

Create dev and test databases:
```
CREATE DATABASE store;
CREATE DATABASE store_test;
```
Connect to dev database and grant all privileges:
```
\c store;
GRANT ALL PRIVILEGES ON DATABASE store TO store_user;
```
Connect to test database and grant all privileges:
```
\c store_test

GRANT ALL PRIVILEGES ON DATABASE store_test TO store_user;
```
Start migrations:
```
yarn dev-up
```

<img width="962" alt="Screen Shot 2021-07-18 at 3 39 50 PM" src="https://user-images.githubusercontent.com/68843028/126075199-451cf922-4fb7-4087-95e9-6aedfda8be6f.png">. 

## Environment Set up
Create an .env file and add the following variable along with their values

```
DB_NAME = store
DB_NAME_TEST = store_test
DB_HOST = localhost
DB_PORT = 5432
DB_USER = store_user
DB_PASS= 123123

BCRYPT_PASSWORD=i-am-name-2021
SALT_ROUNDS=10
TOKEN_TEST = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.J8BgsyqA3Y6F71NXbfuYIfRVuvRa_qb08RStxrCVhlQ
JWT_SECRET = 5ae8adc9731627905ebf0905dbe4a114ba7d8354ae1796772dfa523a2142761b78d48cbfcd98000bb94fbdbd8147f30de6b3484c3a060d389068204df6a50630
ENVI = dev
```

## Start the Server:
```
npm start
```
This command will run the server on port 3000.   

<img width="580" alt="Screen Shot 2021-07-18 at 8 17 42 PM" src="https://user-images.githubusercontent.com/68843028/126076340-406616d0-c526-4b9d-bddb-2a68619cfcbb.png">


## Running Ports
After starting the server, the server will start on port 3000 and the database on port 5432. 

## Endpoints
All endpoints are provided in REQUIREMENT.md file.

## Token and Authentication

Tokens are passed along with the http header as
```
Authorization Bearer <token>
```  


## Testing
Run test with
```
yarn test
```
<img width="813" alt="Screen Shot 2021-07-19 at 8 28 58 PM" src="https://user-images.githubusercontent.com/68843028/126202117-f9291a18-2e54-459a-b005-f77eed1c4c26.png">


