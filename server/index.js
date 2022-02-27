const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();
const route = require("./src/routes/index");
const connectDB = require("./src/config/connect");

dotenv.config();

connectDB();
route(app);

app.use(morgan("combined"));

app.listen(process.env.PORT, () => console.log(`Server is running...`));
