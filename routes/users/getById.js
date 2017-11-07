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
  method: "GET",
  path: "/api/users/{userId}",
  config: {
    handler: function(request, reply) {
      // grabs the param "userId" from the request url
      let userId = request.params.userId;

      this.models.User
        // fetches the User by the id found in the url
        .get(userId)
        // sends the user found with the id in the HTTP response
        .then(result => reply(result))
        // sends the error if one occured in the HTTP response
        .catch(err => reply(err));
    }
  }
};
