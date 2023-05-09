// Auth Server:
// - Handle user authentication (Login, SignUp, Logout)
// - return token

require("dotenv").config();

const express = require("express");

const app = express();
const AUTH_PORT = process.env.AUTH_PORT || 4000;

const db = require("../config/db");
const route = require("../routes");

// Connect to MongoDB
db.connect();

app.use(express.json());

route(app);

app.listen(AUTH_PORT, () => {
    console.log(`Auth-Server is running on port ${AUTH_PORT}`);
});
