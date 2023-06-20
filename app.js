const express = require("express");
const app = express();
require("dotenv").config();
const { PORT, MONGO_URI } = process.env;
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

//middlewares
app.use(express.static("./public"));
app.use(express.json()); //-this is for req.body and has a very big impact on express JS

//routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, console.log(`listening to port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();
