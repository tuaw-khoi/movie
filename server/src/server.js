const express = require("express");
const dbconn = require("./config/dbconn.js");
const app = express();
app.use(express.json());
const cors = require("cors");
const userRouter = require("./routes/user.js");
const movieRouter = require("./routes/movie.js");
const countryRouter = require("./routes/country.js");
const genreRouter = require("./routes/genre.js");
const checkToken = require("./middlewares/verifyToken.js");
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["content-type", "Authorization"],
  })
);
dbconn();
app.use("/user", userRouter);
app.use("/movie", movieRouter);
app.use("/country", countryRouter);
app.use("/genre", genreRouter);

app.listen(3000, () => {
  console.log("server is running");
});
