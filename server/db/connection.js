require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres", // Explicitly define the DB dialect
  //logging: false, // Disable logging SQL queries (optional)
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully!");

    const notes = await sequelize.query("SELECT * FROM notes", {
      type: QueryTypes.SELECT,
    });
    console.log("Notes: ", notes);
    sequelize.close;
  } catch (error) {
    console.error("Unable to connect to database: ", error);
    console.error(error.stack);
    process.exit(1); // exit process if connection fails
  }
};

module.exports = { sequelize, connectDB };
