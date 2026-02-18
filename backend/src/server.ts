import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;
const BACKEND_APP_ORIGIN = process.env.BACKEND_APP_ORIGIN;

const startServer = async () => {

  app.listen(PORT, async() => {
    console.log(`Server is running on ${BACKEND_APP_ORIGIN}:${PORT}`);

    await connectDB();
  });
};

startServer();
