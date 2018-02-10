const assert = require('assert'); 
const User = require('../src/user');


describe('Updating', () => {

    let joe;  

    beforeEach((done) => {
        joe = new User({ name: 'Joe', postCount: 0 });
        joe.save((then) => {  done(); }); 
    });

    it('instance type using set and save', (done) => {
        joe.set('name', 'Alex');
        joe.save().then(() => {
            return User.find({});
        }).then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
        });
    });

    it('a model instance can update', (done) => {
        joe.update({ name: 'Alex' }).then(() => {  //update saves automatically
            return User.find({});
        }).then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
        });
    });

    it('a model class can update', (done) => {
        User.update({ name: 'Joe' }, { $set: { name: 'Alex' } } ).then(() => {  //updates all matching docs, update saves automatically
            return User.find({});
        }).then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
        });
    });


    it('a model class can update one record', (done) => {
        User.findOneAndUpdate({ name: 'Joe' }, { $set: { name: 'Alex' } } ).then(() => {  //updates first matching doc, update saves automatically
            return User.find({});
        }).then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
        });
    });

    it('a model class can find by id and update', (done) => {
        User.findByIdAndUpdate(joe._id, { $set: { name: 'Alex' } } ).then(() => {  //update saves automatically
            return User.find({});
        }).then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
        });
    });


    //******updated User to have postCount property (just had name before)

    it('a user can have their post count incrememted by one', (done) => {
        console.log(joe);  //postCount 0
        //we dont want to load all users in, go through them all incrementing by one, and saving it. we want to give mongo instructions to do this
        User.update({ name: 'Joe' }, { $inc: { likes: 10 }}).then(() => {
            console.log(joe);  //postCount still, joe instance is not getting updated
            return User.findOne({ name: 'Joe' })
        }).then((user) => {
            console.log(user);  //Joe now has postCount of 1, but instance previously made isn't changed
            assert(user.likes === 10);
            done();
        });
    });
});