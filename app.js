const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();


const app = express();
const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views/posts'));


// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", require("./routes/main"));
app.use("/chat", require("./routes/chat"));
app.use("/posts", require("./routes/posts"));
app.use("/profile", require("./routes/profile"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
