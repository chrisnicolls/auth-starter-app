// bringing in hapi to setup our server
const hapi = require("hapi");
// bringing in api plugin to register api end-points (routes/methods)
const api = require("./api");

const hapiAuthJwt = require("hapi-auth-jwt2");
//________________________________________________________________________________

//initializing a server instance
const server = new hapi.Server();
//________________________________________________________________________________

// modifying server settings
server.connection({
  host: "localhost",
  port: 4040,
  routes: {
    // allows requests from all domains/origins
    // aka anyone can send a request to our api
    cors: true
  },
  router: {
    // removes ending forward slash "/" from incoming request urls
    stripTrailingSlash: true
  }
});
//_________________________________________________________________________________

// takes plugins in as an array
// and executes each plugin
// a plugin is a snippet of code that modifies the server settings
// more often than not is a pre-built package we install
server
  .register([
    hapiAuthJwt,
    {
      register: api
    }
  ])
  .then(() => {
    // turning on the server
    // end-points in our api will now be reachable
    server
      .start()
      .then(() => console.log(`Server started at: ${server.info.uri}`))
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
