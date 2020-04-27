import express from "express";
import path from "path";
import socketIO from "socket.io";

const PORT = 4000;
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.render("home");
});

const handleListening = () =>
  console.log(`✔ Server running http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = socketIO(server);
