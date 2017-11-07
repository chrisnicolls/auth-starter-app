// import bcrypt for password utility functions
// such as generating salts, hashes and comparing plain text passwords
// to secure hash values
const bcrypt = require("bcrypt-as-promised");

const jwt = require("jsonwebtoken");

// model is exported as a function
// db instance is passed in as the parameter
module.exports = db => {
  // creating a user db model
  // a db model is a definition of what a particular
  // data type is going to look like

  // db.createModel takes in 3 parameters (1 is optional)
  // createModel(modelName, modelSchema, modelOptions)
  // modelName - the name of the db table/collection the records will be stored in
  // modelSchema - the shape/definition of what the data will look like
  // modelOptions - alternate settings to change the behavior of how our data
  // is validated, saved or queried.
  let User = db.createModel("User", {
    email: db.type.string().required(),
    password: db.type.string().required()
  });
  // define  method that can be called on all user documents
  // that will take the password value and transform it into a secure
  // hash value that is safe to store in the database
  User.define("generatePassword", function() {
    return bcrypt
      .genSalt(10) // generate a salt
      .then(salt => bcrypt.hash(this.password, salt)) // generate a hash with the input password and salt
      .then(hash => Object.assign(this, { password: hash })) // update user with the hash as the password field value
      .catch(err => err); // catch errors and return them
  });

  // define a method that can be called on all user documents
  // that will take the password sent to the api and compare it to the
  // password hash stored on the user database record
  User.define("comparePassword", function(password) {
    return bcrypt
      .compare(password, this.password) // compares the plain text password to the hash through an algorithm
      .then(authed => (authed ? this : false)) // return "this" aka the user document if authed is "true", else return false
      .catch(err => err);
  });

  // defines a method to transform the user data into a secure access token to our API
  User.define("generateJWT", function() {
    // call the jwt.sign(data, secretKey, optionsObject)
    // returns large, random encoded string
    return jwt.sign(Object.assign({}, this), "supersecretsecret", {
      algorithm: "HS256"
    });
  });

  // define event hook that will call any methods needed to run
  // before a new user document is saved to the database
  User.pre("save", function(next) {
    User.filter({ email: this.email }).then(users => {
      // check if users array that have same email address is longer than 0
      // otherwise return error
      if (users.length > 0) {
        return next("Email and password combination is invalid");
      }
      return this.generatePassword() // execute generate password on document
        .then(() => next()) // continue to allow document to be saved
        .catch(err => next(err)); // pass error to stop document from being saved
    });
  });

  // return the model from the function
  return User;
};
