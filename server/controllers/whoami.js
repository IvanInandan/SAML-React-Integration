const whoamiRouter = require("express").Router();

whoamiRouter.get("/", (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    return res.status(200).json({
      user: req.user,
    });
  }
});

module.exports = whoamiRouter;
