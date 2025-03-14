const infoRouter = require("express").Router();

infoRouter.get("/", (req, res, next) => {
  return res.status(200).json({ message: "hello!" });
});

infoRouter.get("/message", (req, res, next) => {
  return res.status(200).json({ message: "secret message :)" });
});

module.exports = infoRouter;
