import http from "http";
import path from "path";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static(path.resolve("./public")));

// Serve the index.html file for the root URL
app.get("/", (req, res) => {
    return res.sendFile(path.resolve("./public/index.html"));
});

// Handle socket connections
io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle incoming user messages
    socket.on("user-message", (message) => {
        console.log("Received message:", message); // Log the received message
        // Broadcast the message to all connected clients
        io.emit("user-message", message);
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Start the server
server.listen(9000, () => console.log("Server started at port 9000"));
