//instead of creating a seperate post model, users will have nested posts (array of posts)
//we will make a post schema, but not a post model user
//user model is a document, the post is a subdocument

//BUT*** embedded documents have some shortcomings. It can make for difficult queries.
//We could make User collection with array of post ids, seperate collection of posts with comment ids, seperate collection of comments with each one having a user id

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String
});

module.exports = PostSchema;

