const bcrypt = require('bcrypt');

const {
  getUserBy,

} = require('../../helpers/usersDbhelper');

const authorize = (req, res, next) => {
  const username = req.headers['x-username'];
  const password = req.headers['x-password'];

  // const { username, password } = req.headers;

  if (username && password) {
    getUserBy({ username })
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({
            message: 'Invalid Credentials'
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          err: err.message,
          message: 'Server error'
        });
      });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }

}

module.exports = { authorize };
