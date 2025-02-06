require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const newRouter = require("./routes/newRoute");

const PORT = process.env.PORT;
const assetsPath = path.join(__dirname, "public");

app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const title = "Usernames will be logged here";
  res.render("pages/index", { title });
});

app.use("/new", newRouter);

app.listen(PORT, () => {
  console.dir(`Good Morning, Good Evening, and Good Night - on PORT ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(404).send(`<h2> Unexpected Error: ${err.message} </h2>`);
});
