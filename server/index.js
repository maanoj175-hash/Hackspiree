const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// In-memory volatile stores (reset on server restart)
const db = {
  lessons: {},
  classes: {},
  students: {},
  progress: {},
};

app.get("/health", (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

module.exports = { app, db };
