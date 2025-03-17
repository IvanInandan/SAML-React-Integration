const config = {
  saml: {
    cert: "./utils/saml-cert.cer",
    entryPoint:
      "https://login.microsoftonline.com/04b03bf1-f5d6-4920-985a-d36513561ed4/saml2",
    issuer: "urn:saml-react-integration:sso",
    options: {
      failureRedirect: "/api/user/login",
      failureFlash: true,
    },
  },
  server: {
    port: 3001,
  },
  session: {
    resave: false,
    secret: "thisismysecretkey", // encrypts session
    saveUninitialized: true,
    cookie: {
      httpOnly: true, // Helps with security
      secure: false, // Set to `true` if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }, // set to 'true' if using https
  },
};

module.exports = config;
