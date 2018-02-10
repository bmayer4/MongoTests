const assert = require('assert');
const User = require('../src/user.js');


//* added validation to User mode Schema

describe('Validating records', (done) => {

    it('requires a user name', () => {
        const joe = new User({ name: undefined });
        const validationResult = joe.validateSync();  // validateResult object will have all the results of validating the user model
        const message = validationResult.errors.name.message;
        assert(message === 'Name is required');
    });

    it('requires a user\'s name longer than 2 characters', (done) => {
        const bo = new User({ name: 'Bo' });
        const validationResult = bo.validateSync(); 
        const message = validationResult.errors.name.message;
        console.log('***', message);
        assert(message === 'Name must be longer than 2 characters');
        done();
    });

    it('disallows invalid records from being saved', (done) => {
        const bo = new User({ name: 'Bo' });
        bo.save().catch((e) => {
            console.log('%%%%', e.errors.name.message);
            const message = e.errors.name.message;
            assert(message === 'Name must be longer than 2 characters');
            done();
        });
    });
});