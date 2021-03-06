const assert = require('assert');  
const User = require('../src/user');

describe('Virtual types', () => {

    it('postCount returns number of posts', (done) => {
        const joe = new User({name: 'Joe', posts: [ { title: 'Joe\'s post'}, { title: 'Second title'} ]});
        
        joe.save().then((user) => {
            assert(user.postCount === 2);
            done();
        });
    });

});
