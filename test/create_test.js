const assert = require('assert');  //installed for us when we installed mocha
const User = require('../src/user');

describe('Creating records', () => {

    it('Should save a user', (done) => {
        const joe = new User({ name: 'Joe' }); 

        joe.save().then((user) => {
            assert(!joe.isNew);  //isNew is false after it has been saved to database
            assert(user.name === 'Joe');
            done();
        });
    });

});