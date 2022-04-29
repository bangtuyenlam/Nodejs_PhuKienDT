const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const route = require("./src/routes/index");
const connectDB = require("./src/config/connect");
var cors = require('cors');

app.use('/image', express.static('./src/image'));
app.use(express.json());
dotenv.config();

connectDB();
route(app);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("combined"));
app.listen(process.env.PORT, () => console.log(`Server is running...`));


