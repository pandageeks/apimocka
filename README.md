<p align="center">
  <a href="https://apimocka.com/" target="_blank">
    <img alt="APImocka" src="https://apimocka.com/images/logo.png" width="500">
  </a>
</p>

[![Travis CI Build Status](https://travis-ci.org/ghostffcode/apimocka.svg?branch=master)](https://travis-ci.org/ghostffcode/apimocka)
[![David Dependancy Status](https://david-dm.org/ghostffcode/apimocka.svg)](https://david-dm.org/ghostffcode/apimocka)
[![npm package](https://img.shields.io/npm/v/apimocka.svg)](https://www.npmjs.com/package/apimocka)
[![npm package](https://img.shields.io/npm/dm/apimocka.svg)](https://www.npmjs.com/package/apimocka)

## Introduction

APImocka helps you create a quick hosted API server populated with mock data using the [faker API](http://marak.github.io/faker.js/).

This is mostly used for but not limited to quick prototyping, tests and/or simultaneously developing UI and backend API.

## Features

- Authenticate with the APImocka server.
- deploy/delete mocks.
- Run local version of mocks.

## Table Of Content
* [Getting Started](#getting-started)
* [Mock API](#mock-api)
* [Mock Configuration](#mock-configuration)
* [CLI Commands](#cli-commands)

## Getting Started

### Installation

```bash
# via npm
npm install -g apimocka
# via yarn
yarn global add apimocka
```

### Authenticate
```bash
# register an account
apimocka register

#...
# login to your account
apimocka login
```

### Create a Simple Mock config file
```json
{
    "total": 5,
    "name": "trial",
    "routes": {
        "users": {
            "fullname": "name.firstName name.lastName",
            "avatar": "internet.avatar",
            "username": "internet.userName",
            "password": "internet.password"
        }
    }
}
```
save file as `trialMock.json`

To learn more about customizing your mock config file, check [here](#mock-configuration)

### Deploy mock
```bash
apimocka deploy path/to/trialMock.json
```

## Mock API
After creating a new mock, you get a personalized URL in the format:
```
https://mockd.co/{mockId}
```

### Mock requests

All requests made to the `mockd.co` server must have the content-type header set to `application/json` 

|   Path `(https://mockd.co/{projectId})` | Allowed Request type  |       Description
|-----------------------------------------|-----------------------|---------------------------------
|/ 			 	                          | GET					| fetches all mock information
|/{route} 	 	                          | GET					| fetches all data in specified route
| 			 	                          | POST					| Adds new data to route
|/{route}/{id} 	                          | GET					| Fetches data in specified index
| 				                          | PUT					| Replaces any specified field with new data
|				                          | DELETE				| Delete specified index and all it's child contents
|/{route}/verify                          | POST                  | Pass any object and verify if any match exists in specified route


# Mock Configuration

A mock configuration file is used to specify mock settings, routes structure, and total number of data to mock for each route.

The mock data is generated using the **[faker API](http://marak.github.io/faker.js/#toc8__anchor)**

**Format: `JSON` or `YAML`**

## Sample
A simple configuration file looks like:

JSON format:

```json
{
    "total": 5,
    "name": "trial",
    "routes": {
        "users": {
            "fullname": "name.firstName name.lastName",
            "avatar": "internet.avatar",
            "username": "internet.userName",
            "password": "internet.password"
        }
    }
}
```

YAML format:

```yaml
---
total: 5
name: trial
routes:
  users:
    fullname: name.firstName name.lastName
    avatar: internet.avatar
    username: internet.userName
    password: internet.password
```

# CLI Commands

### Administrative commands

|        Command         |       Description
|------------------------|-----------------------------
|**register**            | Create a new APImocka account
|**login**               | Authenticate to your APImocka account
|**list**                | Show all your available mocks
|**deploy [configFile]** | Create a new mock from config file
|**delete [mockId]**     | Delete an existing mock

### Localization

|        Command         |           Description
|------------------------|-------------------------------------
|**localize [mockId]**   | Run a local version of existing mock


