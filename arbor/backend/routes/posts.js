const express = require('express');
const router = express.Router();
const Post = require('../models/post');

/**
 * @swagger
 * /posts:
 *    get:
 *      description: This should return all posts
 */

router.get("/", (req, res) => {
  Post.find({}).populate("category", ["name", "slug"]).then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

/**
 * @swagger
 * /posts/category/{slug}:
 *    get:
 *      summary: This should return all users
 *      parameters:
 *      - in: path
 *        name: slug
 *        schema:
 *          type: string
 *        required: true
 *        description: category slug
 */
router.get("/category/:slug", (req, res) => {
  Post.findByCatSlug(req.params.slug, (err, posts) => {
    if(err) { res.send(err);
    } else {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: posts
      });
    }
  }).populate("category", ["name", "slug"]);
})

module.exports = router;
