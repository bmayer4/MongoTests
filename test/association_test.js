const assert = require('assert'); 
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Associations', () => {

    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'A cool blogPost title', content: 'Some cool blogPost content' });
        comment = new Comment({ content: 'Cool comment content' });

        joe.blogPosts.push(blogPost._id);
        blogPost.comments.push(comment._id);
        comment.user = joe._id;

        Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => {
            done();
        });
    });

    //after adding populate, we need to be able to load up a nested association also (comments)
    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Joe' }).populate('blogPosts').then((user) => {  ///whoa!
            console.log('$$$$++++++', user);
            console.log('------', user.blogPosts[0])
            assert(user.blogPosts[0].title === 'A cool blogPost title');
            done();
        });
    });


    //after adding populate, we need to be able to load up a nested association also (comments)
    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Joe' }).populate({ 
            path: 'blogPosts', 
            populate: { 
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'user',
                    model: 'user'
                }
             }}).then((user) => { 
            console.log('####', user.blogPosts[0].comments[0]);
            assert(user.name === 'Joe');
            assert(user.blogPosts[0].title === 'A cool blogPost title');
            assert(user.blogPosts[0].comments[0].content === 'Cool comment content');
            assert(user.blogPosts[0].comments[0].user.name === 'Joe');
            assert(user.blogPosts[0].comments[0].user._id.toString() == joe._id.toString());
            done();
        });
    });

});


