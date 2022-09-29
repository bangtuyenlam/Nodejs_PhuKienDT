const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const passportSetup = require("./src/controllers/Passpost");
const route = require("./src/routes/index");
const connectDB = require("./src/config/connect");
const cookieSession = require("cookie-session");
const cors = require('cors');
const passport = require("passport");


app.use('/image', express.static('./src/image'));
app.use(express.json());
dotenv.config();

connectDB();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(morgan("combined"));
app.use(
    cookieSession({
        name:"session",
        keys:["lama"],
        maxAge: 24*60*60*100,
        sameSite: "none",

    })
);

app.use(passport.initialize());
app.use(passport.session());
route(app);
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
);


app.listen(process.env.PORT, () => console.log(`Server is running...`));


