const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "build")));

// Routes
const searchRoute = require("./routes/search");  // 👈 add this
app.use("/api/search", searchRoute);              // 👈 and this

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Catch-all for React
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});