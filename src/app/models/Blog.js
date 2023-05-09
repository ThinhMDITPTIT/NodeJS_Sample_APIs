const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

const Schema = mongoose.Schema;

const BlogSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        slug: { type: String, unique: true, lowercase: true, slug: "name" },
    },
    {
        timestamps: true,
    }
);

// Add plugin
mongoose.plugin(slug);

// Model name
// mongoose will read and auto convert to snake_case (lower + s)
// eg: Blog => blog + s = blogs
module.exports = mongoose.model("Blog", BlogSchema);