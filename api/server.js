const express = require('express');

const server = express();

const middleware = require('./config/middleware');

// import routers
// const {
//   authRouter,
//   usersRouter,
// } = require('./routes');

middleware(server); // third-party middleware

server.use(express.json());

// routers
// server.use("/api/auth", authRouter);
// server.use("/api/users", usersRouter);

server.get('/', (req, res) => {
  res.send(`<p>Authentication Project</p>`)
});

module.exports = server;
