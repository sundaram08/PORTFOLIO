import express from "express";
import cors from "cors";
import contact from "./routes/route.js";
import "./connection/connection.js";

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/v1', contact);
server.get("/", (req, res) => {
  res.send("Hello from server");
});

server.listen(2000, () => {
  console.log(`Server started at 2000`);
});