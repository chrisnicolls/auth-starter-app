// bringing in models and routes
//
const models = require("./models");
const routes = require("./routes");
//________________________________________________________________________________

// hapi plugins require a register export as a function
// function will receive (server, options, next)
// server - the server instance the plugin was registered to
// options - any options the server has already been configured with
// next - a function that will move to execute the
// next plugin in the array of plugins registered
module.exports.register = (server, options, next) => {
  // server.bind takes all properties from the object passed in and
  // adds them to the server context (this) when inside a "handler"
  // function of a route configuration.
  // e.g. this.models === server.models
  server.bind({
    models: models
  });

  // adds each route config as an API endpoint
  // endpoint - an address and method combination that will trigger
  // a server function and provde a response back to the requester
  server.route(routes);

  // next - a function that will move to execute the
  // next plugin in the array of plugins registered
  next();
};
//________________________________________________________________________________

// hapi plugins are required to provide an export of
// registered.attributes that contain a "name" and "version"
// to differentiate between other plugins registered

// this is to avoid registering duplicate plugins

module.exports.register.attributes = {
  name: "api",
  version: "0.0.1"
};
