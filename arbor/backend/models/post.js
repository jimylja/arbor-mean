const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('../models/category')

const postSchema = new Schema({
  title: { type: String },
  thumb: {type: String},
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  status: {
    type: String,
    enum: ['published', 'draft'],
    required: true,
    default: 'published'
  },
  slider: {
    type: Boolean,
    default: false
  }},
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
