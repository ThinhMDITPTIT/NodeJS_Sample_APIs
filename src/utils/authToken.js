const jwt = require("jsonwebtoken");
const User = require("../app/models/User");

// Generate access/refresh token function
const generateTokens = (payload) => {
    // Destructuring the user's authentication data to just only take id and username
    const { userId, username } = payload;
    // Create JWT
    // Add the property 'expiresIn' to create the expiration time for the access token
    const accessToken = jwt.sign(
        // User's Authentication Data
        { userId, username },
        process.env.ACCESS_TOKEN_JWT_SECRET,
        {
            expiresIn: "5m",
        }
    );
    const refreshToken = jwt.sign(
        // User's Authentication Data
        { userId, username },
        process.env.REFRESH_TOKEN_JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
    return { accessToken, refreshToken };
};

// Each time after a refresh token has been generated, the user's refresh token is updated
const updateRefreshToken = async (userId, refreshToken) => {
    await User.findOneAndUpdate(
        { userId },
        { refreshToken },
        {
            new: true,
        }
    );
};

module.exports = {
    generateTokens,
    updateRefreshToken,
};
