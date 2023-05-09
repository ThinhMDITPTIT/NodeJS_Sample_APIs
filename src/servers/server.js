// Require dotenv to read .env variables
require("dotenv").config();

const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const db = require("../config/db");
const route = require("../routes");

// Connect to MongoDB
db.connect();

// Static files route
app.use(express.static(path.join(__dirname, "../public")));

// Middleware used to parse JSON data from XMLHttpRequest, fetch, axios, etc
// Parse Body request data
app.use(express.json());

// App routes
route(app);

// 127.0.0.1 - localhost
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
