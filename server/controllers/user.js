const userRouter = require("express").Router();
const passport = require("passport");
const config = require("../utils/config");

// Passport routes
// When user submits GET from /api/login, passport middleware will intercept and send a SAML Request to IDP
userRouter.get("/login", passport.authenticate("saml", config.saml.options));

// Set up this endpoint to retrieve SAML Response from IDP once they process login
userRouter.post(
  "/login/callback",
  passport.authenticate("saml", config.saml.options),
  (req, res, next) => {
    console.log("Authenticated User:", req.user);
    return res.redirect("http://localhost:5173");
  }
);

userRouter.post("/logout", (req, res, next) => {
  if (!req.user) {
    console.error("Logout error: No valid user session found");
    return res.status(400).json({ message: "No valid SAML session found" });
  }

  console.log("Logging out user:", req.user);

  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error clearing session" });
      }

      res.clearCookie("connect.sid");
      // Only send one response
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

module.exports = userRouter;
