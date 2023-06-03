const express = require('express');
const dbConfig  = require("./config/db");
const app = express();
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const messageRouter = require("./routes/message");
const authRouter =  require("./routes/auth"); 
const commandRouter = require("./routes/command");

// Passport config
require("./config/passport")(passport);

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
    // console.log(result);
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    });
    console.log("Database Connected ...");
  })
  .catch((err) => {
    console.log(err);
  });
