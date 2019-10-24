const User = require('../model/user.model');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const provider = req.params.provider;
  const { email, name, providerId, userPic } = req.body;

  const tokenValidMinutes = 60 * 3;

  try {
    let existingUser = await User.find({ email });

    if (existingUser.length === 0) {
      let newUser = await new User({
        providerId,
        provider,
        email,
        name,
        photo: userPic
      }).save();

      const token = jwt.sign(
        { userEmail: newUser.email, userName: newUser.name },
        'secret',
        {
          expiresIn: 60 * tokenValidMinutes
        }
      );

      res.json({
        user: newUser,
        token,
        msg: 'Created new user',
        success: true,
        error: false
      });
    } else {
      const foundUser = existingUser[0];

      const token = jwt.sign(
        { userEmail: foundUser.email, userName: foundUser.name },
        'secret',
        {
          expiresIn: 60 * tokenValidMinutes
        }
      );

      res.json({
        user: foundUser,
        token,
        msg: 'User already is registered, passing data',
        success: true,
        error: false
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      error: true,
      msg: e
    });
  }
};
