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
    // auth: {
    //   mode: "optional"
    // },
    handler: function(request, reply) {
      reply("not implemented");
    }
  }
};
