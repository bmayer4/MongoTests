const assert = require('assert');  //installed for us when we insttalled mocha
const User = require('../src/user');

describe('Reading users out of the database', () => {

    let joe, maria, alex, zach;  //so scope isn't limited ot beforeEach

    beforeEach((done) => {
        alex = new User({ name: 'Alex' });
        joe = new User({ name: 'Joe' });
        maria = new User({ name: 'Maria' });
        zach = new User({ name: 'Zach' });

        Promise.all([alex.save(), joe.save(), zach.save(), maria.save()]).then(() => { //may NOT be saved to database in this order
            done();
        });

    });

    it('finds all users with a name of Joe', (done) => {
        User.find({ name: 'Joe' }).then((users) => {
            assert(users[0]._id.toString() === joe._id.toString());
            done();
        });
    });

    it('finds a user with a particular id', (done) => {
        User.findOne({ _id: joe._id }).then((user) => {
            assert(user.name === 'Joe');
            done();
        });
    });

    it.only('can limit the skip and limit result set', (done) => {
        //for sort, key is property to sort, 1 is ascending, -1 is descending
        User.find({}).sort({  name: 1 }).skip(1).limit(2).then((users) => {  
            console.log(users);
            assert(users.length === 2);
            assert(users[0].name === 'Joe');
            assert(users[1].name === 'Maria');
            done();
        });
    });

});