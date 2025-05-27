import { app, server } from './www/server.js';
import { getEnvironmentVariable } from './config/dotenvConfig.js';
import { connectToDb } from './lib/db.js';
import logger from './lib/logger.js';

connectToDb();

// Get Port from env to start the server
const PORT = getEnvironmentVariable('PORT');

(() => {
  server.listen(PORT, () => {
    logger.info(`Server is running on PORT: ${PORT}`);
  });
})();
