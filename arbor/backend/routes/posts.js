const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const path = require('path');
const upload = require('../upload-middlware');
const resize = require('../rezise');

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

router.post('/create', upload.single('image'), async function (req, res) {
  const imagePath = path.join(__dirname, '/../public/gallery');
  const fileUpload = new resize(imagePath);
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
  const filename = await fileUpload.save(req.file.buffer);
  return res.status(200).json({ name: filename });
});

module.exports = router;
