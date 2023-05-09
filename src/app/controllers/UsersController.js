const { mongooseDocumentToObject } = require("../../utils/mongoose");
const { generateTokens, updateRefreshToken } = require("../../utils/authToken");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

class UsersController {
    // [POST] /login
    async login(req, res, next) {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid credentials [wrong user info]" });
        }

        const tokens = generateTokens(user);
        updateRefreshToken(user.userId, tokens.refreshToken);
        res.json(tokens);
    }

    // [POST] /signup
    signup(req, res, next) {
        const formData = { ...req.body };
        const newUser = new User(formData);
        newUser
            .save()
            .then((user) => {
                return res.status(201).json({
                    message: "New User created",
                    user: mongooseDocumentToObject(user),
                });
            })
            .catch(next);
    }

    // [POST] /regentoken
    // Handle re-generate a new access token
    async regenToken(req, res, next) {
        const { refreshToken } = req.body;
        if (!refreshToken)
            return res.status(401).json({
                message: "Invalid credentials [do not have refresh-token]",
            });

        const user = await User.findOne({ refreshToken });
        if (!user)
            return res.status(403).json({
                message: "Invalid credentials [invalid refresh-token]",
            });

        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_JWT_SECRET);
            const tokens = generateTokens(user);
            updateRefreshToken(user.userId, tokens.refreshToken);

            res.json(tokens);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server error [something wrong]" });
        }
    }

    // [DELETE] /logout
    // Handle logout => delete the refresh token
    // Use the access token in the request header => find user's info in the database
    // => delete the refresh token
    async logout(req, res, next) {
        const user = await User.findOne({ userId: req.userId });
        updateRefreshToken(user.userId, null);
        res.status(200).json({ message: "Logout successfully!" });
    }
}

module.exports = new UsersController();
