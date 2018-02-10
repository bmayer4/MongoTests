const assert = require('assert');  //installed for us when we insttalled mocha
const User = require('../src/user');

describe('subdoocuments', () => {

    it('it can create a subdocument', (done) => {
        const joe = new User({name: 'Joe', posts: [ { title: 'Joe\'s post'}, { title: 'Second title' } ]}); 

        joe.save().then(() => {
            return User.findOne({ name: 'Joe'})
        }).then((user) => {
            assert(user.posts[1].title === 'Second title');
            done();
        });
    });

    it('Can add subdocuments to an existing user', (done) => {
        const joe = new User({ name: 'Joe', posts: []});
        joe.save().then(() => {
            return User.findOne({ name: 'Joe' })
        }).then((user) => {
            user.posts.push({ title: 'Added post!' });  //regular javasript push, but must save!
            return user.save();
        }).then(() => {
            return User.findOne({ name: 'Joe' })
        }).then((user) => {
            assert(user.posts[0].title === 'Added post!');
            done();
        });
    });

    it('it can remove am existing subdocument', (done) => {
        const joe = new User({name: 'Joe', posts: [{ title: 'Added post!' }]}); 

        joe.save().then(() => {
            return User.findOne({ name: 'Joe'})
        }).then((user) => {
            //user.posts.splice(0, 1);   //plain javascript
            user.posts[0].remove();   //mongoose API gives us this
            return user.save();
        }).then(() => {
            return User.findOne({ name: 'Joe' })
        }).then((user) => {
            assert(user.posts.length === 0);  //joe instance still has posts, doesn't magically change that
            done();
        });     
    });


});