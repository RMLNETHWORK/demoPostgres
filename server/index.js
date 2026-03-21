const express = require("express");
const path = require("path"); // Don't forget this!
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = 5000;
const HOST = '192.168.1.13';

app.use(cors());
app.use(express.json());

// Points to the 'build' folder inside the 'client' directory
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// The "catch-all" handler to serve React's index.html for any other route
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});