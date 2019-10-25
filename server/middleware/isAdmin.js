require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.checkIfUserIsAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (jwt.verify(token, process.env.JWT_SECRET)) {
    const decoded = jwt.decode(token);

    if (decoded.isAdmin) {
      next();
    } else {
      res.status(401).json({
        error: true,
        success: false,
        msg: 'Unauhorized / not admin'
      });
    }
  } else {
    res.status(401).json({
      error: true,
      success: false,
      msg: 'Unauhorized'
    });
  }
};
