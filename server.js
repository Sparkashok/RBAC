const jsonServer = require("json-server");
const path = require("path");
const express = require("express");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// Serve React frontend
server.use(express.static(path.join(__dirname, "build")));

// API routes
server.use("/api", router);

// Catch-all route to serve React's index.html for any unknown route
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
