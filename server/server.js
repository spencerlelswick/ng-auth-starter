const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dotenv = require('dotenv').config()
const DATABASE_URI = dotenv.parsed.DATABASE_URI
const COOKIE_SECRET = dotenv.parsed.COOKIE_SECRET

const morgan = require("morgan")

const app = express();

var corsOptions = {
  credentials: true,
  origin: ['http://localhost:4200'],
};

app.use(cors(corsOptions));

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "app-session",
    keys: [COOKIE_SECRET],
    httpOnly: true
  })
);

const db = require("./models");

db.mongoose
  .connect(DATABASE_URI, {})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


app.get("/", (req, res) => {
  res.json({ message: "test" });
});

require('./routes/user.routes')(app)
require('./routes/auth.routes')(app)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});