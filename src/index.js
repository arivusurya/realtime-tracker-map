import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";

const app = express();

const server = http?.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let __dirname = path?.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express?.static(path?.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path?.join(__dirname, "public/views"));

io.on("connection", (socket) => {
  socket?.on("send-location", (data) => {
    console.log(`userLoacation is ${data?.latitude} and ${data?.longitude}`);
    io?.emit("recive-location", { id: socket?.id, ...data });
  });
});

app.get("/", (req, res) => {
  res?.render("index");
});

server.listen(3000, () => {
  console.log(`server is  listening  on  3000`);
});
