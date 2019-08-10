const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('../models/category')
const Upload = require('../models/upload');

const postSchema = new Schema({
  title: { type: String },
  thumb: {type: String},
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  owner: { type: Schema.Types.ObjectId, ref: 'User'},
  status: {
    type: String,
    enum: ['published', 'draft'],
    required: true,
    default: 'published'
  },
  uploads: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Upload'
    }
  ],
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
