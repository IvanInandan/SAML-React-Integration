const loginRouter = require("express").Router();
const passport = require("passport");
const config = require("../utils/config");

// Passport routes
loginRouter.get("/", passport.authenticate("saml", config.saml.options));

loginRouter.post(
  "/callback",
  passport.authenticate("saml", config.saml.options),
  (req, res, next) => {
    console.log("Authenticated User:", req.user);
    return res.redirect("http://localhost:5173");
  }
);

module.exports = loginRouter;
