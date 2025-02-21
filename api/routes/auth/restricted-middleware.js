const authorize = (req, res, next) => {

  if (req.session && req.session.user) {
    next();

  } else {
    res.status(401).json({
      message: 'Not authorized'
    });
  }

}

module.exports = { authorize };
