// import thinky to setup a database connection
const thinky = require("thinky");

// builds and configures the database connection
// and finally starts the connection (turns it on)
// this is what causes the server to blow up if rethinkdb
// is not running
const db = thinky({
  db: "firstAuthApi"
});

// bringing in the user model function, and
// calling the function passing in the db instance
// return value to the variable User is the configured db model
let User = require("./user")(db);

// exporting the models as properties of the module
module.exports = {
  User: User
};
