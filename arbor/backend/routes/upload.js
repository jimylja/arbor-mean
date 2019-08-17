const express = require('express');
const router = express.Router();
const upload = require('../upload-middlware');
const resize = require('../rezise');
const path = require('path');

router.get('/', async function (req, res) {
  await res.sendFile(path.join(__dirname+'/../public/index.html'));
});

router.post('/post', upload.single('image'), async function (req, res) {
  const imagePath = path.join(__dirname, '/../public/gallery');
  const fileUpload = new resize(imagePath);
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
  const filename = await fileUpload.save(req.file.buffer);

  const writeFileAsync = require('util').promisify(require('fs').writeFile);
  const resizedImageBuf = new resize(imagePath).resize(32, 32).toBuffer();
  console.log('test');
  console.log(resizedImageBuf.toString('base64'));

  await writeFileAsync('outputFile.txt', resizedImageBuf.toString('base64'), 'utf-8');

  return res.status(200).json({ name: filename });
});


module.exports = router;
