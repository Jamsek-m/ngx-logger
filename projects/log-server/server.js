const express = require("express");
const cookieParser = require("cookie-parser");
const http = require("http");
const Websocket = require("ws");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({
    exposedHeaders: "X-Session-Id"
}));
app.disable("x-powered-by");

app.get("/session", (req, res) => {
    console.log("Starting session with id 123");
    res.status(204).header("X-Session-Id", 123).send();
});

app.post("/logs", (req, res) => {
    const sessionId = req.header("X-Session-Id");
    console.log(`REST endpoint:`, req.body, {sessionId: sessionId});
    res.status(200).header("X-Session-Id", sessionId).json({msg: "Log saved!"});
});

const server = http.createServer(app);

server.listen(3000, () => {
    console.log("Log server is listening at port 3000!");
});

const websocket = new Websocket.Server({server: server, path: "/socket"});

websocket.on("connection", socket => {
    console.log("Client connected!");

    socket.on("message", data => {
        const message = JSON.parse(data);
        if (message.type === "SESSION_REQUEST") {
            socket.send(JSON.stringify({
                type: "SESSION_START",
                message: {
                    sessionId: 123
                }
            }));
        } else if (message.type === "LOG") {
            console.log("WS endpoint:", message.message);
        }
    });

    socket.on("close", () => {
        console.log("Client disconnected!");
    });
});
