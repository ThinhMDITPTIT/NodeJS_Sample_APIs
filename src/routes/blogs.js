const express = require('express');
const router = express.Router();
const BlogsController = require('../app/controllers/BlogsController');

const verifyToken = require('../app/middlewares/auth');

router.get('/stored', verifyToken, BlogsController.storedBlogs);
router.get('/detail/:slug', verifyToken, BlogsController.detailBlog);
router.post('/create', verifyToken, BlogsController.createBlog);
router.put('/update/:slug', verifyToken, BlogsController.updateBlog);
router.patch('/update/:slug', verifyToken, BlogsController.updatePortionBlog);
router.delete('/delete/:slug', verifyToken, BlogsController.deleteBlog);

module.exports = router;