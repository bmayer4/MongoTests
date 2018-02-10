const assert = require('assert'); 
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Middleware', () => {

    let joe, brian, blogPost, comment;
    
        beforeEach((done) => {
            joe = new User({ name: 'Joe' });
            brian = new User({ name: 'Brian' });
            blogPost = new BlogPost({ title: 'A cool blogPost title', content: 'Some cool blogPost content' });
            blogPostBrian = new BlogPost({ title: 'A cool blogPost title brian', content: 'Some cool blogPost content brian' });
            comment = new Comment({ content: 'Cool comment content' });
            commentBrian = new Comment({ content: 'Cool comment content brian' });
    
            joe.blogPosts.push(blogPost._id);
            brian.blogPosts.push(blogPostBrian._id);
            blogPost.comments.push(comment._id);
            blogPostBrian.comments.push(commentBrian._id);
            comment.user = joe._id;
            commentBrian.user = brian._id;
    
            Promise.all([joe.save(), brian.save(), blogPost.save(), blogPostBrian.save(), comment.save(), commentBrian.save()]).then(() => {
                done();
            });
        });

    it('Using cleanup remaining blogPosts on remove', (done) => {

        BlogPost.find({}).then((blogPost) => { console.log(blogPost.length) });  //2

        joe.remove({}).then(() => {
            return BlogPost.count();
        }).then((count) => {
            assert(count === 1);
            done();
        });
     });


    it('Using cleanup remaining blogPosts and comments on remove', (done) => {

        Comment.find({}).then((comment) => { console.log(comment.length) });  //2

        joe.remove({}).then(() => {
            return Comment.find({})
        }).then((comment) => {
            console.log('comment: ', comment);
            assert(comment.length === 1);
            done();
        });
        
        });

});