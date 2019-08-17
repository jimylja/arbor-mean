const express = require('express');
const router = express.Router();
const path = require('path');

const Post = require('../models/post');
const Upload = require('../models/upload');
const upload = require('../upload-middlware');

 /**
 * @swagger
 * /posts/{id}:
 *    get:
 *      summary: This should return all posts or single post by ID
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: false
 *        description: post id
 */
router.get("/:id?", (req, res) => {
  if (req.params.id) {
    const id = req.params.id.trim().replace(/ +(?=)/g, '');
    Post.findById(id)
      .populate("uploads")
      .populate("category", ["name", "slug"])
      .then(document => {
        res.status(200).json({
          message: "Posts fetched successfully!",
          data: document
        });
      });
  } else {
    Post.find({}).populate("category", ["name", "slug"]).then(documents => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        data: documents
      });
    });
  }
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
        status: 200,
        data: posts
      });
    }
  })
  .populate("uploads")
  .populate("category", ["name", "slug"]);
})


router.post('/create', upload.single("image"),
  async(req, res, next) => {

    if (!req.file) {
      res.status(401).json({error: 'Please provide an image'});
    }

    const resizedImageBuf = await require('sharp')(req.file.path)
      .resize(210, 210)
      .toBuffer();

    const upload = await Upload.create({
      path: req.file.originalname
    })

    const post = new Post({
      title: 'Test post',
      thumb: resizedImageBuf.toString('base64'),
      slider: true,
      status: 'published',
      category: "5d4ebfdc7c213e60b8edf63c",
      uploads: [upload._id]
    });
    post.save().then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    });
  }
);

module.exports = router;
