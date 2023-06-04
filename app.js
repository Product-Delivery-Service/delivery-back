const express = require('express');
const dbConfig  = require("./config/db");
const app = express();
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const messageRouter = require("./routes/message");
const authRouter =  require("./routes/auth"); 
const commandRouter = require("./routes/command");
const Agent = require("./models/Agent")

// Passport config
require("./config/passport")(passport)

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "https://delivery-application.netlify.app/",
  undefined,
];
app.use(
  cors({
      origin: (origin, callback) => {
          if (whitelist.indexOf(origin) !== -1) {
              callback(null, true);
          } else {
              callback(new Error("Not allowed by CORS"));
          }
      },
      credentials: true,
  })
);

// Bodyparser
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Express Session
app.use(
  session({
      secret: "secret",
      resave: true,
      rolling: true,
      cookie: { maxAge: 8 * 60 * 60 * 1000 },
      saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/message", messageRouter);
app.use("/auth", authRouter);
app.use("/command", commandRouter);


const PORT = process.env.PORT || 8082;

dbConfig
  // first run
  .sync({ force: true })
  // .sync()
  .then((result) => {
    Agent.bulkCreate([
      {
        fullName: "Global Admin",
        email: "admin@ensa.ma",
        password: bcrypt.hashSync("password", 12),
      }
    ])
    // console.log(result);
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    });
    console.log("Database Connected ...");
  })
  .catch((err) => {
    console.log(err);
  });
