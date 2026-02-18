import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";

const startServer = async () => {

  app.listen(env.PORT, async() => {
    console.log(`Server is running on ${env.BACKEND_APP_ORIGIN}:${env.PORT}`);

    await connectDB();
  });
};

startServer();
