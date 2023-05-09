const {
    mongooseDocumentToObject,
    multipleMongooseDocumentsToObject,
} = require("../../utils/mongoose");
const Blog = require("../models/Blog");

class BlogsController {
    // [GET] /stored
    storedBlogs(req, res, next) {
        Blog.find({})
            .then((blogs) => {
                return res
                    .status(200)
                    .json(multipleMongooseDocumentsToObject(blogs));
            })
            .catch(next);
    }

    // [GET] /detail/:slug
    detailBlog(req, res, next) {
        Blog.findOne({ slug: req.params.slug })
            .then((blog) => {
                return res.status(200).json(mongooseDocumentToObject(blog));
            })
            .catch(next);
    }

    // [POST] /create
    createBlog(req, res, next) {
        const formData = { ...req.body };
        const newBlog = new Blog(formData);
        newBlog
            .save()
            .then((blog) => {
                return res
                    .status(201)
                    .json({
                        message: "New blog created",
                        blog: mongooseDocumentToObject(blog),
                    });
            })
            .catch(next);
    }

    // [PUT] /update/:slug
    // [PUT] is used to replace the entire resource with the new data
    // [PUT] request updates the entire resource, which means that any properties not included in the request body will be deleted from the resource.
    updateBlog(req, res, next) {
        const formData = { ...req.body };
        Blog.findOneAndUpdate({ slug: req.params.slug }, formData, {
            new: true,
        })
            .then((blog) => {
                return res
                    .status(200)
                    .json({
                        message: "Blog updated (entire)",
                        blog: mongooseDocumentToObject(blog),
                    });
            })
            .catch(next);
    }

    // [PATCH] /update/:slug
    // [PATCH] is used to update only a portion of the resource
    // [PATCH] request updates only the description property, leaving any other properties untouched.
    updatePortionBlog(req, res, next) {
        const formData = {
            description: req.body.description,
        };
        Blog.findOneAndUpdate({ slug: req.params.slug }, formData, {
            new: true,
        })
            .then((blog) => {
                return res
                    .status(200)
                    .json({
                        message: "Blog updated (description)",
                        blog: mongooseDocumentToObject(blog),
                    });
            })
            .catch(next);
    }

    // [DELETE] /delete/:slug
    deleteBlog(req, res, next) {
        Blog.findOneAndDelete({ slug: req.params.slug })
            .then((blog) => {
                return res.status(200).json({ message: "Blog deleted", blog });
            })
            .catch(next);
    }
}

module.exports = new BlogsController();
