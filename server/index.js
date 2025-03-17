const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");
const { connectDB } = require("./db/connection");

// connect to database before starting the server
const main = async () => {
  await connectDB(); // wait for database connection before starting server

  // starts back-end server
  app.listen(config.server.port, () => {
    logger.info(`server running on port ${config.server.port}`);
  });
};

main();
