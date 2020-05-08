const express = require("express");
const cookieParser = require("cookie-parser");
const http = require("http");
const Websocket = require("ws");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
app.disable("x-powered-by");

app.post("/logs", (req, res) => {
    let sessionId = req.header("X-Session-Id");
    if (!sessionId) {
        // Session has not yet been started, generate new id.
        sessionId = 123;
    }
    // console.log(`Session ${sessionId}:`, req.body);
    console.log(`REST endpoint:`, req.body);
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
