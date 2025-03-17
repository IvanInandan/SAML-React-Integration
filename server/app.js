require("./utils/passport");

const session = require("express-session");
const passport = require("passport");
const express = require("express");
const cors = require("cors");

const middleware = require("./utils/middleware");
const config = require("./utils/config");

const userRouter = require("./controllers/user");
const whoamiRouter = require("./controllers/whoami");
const notesRouter = require("./controllers/notes");

const corsOptions = {
  origin: "http://localhost:5173", // Allow the frontend (Vite) app
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow credentials (cookies) to be sent
};

const app = express();

// Use cors before all routes
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false })); // Replaces body parser
app.use(express.json()); // Replaces body parser
app.use(middleware.requestLogger);

// Parse body of the request (Passport)
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());

// The following logs the session ID + user information on every request
app.use((req, res, next) => {
  console.log("Session ID:", req.sessionID);
  console.log("User: ", req.user);

  if (req.user) {
    console.log("User NameID:", req.user.nameID); // ✅ Logs the SAML nameID
  } else {
    console.log("No user authenticated yet.");
  }
  next();
});

// Define login route (passport / SAML authentication)
app.use("/api/user", userRouter);

// Define Rules
app.use(middleware.rules);
app.use("/api/whoami", whoamiRouter);
app.use("/api/notes", notesRouter);

// Middleware after all routes
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
