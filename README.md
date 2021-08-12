## Description

Backend repository.

## Requirements

- Node JS >= v14.17.4
- Mongo DB >= 5.0.2 (Previous versions should work fine too)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

- Load the data before you start to check the app, go to [Api](http://localhost:5000/load) once.
- Check api docs, go to [Docs](http://localhost:5000/apidoc).

## Test

- Before test, update .env file
  NODE_ENV=test
  MONGO_TEST_URI=mongodb://localhost/your-app-test-db

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## About

- Author - [Daniel López]
