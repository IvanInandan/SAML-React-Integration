const loginRouter = require("express").Router();
const passport = require("passport");
const config = require("../utils/config");

// Passport routes
// When user submits GET from /api/login, passport middleware will intercept and send a SAML Request to IDP
loginRouter.get("/", passport.authenticate("saml", config.saml.options));

// Set up this endpoint to retrieve SAML Response from IDP once they process login
loginRouter.post(
  "/callback",
  passport.authenticate("saml", config.saml.options),
  (req, res, next) => {
    console.log("Authenticated User:", req.user);
    return res.redirect("http://localhost:5173");
  }
);

module.exports = loginRouter;
