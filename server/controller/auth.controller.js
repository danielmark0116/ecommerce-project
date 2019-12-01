require("dotenv").config();
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const jws = require("jws-jwk");
const chalk = require("chalk");

const tokenValidMinutes = 60;

exports.loginUserGoogle = async (req, res) => {
  const provider = "google";
  const { email, name, providerId, userPic, providerToken } = req.body;

  try {
    const idConfig = await axios.get(
      "https://accounts.google.com/.well-known/openid-configuration"
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
      decodedProviderToken.iss === "accounts.google.com" &&
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
            isAdmin: newUser.admin,
            userId: newUser._id
          },
          process.env.JWT_SECRET,
          { expiresIn: 60 * tokenValidMinutes }
        );

        res.json({
          authToken: newToken,
          msg: "Verified, created user, issued token",
          error: false,
          success: true
        });
      } else {
        let loggedUser = userToLog[0];

        loggedUser.photo = userPic;

        let loggedUpdatedUser = await loggedUser.save();

        let newToken = await jwt.sign(
          {
            email: loggedUpdatedUser.email,
            name: loggedUpdatedUser.name,
            photo: loggedUpdatedUser.photo,
            isAdmin: loggedUpdatedUser.admin,
            userId: loggedUpdatedUser._id
          },
          process.env.JWT_SECRET,
          { expiresIn: 60 * tokenValidMinutes }
        );

        res.json({
          authToken: newToken,
          msg: "Verified, user exists, issued token",
          error: false,
          success: true
        });
      }
    } else {
      res.status(500).json({
        msg: "Not verified, cannot issue an auth token",
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

exports.loginUserFacebook = async (req, res) => {
  const appAccessTokenLink =
    "https://graph.facebook.com/oauth/access_token?client_id=" +
    process.env.FACEBOOK_APP_ID +
    "&client_secret=" +
    process.env.FACEBOOK_APP_SECRET +
    "&grant_type=client_credentials";

  const { name, email, userPic, providerId } = req.body;
  const accessToken = req.body.providerToken;
  const provider = "facebook";

  try {
    let response = await axios.get(appAccessTokenLink);

    let appAccessToken = await response.data.access_token;

    let responseValidated = await axios.get(
      `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appAccessToken}`
    );

    let facebookAccessData = responseValidated.data.data;

    const isTokenValid = facebookAccessData.is_valid;

    if (isTokenValid) {
      let usersByEmail = await User.find({ email });

      if (usersByEmail.length === 0) {
        let newUser = await new User({
          providerId,
          provider,
          email,
          name,
          photo: userPic
        }).save();

        let newToken = await jwt.sign(
          {
            email: newUser.email,
            name: newUser.name,
            photo: newUser.photo,
            isAdmin: newUser.admin,
            userId: newUser._id
          },
          process.env.JWT_SECRET,
          { expiresIn: 60 * tokenValidMinutes }
        );

        res.json({
          authToken: newToken,
          msg: "Verified, created user, issued token",
          error: false,
          success: true
        });
      } else {
        let loggedUser = usersByEmail[0];

        loggedUser.photo = userPic;

        let loggedUpdatedUser = await loggedUser.save();

        let newToken = await jwt.sign(
          {
            email: loggedUpdatedUser.email,
            name: loggedUpdatedUser.name,
            photo: loggedUpdatedUser.photo,
            isAdmin: loggedUpdatedUser.admin,
            userId: loggedUpdatedUser._id
          },
          process.env.JWT_SECRET,
          { expiresIn: 60 * tokenValidMinutes }
        );

        res.json({
          authToken: newToken,
          msg: "Verified, user exists, issued token",
          error: false,
          success: true
        });
      }
    } else {
      res.status(500).json({
        error: true,
        success: false,
        msg: e.message
      });
    }
  } catch (e) {
    res.status(500).json({
      error: true,
      success: false,
      msg: e.message
    });
  }
};
