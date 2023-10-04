const express = require("express");
const http = require('http');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const { authenticationCheck } = require('./middleware/authenticationCheck')
const { initChatSocket } = require('./routes/chatSocket');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: oneDay }
}));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views/posts'));
app.use(express.static(__dirname + '/views/users'));
app.use(express.static(__dirname + '/views/login'));
app.use(express.static(__dirname + '/views/chat'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", require("./routes/login"));
app.use("/chat", authenticationCheck(), require("./routes/chat"));
app.use("/posts", authenticationCheck(), require("./routes/posts"));
app.use("/users", authenticationCheck(), require("./routes/users"));
app.use("/profile", authenticationCheck(), require("./routes/profile"));
app.use("/logout", authenticationCheck(), require("./routes/logout"));

initChatSocket(server);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
