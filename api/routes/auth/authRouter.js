const express = require('express');

const router = express.Router();

const {
  addUser,

} = require('../../helpers/usersDbhelper');

/*
@POST: register new user
@PARAMS: user object as { username, password }
@ROUTE: "/api/auth"
*/
router.post('/register', async (req, res) => {
  const user = req.body;

  const { username, password } = user;

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

module.exports = router;
