const express = require("express");

const accountsRouter = require("../server-routers/accounts-router");

const server = express();

server.use(express.json()); // Built in middleware, no need to install it

server.get("/", (req, res) => {
    res.status(200).json({ message: "Good to go!" });
})
  
server.use("/api/accounts", accountsRouter);

module.exports = server;
