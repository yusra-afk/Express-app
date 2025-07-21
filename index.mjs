import express from "express";
import axios from "axios";
import { faker } from "@faker-js/faker";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/quote", (req, res) => {
  const quote = faker.hacker.phrase();
  res.render("quote", { quote });
});

app.get("/api", async (req, res) => {
  const response = await axios.get("https://catfact.ninja/fact");
  const fact = response.data.fact;
  res.render("api", { fact });
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});