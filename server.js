const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const Note = require("./models/Note");
const path = require("path");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use("/api", require("./routers/noteRoutes"));

if (process.env.NODE_ENV === "prod") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

io.on("connection", (socket) => {
  socket.on("edit-note", async (data) => {
    const { name, content } = data;
    await Note.findOneAndUpdate({ name }, { content });
    io.emit("update-note", { name, content });
  });

  socket.on("disconnect", () => {});
});

server.listen(process.env.PORT, () => {
  console.log("Server is running");
});
