const fs = require("fs");
const passport = require("passport");
const { Strategy } = require("passport-saml");
const config = require("./config");
const logger = require("./logger");

const savedUsers = [];

passport.use(
  new Strategy(
    {
      issuer: config.saml.issuer,
      protocol: "http://",
      path: "/api/login/callback", // Once user logs in at endpoint, this is where IDP will send SAML response to
      entryPoint: config.saml.entryPoint, // When '/api/login' is reached (GET), it will redirect here. ie: back-end sends SAML request to endpoint
      cert: fs.readFileSync(config.saml.cert, "utf-8"),
    },
    (user, done) => {
      if (!savedUsers.includes(user)) {
        savedUsers.push(user);
      }

      // If SAML authentical is successful, save user to session
      return done(null, user);
    }
  )
);

// Takes care of variables when browser is authenticating with the backend
passport.serializeUser((user, done) => {
  logger.info(user, "Serialize user");
  done(null, user);
});

// Takes care of variables when browser is authenticating with the backend
passport.deserializeUser((user, done) => {
  logger.info(user, "Deserialize user");
  done(null, user);
});
