require("dotenv").config()

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose")
const http = require("http");

const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const taskRoutes = require("./routes/task.route");
const setupSocket = require("./socket");
const app = express();
const port = process.env.PORT || 3000;

// Create HTTP server to pass to Socket.IO
const server = http.createServer(app);

// Setup Socket.IO
const io = setupSocket(server);

app.set("io", io);

// Configure CORS properly
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(cookieParser())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)


mongoose.connect(process.env.MONGODB_URI, )
.then(() => {

    server.listen(port, () => {
        console.log(`Example app listening on port ${port}!`);
      });
      
    console.log('MongoDB connected successfully');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

