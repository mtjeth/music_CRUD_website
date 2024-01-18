//import * as fs from "fs";
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();

app.get("/", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("db.json"));
    res.send(data);
  } catch (err) {
    res.status(404).send(`error at ${err}`);
  }
});

app.get("/:id", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("db.json"));
    const song = data.find((da) => da.id === req.params.id);
    res.send(song);
  } catch (err) {
    res.status(404).send(`error at ${err}`);
  }
});

app.post("/new", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("db.json"));
    const newSong = {
      trackName: req.body.trackName,
      artistName: req.body.artistName,
      id: req.body.id,
      duration_ms: req.body.duration_ms,
    };
    data = [newSong, ...data];
    const newData = JSON.stringify(data);
    fs.writeFileSync("db.json", newData);
    res.send("hi");
  } catch (err) {
    res.status(404).send(`error at ${err}`);
  }
});

app.put("/edit", (req, res) => {
  try {
    const id = req.body.id;
    let data = JSON.parse(fs.readFileSync("db.json"));
    const song = data.findIndex((da) => da.id === id);
    data[song] = {
      trackName: req.body.trackName,
      artistName: req.body.artistName,
      id: id,
      duration_ms: req.body.duration_ms,
    };
    const newData = JSON.stringify(data);
    fs.writeFileSync("db.json", newData);
    res.send(data[song]);
  } catch (err) {
    res.status(404).send(`error at ${err}`);
  }
});

app.delete("/reset", (req, res) => {
  try {
    const data = fs.readFileSync("mainDb.json");
    fs.writeFileSync("db.json", data);
    res.send("Database Reseted Succesfully");
  } catch (err) {
    res.status(404).send(`error at ${err}`);
  }
});

app.delete("/delete/:id", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("db.json"));
    const song = data.findIndex((da) => da.id === req.params.id);
    data = [...data.slice(0, song), ...data.slice(song + 1, -1)];
    const newData = JSON.stringify(data);
    fs.writeFileSync("db.json", newData);
    res.send("deleted");
  } catch (err) {
    res.status(404).send(`error at ${err}`);
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
