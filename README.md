<p align="center">
  <a href="https://dyno-chat.herokuapp.com">
    <img src="./client/src/assets/images/logo.svg" alt="Dyno Chat" width="400" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/exshak/chat-site">
    <img src="https://img.shields.io/badge/build-passing-success.svg" alt="build: status"/>
  </a>
  <a href="https://material-ui.com">
    <img src="https://img.shields.io/badge/style-%F0%9F%92%85%20material_ui-orange.svg?colorB=daa357&colorA=db748e" alt="style: material ui"/>
  </a>
  <a href="https://mongodb.com">
    <img src="https://img.shields.io/badge/database-mongodb-00bbcc.svg" alt="database: mongodb"/>
  </a>
  <a href="https://expressjs.com">
    <img src="https://img.shields.io/badge/server-express-00cc99.svg" alt="server: express"/>
  </a>
  <a href="https://dyno-chat.herokuapp.com">
    <img src="https://heroku-badge.herokuapp.com/?app=dyno-chat" alt="heroku: status"/>
  </a>
</p>

---

Dyno Chat is an automotive enthusiast discussion site with real-time chat, designed with Material UI and created with Node.js using Express and MongoDB. Client-side is made with React, Redux and axios to make HTTP requests to Server-side RESTful APIs.

_Have a great idea to contribute? Make a pull request, I'm always looking for ways to improve [Dyno Chat](https://dyno-chat.herokuapp.com)._

## Features

- Material UI Design
- MongoDB NoSQL Schema
- Express validation
- JWT Authentication
- Redux Thunk Async
- Heroku CD
- PWA
- SEO

## Quick Start

Clone repository, install dependencies, start server

```sh
git clone https://github.com/exshak/chat-site.git
cd chat-site && yarn   # npm install
cd client && yarn      # npm install
cd .. && yarn dev      # npm start
# to deploy
yarn build             # npm build
```

Visit site at _`localhost:3000`_

## Built With

- [React](https://reactjs.org)
- [Redux](https://redux.js.org)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [Redux Logger](https://github.com/LogRocket/redux-logger)
- [Material UI](https://material-ui.com)
- [MongoDB](https://mongodb.com)
- [Express](https://expressjs.com)
- [Heroku](https://heroku.com)

#### Folder Structure

```sh
client/
├── public            # SEO manifest
├── src
│   ├── assets        # Icons and images
│   ├── components    # Javascript and css
│   ├── pages         # Site pages and routes
│   ├── redux         # Actions, reducers, store
│   └── routes        # Authenticated routes
└── index.tsx         # Provider, router
```

## License

[MIT](./LICENSE)
