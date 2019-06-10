require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const db = require('../../data/dbConfig');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  name: process.env.SESSION_NAME, // defaults to connect.sid
  cookie: {
    secure: false, // over http(s) in prod change to true
    maxAge: 1000 * 60 * 5
  },
  httpOnly: true, // JS can't acess, only https
  resave: false, // if true, forces sess to be saved to the session store, even if not modified
  // vv set to false to keep from saving large data, good for login functionality
  // the cookie will not be set on a response
  saveUninitialized: false,
  store: new knexSessionStore({
    // creates memory cache
    tablename: 'sessions', // session table name
    sidfiledname: 'sid', // session field name
    knex: db, // database you want knex to use
    createTable: true, // have library create the table if there isn't one
    clearIntervale: 1000 * 60 * 60 // clear every hour
  })
}

module.exports = server => {
  server.use(session(sessionConfig));
  server.use(helmet());
  server.use(morgan('dev'));
  server.use(cors());
}
