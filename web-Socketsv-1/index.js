import http, { Server } from "http"
import path from "path"
import express from "express"
import { Server } from "socket.io"


const app = express();
const server = http.createServer(app);

io.on("connection", (socket) => {
    console.log("new user connected" ,socket.id);
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("./public/index.html")
})

server.listen(9000, () => console.log("Server Started At", 9000))

// socket 
