const notesRouter = require("express").Router();
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../db/connection");
const Note = require("../models/note");

notesRouter.get("/", async (req, res, next) => {
  try {
    /*
    const notes = await sequelize.query("SELECT * FROM notes", {
      type: QueryTypes.SELECT,
    });
    */
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    console.log("Error retrieving notes: ", error);
  }
});

// Notes can be made with either the .create method, or .build -> .save
// If done via .build, note can be modified before it is saved
notesRouter.post("/", async (req, res, next) => {
  try {
    console.log("Buidling note: ", req.body);

    const note = await Note.create(req.body);
    res.json(note);
  } catch (error) {
    console.log("Error creating note: ", error);
    return res.status(400).json({ error });
  }
});

module.exports = notesRouter;
