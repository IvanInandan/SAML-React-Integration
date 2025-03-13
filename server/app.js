require("./utils/passport");

const session = require("express-session");
const passport = require("passport");
const express = require("express");
const cors = require("cors");

const middleware = require("./utils/middleware");
const config = require("./utils/config");

const loginRouter = require("./controllers/login");
const whoamiRouter = require("./controllers/whoami");

const app = express();

// Use cors before all routes
app.use(cors());
app.use(express.urlencoded({ extended: false })); // Replaces body parser
app.use(express.json()); // Replaces body parser
app.use(middleware.requestLogger);

// Parse body of the request (Passport)
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());

// Define login route (passport / SAML authentication)
app.use("/api/login", loginRouter);

// Define Rules
app.use(middleware.rules);

app.use("/api/whoami", whoamiRouter);

// Middleware after all routes
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
