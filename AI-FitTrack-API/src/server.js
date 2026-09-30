require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`FitTrack AI API running on http://localhost:${PORT}`);
      console.log(
        `Swagger-style endpoint list: http://localhost:${PORT}/api`
      );
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
})();