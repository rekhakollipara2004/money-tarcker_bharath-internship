const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 6000; // Use port from environment variable or default to 3000

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/moneyList');
const db = mongoose.connection;
db.on('error', () => console.log("Error in connecting to the Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/add", (req, res) => {
    // Your POST request handling code
});

app.get("/", (req, res) => {
    res.send("SUCCESSFULLY CONNECTED TO " + PORT);
});

// Add Access-Control-Allow-Origin header
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Dynamically assign an available port and start the server
const server = app.listen(PORT, () => {
    const port = server.address().port;
    console.log(`Server is running on port ${port}`);
});

// Error handling for EADDRINUSE
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use. Trying a different port...`);
        const newPort = PORT + 1; // Try the next port
        server.listen(newPort, () => {
            const port = server.address().port;
            console.log(`Server is running on port ${port}`);
        });
    } else {
        console.error("Server error:", error);
    }
});
