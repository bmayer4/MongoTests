const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => { return name.length > 2 },
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required']
    },
    likes: Number,
    posts: [PostSchema],  //leaving this here just to have an idea of subdocuments
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

UserSchema.virtual('postCount').get(function() {  //don't use arrow function or this wouldn't be bound to model instance
    return this.posts.length;
});

UserSchema.pre('remove', function(next) {
    //var user = this;  
    const BlogPost = mongoose.model('blogPost');
    const Comment = mongoose.model('comment');

    BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => {   //go through all our blogPosts, look at all their id's, if the id is in this blogPost array then remove it
        return Comment.remove({ user: this._id });
    }).then(() => {
        next();
    });  
});

const User = mongoose.model('user', UserSchema);

module.exports = User;