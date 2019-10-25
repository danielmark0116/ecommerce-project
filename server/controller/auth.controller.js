require('dotenv').config();
const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const jws = require('jws-jwk');

exports.loginUser = async (req, res) => {
  const provider = req.params.provider;
  const { email, name, providerId, userPic, providerToken } = req.body;

  const tokenValidMinutes = 60;

  try {
    const idConfig = await axios.get(
      'https://accounts.google.com/.well-known/openid-configuration'
    );
    const jwkResponse = await axios.get(idConfig.data.jwks_uri);
    const jwkKey = jwkResponse.data;

    const verifySignature = await jws.verify(providerToken, jwkKey); //is TRUE if token is valid

    const decodedProviderToken = jwt.decode(providerToken);
    const nowInEpoch = Math.round(new Date().getTime() / 1000);

    if (
      decodedProviderToken &&
      decodedProviderToken.exp > nowInEpoch &&
      decodedProviderToken.aud === process.env.GOOGLE_CLIENT_ID &&
      decodedProviderToken.iss === 'accounts.google.com' &&
      verifySignature
    ) {
      let userToLog = await User.find({ email: decodedProviderToken.email });

      if (userToLog.length === 0) {
        let newUser = await new User({
          providerId,
          provider,
          email: decodedProviderToken.email,
          name,
          photo: userPic
        }).save();

        let newToken = await jwt.sign(
          {
            email: newUser.email,
            name: newUser.name,
            photo: newUser.photo,
            isAdmin: newUser.admin
          },
          process.env.JWT_SECRET,
          { expiresIn: 60 * tokenValidMinutes }
        );

        res.json({
          authToken: newToken,
          msg: 'Verified, created user, issued token',
          error: false,
          success: true
        });
      } else {
        let loggedUser = userToLog[0];

        let newToken = await jwt.sign(
          {
            email: loggedUser.email,
            name: loggedUser.name,
            photo: loggedUser.photo,
            isAdmin: loggedUser.admin
          },
          process.env.JWT_SECRET,
          { expiresIn: 60 * tokenValidMinutes }
        );

        res.json({
          authToken: newToken,
          msg: 'Verified, user exists, issued token',
          error: false,
          success: true
        });
      }
    } else {
      res.status(500).json({
        msg: 'Not verified, cannot issue an auth token',
        error: true,
        success: false
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
