require("dotenv").config();

const app = require("./src/app");
const { initializeDatabase, closeDatabase } = require("./src/models/studentModel");

const port = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    await initializeDatabase();
    const server = app.listen(port, () => {
      console.log(`Student registration API running on port ${port}`);
    });

    const shutdown = () => {
      server.close(async () => {
        await closeDatabase();
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Could not start the API. Check the MySQL configuration and database connection.", error);
    process.exitCode = 1;
  }
}

startServer();
