require("dotenv").config();
const express = require("express");
const path = require("node:path");
const { body, validationResult } = require("express-validator");

const app = express();
const PORT = process.env.PORT;
const assetsPath = path.join(__dirname, "public");

const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
];

const github = "https://github.com/Viktotovich";
const users = ["Rose", "Cake", "Biff"];

app.use(express.static(assetsPath));
/*Allows to access and use req params */
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index", { links: links, users: users, github: github });
});

app.get("/about", (req, res) => {
  res.render("about", { links: links, github: github });
});

app.get("/throw", (req, res) => {
  throw new Error("Intentional Failure");
});

app.listen(PORT, () => {
  console.dir(`We are now live on PORT: ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).send(`<h2>Unexpected Error: ${err.message}</h2>`);
});
