// exporting route config object
// method - the HTTP method used to access this endpoint
// path - the request URL used to access this endpoint
// method & path are used in conjuction

// config - settings for how the request is handled after it's received.
// auth.mode - if set to optional, the route will be accessible without
// any authentication header

// handler - the function that will run when a request is received to the endpoint.
// handler: function(request, reply) {}
// request - the request object containing all details including data, parameters, etc.
// reply - a function that allows us to send an HTTP response with
// data, or a message to the requester.
module.exports = {
  method: "POST",
  path: "/api/users/login",
  config: {
    auth: {
      mode: "optional"
    },
    handler: function(request, reply) {
      // grab the email and password values
      // from the request.payload object
      // (this is the body sent in the request)
      let { email, password } = request.payload;

      this.models.User
        .filter({ email: email }) // filter users by the login email
        .then(users => {
          // if there are zero users with that email
          // throw an error to the catch block
          if (users.length === 0) {
            throw "Email and password combination is invalid";
          }
          // grab the user in the first index of the users array
          let [user] = users;

          // run the compare password function on the user document found
          // with the login email, and compare the login password
          // to the stored secure hash password value
          return user.comparePassword(password);
        })
        .then(user => {
          // if the value of user is "false", throw an error to the catch block
          if (!user) {
            throw "Email and password combination is invalid";
          }
          // remove password before generated JWT
          delete user.password;

          return user.generateJWT();
        })
        .then(token => reply(token))
        .catch(err => reply(err));
    }
  }
};
