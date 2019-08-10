const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('../models/category')

const postSchema = new Schema({
  title: { type: String },
  body: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  owner: { type: Schema.Types.ObjectId, ref: 'User'},
  thumb: { type: String },
  status: {
    type: String,
    enum: ['published', 'draft'],
    required: true,
    default: 'published'
  },
  url: { type: String }},
  { timestamps: true }
);

//** Get posts by category slug */
postSchema.statics.findByCatSlug = function (slug, callback) {
  var query = this.find()
  Category.findOne({'slug': slug}, function (error, categories) {
    query.where(
      {category: categories._id}
    ).exec(callback);
  })
  return query
}

module.exports = mongoose.model('Post', postSchema);
