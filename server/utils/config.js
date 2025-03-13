const config = {
  saml: {
    cert: "./utils/saml-cert.cer",
    entryPoint:
      "https://login.microsoftonline.com/04b03bf1-f5d6-4920-985a-d36513561ed4/saml2",
    issuer: "urn:saml-react-integration:sso",
    options: {
      failureRedirect: "/api/login",
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
    cookie: { secure: false }, // set to 'true' if using https
  },
};

module.exports = config;
