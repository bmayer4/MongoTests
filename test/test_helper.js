const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

mongoose.promise = global.Promise;


before((done) => {  //only runs one time before all tests
    mongoose.connect('mongodb://localhost:27017/users_test');
    mongoose.connection
    .once('open', () => {  done(); })
    .on('error', (error) => {
    console.warn('Warning: ', error);
});
});

//mongoose.connect('mongodb://localhost:27017/users_test');  //users_test is database that will be created
// mongoose.connection.once('open', () => {  //I think I can comment this out lol
//     console.log('Up and running!');
// }).on('error', (error) => {
//     console.warn('Warning: ', error);
// });

beforeEach((done) => {   //done is a callback provided for us by mocha, it tells mocha to complete the test only afer we call it
    User.remove({}).then(() => {
        return BlogPost.remove({})
    }).then(() => {
        return Comment.remove({});
    }).then(() => {
        done();
    });
});

