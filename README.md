# React Chat Frontend :speech_balloon:
> This project is the backend of my personal project that i called React Chat. <br>

 [![Actions Status](https://github.com/veronesecoms/react-chat-front/workflows/CI/badge.svg)](https://github.com/veronesecoms/react-chat-front/actions) ![Uses TypeScript](https://img.shields.io/badge/Uses-Typescript-294E80.svg)
 <br>
If you're looking for the frontend of this project, [click here](https://github.com/veronesecoms/react-chat-front)

## Table of contents
* [General info](#general-info)
* [Apresentation](#apresentation)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)

## General info
This is a basic real time chat developed to increase my knowledge in React, Node.js and Socket.io. If you feel it can help you with something, feel free to use partly or totally this code. :yum: 

## Apresentation
![](public/ReactChatGif.gif)

## Technologies that i used
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/pt-br/)
* [Sequelize](https://sequelize.org/)
* [Socket.io](https://socket.io/)
* [Typescript](https://www.typescriptlang.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Helmet](https://helmetjs.github.io/)

## Setup
In the project directory, you can run:

``npm install``
Install the dependencies

``npx sequelize-cli db:migrate``
Run the migrations. You need to create a pg database called react-chat before run the migrations.

``npm run dev``
Runs the api in the development mode in: http://localhost:3100

## Features
* Register Account
* Confirm Account by email
* Recovery Password
* Login
* Change profile picture
* Find and talk to other persons

To-do list:
* Block persons
* Send files (gif, images, emojis);
* Exclude a message
* Change status (online, show as offline, busy...)

## Status
This project is being developed in my free time
