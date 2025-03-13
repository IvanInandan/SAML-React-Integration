const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

app.listen(config.server.port, () => {
  logger.info(`server running on port ${config.server.port}`);
});
