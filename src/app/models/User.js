const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        userId: {
            type: String,
            unique: true,
            lowercase: true,
            slug: "username",
        },
        refreshToken: { type: String || null, default: null },
    },
    {
        timestamps: true,
    }
);

// Add plugin
mongoose.plugin(slug);

module.exports = mongoose.model("User", UserSchema);
