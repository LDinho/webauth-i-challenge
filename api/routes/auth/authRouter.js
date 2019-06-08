const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const {
  addUser,
  getUserBy,

} = require('../../helpers/usersDbhelper');

/*
@POST: register new user
@PARAMS: user object as { username, password }
@ROUTE: "/api/auth"
*/
router.post('/register', async (req, res) => {
  const user = req.body;

  const { username, password } = user;

  const hash = bcrypt.hashSync(password, 12);

  user.password = hash;

  try {

    if (!username || !password) {
      return res.status(400)
        .json({
          errorMessage: "username or password missing."
        });
    }

    const userAdded = await addUser(user);

    return res.status(201).json(userAdded);

  }
  catch (err) {
    res.status(500)
       .json({
         err: err.message,
         error: `Server error`
       })
  }

})

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {

    if (!username || !password) {
      return res.status(400)
        .json({
          errorMessage: "username or password missing."
        });
    }

    const user = await getUserBy({ username });

    if (!user) {
      return res.status(400)
                .json({
                  message: `user not found`
                });
    }

    const isValidPassword =
      bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401)
        .json({
          message: 'Invalid Credentials'
        });
    } else {

      return res.status(200)
        .json({
          message: `Welcome ${user.username}!`
        });
    }
  }
  catch (err) {
    res.status(500)
      .json({
        err: err.message,
        error: `Server error`
      })
  }
})

module.exports = router;
