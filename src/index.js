const express = require("express");
const app = express();
require("./db/mongoose");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
User = require("./models/user");
Task = require("./models/task");

const port = process.env.PORT || 3000;
app.use(express.json());

const router = new express.Router();

app.use(userRoute);
app.use(taskRoute);

app.listen(port, () => {
  console.log("server is up and running at " + port);
});
