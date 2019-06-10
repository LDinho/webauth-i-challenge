const express = require('express');

const router = express.Router();

const { authorize } = require('../auth/restricted-middleware');

const {
  getUsers,

} = require('../../helpers');

/*
@GET: users
@PARAMS: none
@ROUTE: "/api/users"
*/

router.get('/', authorize, async (req, res) => {
  try {
    const users = await getUsers();

    if (users.length) {
      res.status(200).json(users)

    } else {
      res.status(404).json({message: `No users found`})

    }
  }
  catch (err) {
    res.status(500).json({
      err: err.message,
      error: `Unable to retrieve users`
    })
  }

});

module.exports = router;
