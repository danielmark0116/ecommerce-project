const User = require('../model/user.model');
const jwt = require('jsonwebtoken');

exports.getUserAddresses = async (req, res) => {
  const userData = jwt.decode(req.headers.authorization.split(' ')[1]);
  const userEmail = userData.email;

  try {
    let response = await User.find({ email: userEmail });

    if (response.length === 0) {
      res.status(404).json({
        error: true,
        success: false,
        msg: 'No such user'
      });
    } else {
      const user = response[0];

      res.json({
        userAddresses: user.addresses,
        error: false,
        success: true,
        msg: ''
      });
    }
  } catch (e) {
    res.status(500).json({
      error: true,
      success: false,
      msg: e
    });
  }
};

exports.addUserAddress = async (req, res) => {
  const userData = jwt.decode(req.headers.authorization.split(' ')[1]);
  const userEmail = userData.email;

  try {
    let response = await User.find({ email: userEmail });

    const user = response[0];

    user.addresses.push(req.body);

    let updatedUser = await user.save();

    res.json({
      userAddresses: updatedUser.addresses,
      error: false,
      success: true,
      msg: ''
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      success: false,
      msg: e
    });
  }
};
