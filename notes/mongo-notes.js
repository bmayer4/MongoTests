//**INSTALLING MONGO
//in terminal, I made a folder to put this in. below is from homebrew website
//    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
//brew install mongo
//sudo mkdir -p /data/db
//sudo chown -Rv brettmayer /data/db
//mongod            //this starts the server up!
//In Robomongo, added a new database. connection was 27017 local, I can  name it anything I want

//then made a users directory in another terminal
//npm init
// npm install --save mocha nodemon mongoose

//created src and test folders (what is inside of course)
//in scripts in package.json    "test": "mocha"

//saved User instances are now saved to RoboMongo!!

//wrote files creat_test, delete_test, reading_test, update_test, validation_test. Wrote tests inside

//Now we are associating users with "has many" posts, work on Post model now

//Now we make postCount a virtual property, not saved to databse, returns a js getter function
//Added property likes to the user model

///*** we will refactor user schema, instead of nested posts, we will make posts as a seperate collection...BUT..
//to keep our nested example, we will keep posts nested and for the sake of it call the sep collection of posts blogPosts
//make a blogPost and comment.js files
//We associated a blogPost with a comment, a comment with a user, and a user with a blogPost

//modifiers (populate) help enhance a query

//Now we are creating mongoose middleware (functions tha execute before and after some event takes place)
//events are: init(), validate(), save(), remove()
//set up middleware in related model file

//Now we are doing pagination




