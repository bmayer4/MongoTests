const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'   //must be same as in    const User = mongoose.model('user', UserSchema);  'user' in here
    }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;